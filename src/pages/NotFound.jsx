import { ReTitle } from "re-title";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-6">
      <ReTitle title="Not found" />
      <h1 className="text-[120px] font-extrabold text-primary leading-none">
        404
      </h1>
      <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-base text-gray-600 mb-6 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        <FaArrowLeft className="mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
