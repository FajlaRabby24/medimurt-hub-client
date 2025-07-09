import { ScaleLoader } from "react-spinners";

const LoadingSpiner = () => {
  return (
    <div className=" min-h-[calc(100vh-402px)]  flex items-center justify-center">
      <ScaleLoader color="#878787" />
    </div>
  );
};

export default LoadingSpiner;
