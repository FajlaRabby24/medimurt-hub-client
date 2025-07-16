import { ReTitle } from "re-title";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import userDefaultImage from "../assets/images/defaultUser.png";
import Container from "../components/common/Ui/Container";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { imageUpload } from "../utilities/imageUpload";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const name = data?.name;
      const image = data?.photo[0];
      const imageUrl = await imageUpload(image);
      await updateUserProfile({ displayName: name, photoURL: imageUrl })
        .then(async () => {
          await axiosSecure.patch("/api/users/update-profile", {
            name,
            imageUrl,
          });
          reset();
          toast.success("Profile updated successfull!");
          navigate("/");
        })
        .catch((error) => {
          toast.error("Something went wrong! Please try again later!");
        });
    } catch (error) {
      toast.error("Something went wrong! Please try again later!");
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

  return (
    <Container>
      <ReTitle title="Update Profile" />
      <div className="max-w-4xl mx-auto pt-20 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">
          Update Your Profile
        </h1>

        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg border border-[#ccc] p-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4 md:w-1/3 border-r md:pr-6">
            <div className="avatar">
              <div className="w-28 ring ring-primary ring-offset-base-100 ring-offset-2 rounded-full">
                <img
                  src={user?.photoURL || userDefaultImage}
                  alt="User Profile"
                />
              </div>
            </div>
            <h2 className="text-xl font-semibold">{user?.displayName}</h2>
            <p className="text-gray-500 text-sm text-center">{user?.email}</p>
          </div>

          {/* Form Section */}
          <div className="md:w-2/3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              {/* Name Input */}
              <div>
                <label className="label text-base font-medium text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 3, message: "Min 3 characters" },
                    maxLength: { value: 30, message: "Max 30 characters" },
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.displayName.message}
                  </p>
                )}
              </div>

              {/* Photo */}
              <div>
                <label className="label text-base font-medium text-gray-600">
                  Choose a photo
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-success w-full mt-4"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Update Profile"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UpdateProfile;
