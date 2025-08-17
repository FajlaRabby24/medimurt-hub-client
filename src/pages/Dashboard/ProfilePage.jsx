import { useQueryClient } from "@tanstack/react-query";
import { ReTitle } from "re-title";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utilities/imageUpload";

const ProfilePage = () => {
  const { user, signOutUser, updateUserProfile } = useAuth();
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsProfileUpdating(true);
      const image = data?.photo[0];
      const imageUrl = await imageUpload(image);
      await updateUserProfile({
        displayName: data?.name,
        photoURL: imageUrl,
      });
      toast.success("Profile update successfully!");
      setTimeout(() => {
        reset();
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    } finally {
      setIsProfileUpdating(false);
    }
  };

  // handle preview image
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
    }
  };

  // handle sign out
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            queryClient.clear();
            toast.success("Sign out successfully!");
            navigate("/auth/join-us", { replace: true });
          })
          .catch((error) => {
            toast.error("Some went wrong. Please try again!");
          });
      }
    });
  };

  return (
    <div className="max-wxl pt-20  px-4     mx-auto">
      <ReTitle title="Profile" />
      <h1 className="font-semibold  mb-4 text-3xl">Your profile</h1>
      <div className="flex items-stretch flex-col md:flex-row  gap-5">
        {/* image  */}
        <div className="flex flex-col items-center py-8 px-5 gap-4 border border-primary rounded-lg ">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
              <img src={user?.photoURL} />
            </div>
          </div>
          <h1 className=" font-semibold text-2xl ">{user?.displayName}</h1>
          <div className=" space-y-2 flex flex-col items-center">
            <p className="font-semibold texr-md">{user?.email}</p>
            <p>
              <span className="font-semibold text-md">Phone:</span>{" "}
              {user?.phoneNumber ? user?.phoneNumber : "N/A"}
            </p>
            <p>
              <span className="font-semibold text-md">Verified:</span>{" "}
              {user?.emailVerified ? "Yes" : "No"}
            </p>
          </div>
        </div>
        {/* content  */}
        <div className="border border-primary px-6 py-4 rounded-lg ">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* name start */}
            <label className="label text-neutral mb-1">Username</label>
            <label className="input validator w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                placeholder="Write your name..."
                {...register("name", {
                  required: "Name is required",
                  minLength: 3,
                  maxLength: 30,
                })}
                className="w-full"
              />
            </label>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
            {/* name end */}

            {/* Photo */}
            <div>
              <label className="label text-neutral mb-1 mt-3">
                Profile Photo
              </label>
              <div className="flex flex-col gap-3 sm:flex-row  -start ">
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-[110px]"
                  {...register("photo", {
                    required: "Photo is required",
                    onChange: (e) => handleImagePreview(e),
                  })}
                />
                {previewImage && (
                  <img
                    className="w-full sm:w-[80px] h-auto rounded-sm"
                    src={previewImage}
                    alt="preview"
                  />
                )}
              </div>
              {errors.photo && (
                <p className="text-red-500 text-sm">{errors.photo.message}</p>
              )}
            </div>
            {/* photo end */}

            <div className="mt-4 space-x-2">
              {isProfileUpdating ? (
                <button disabled className="btn">
                  <span className="loading loading-spinner"></span>
                  updating
                </button>
              ) : (
                <button type="submit" className="btn btn-primary ">
                  <FaUserEdit /> Update profile
                </button>
              )}

              <button
                onClick={handleSignOut}
                type="button"
                className="btn btn-error"
              >
                Sign out <FaSignOutAlt />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
