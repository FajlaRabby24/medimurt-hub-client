import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const ProfilePage = () => {
  const { user, signOutUser } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  console.log(user);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Pass the data back to parent to handle Firebase update
    // onUpdateProfile(data);
    console.log(data);
    // setModalOpen(false);
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
            navigate("/auth/join-us");
          })
          .catch((error) => {
            toast.error("Some went wrong. Please try again!");
          });
      }
    });
  };

  return (
    <div className="max-wxl pt-20  px-4     mx-auto">
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

            {/* photo start  */}

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

            {/* phone number (optional) */}
            <label className="label text-neutral mb-1 mt-3">
              Phone Number (Optional)
            </label>
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
                  <path d="M22 16.92V21a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.51 19.51 0 0 1-6-6A19.86 19.86 0 0 1 2 4.18 2 2 0 0 1 4 2h4.09a2 2 0 0 1 2 1.72c.12.9.37 1.77.72 2.58a2 2 0 0 1-.45 2.11L9.91 9.91a16 16 0 0 0 6 6l1.5-1.5a2 2 0 0 1 2.11-.45c.81.35 1.68.6 2.58.72A2 2 0 0 1 22 16.92z"></path>
                </g>
              </svg>
              <input
                type="tel"
                placeholder="e.g. 01xxxxxxxxx"
                {...register("phoneNumber")}
                className="w-full"
              />
            </label>
            {/* phone end */}

            <div className="mt-4 space-x-2">
              <button type="submit" className="btn btn-primary ">
                <FaUserEdit /> Update profile
              </button>
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
