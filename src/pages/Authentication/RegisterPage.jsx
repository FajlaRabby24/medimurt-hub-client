import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utilities/imageUpload";

const RegisterPage = () => {
  const { signUpUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  // state
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    const image = data?.photo[0];
    const imageUrl = await imageUpload(image);
    console.log(imageUrl);

    signUpUser(data?.email, data?.password)
      .then(async (result) => {
        console.log({ result });
        await updateUserProfile({
          displayName: data?.name,
          photoURL: imageUrl,
        });
        toast.success("Register successfully!");
        navigate(from);
      })
      .catch((error) => {
        toast.error("Some went wrong. Please try again!");
      });

    reset();
  };

  // handle preview image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl ">
      <h2 className="text-2xl font-bold text-center text-primary mb-6">
        Register to MediMart Hub
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="form-control flex flex-col">
          <label className="label font-semibold">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Your Full Name"
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="form-control flex flex-col">
          <label className="label font-semibold">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered  w-full"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="form-control flex flex-col">
          <label className="label font-semibold">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Your Password"
            className="input input-bordered  w-full"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Photo Upload */}
        <div className="form-control flex flex-col">
          <label className="label font-semibold">
            <span className="label-text">Upload Photo</span>
          </label>
          <div className="flex gap-2 flex-col">
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              {...register("photo", {
                required: "Photo is required",
                onChange: (e) => handleImageChange(e), // ✅ Register your custom handler
              })}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo.message}</p>
            )}
            {previewImage && (
              <img className="w-[50px] rounded-sm" src={previewImage} alt="" />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button className="btn btn-primary w-full">Register</button>
        </div>
      </form>

      {/* Redirect to login */}
      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/auth/join-us" className="text-blue-500 hover:underline">
          Login
        </Link>{" "}
      </p>
    </div>
  );
};

export default RegisterPage;
