import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import GoogleLogin from "../../components/common/Auth/GoogleLogin";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);

    signInUser(data?.email, data?.password)
      .then((result) => {
        toast.success("Login successfull!");
        navigate(from);
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again!");
      });

    reset();
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl ">
      <h2 className="text-2xl font-bold text-center text-primary mb-6">
        Login to MediMart Hub
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button className="btn btn-primary w-full">Login</button>
        </div>
      </form>

      {/* Redirect to register */}
      <p className="text-center mt-4 text-sm">
        Don’t have an account?{" "}
        <Link to="/auth/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>
      <GoogleLogin></GoogleLogin>
    </div>
  );
};

export default LoginPage;
