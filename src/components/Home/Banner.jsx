import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import "swiper/css";
import "swiper/css/pagination";
import bg from "../../assets/images/bg.jpg";
import useAxios from "../../hooks/useAxios";

const Banner = () => {
  const axiosPublic = useAxios();

  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["activeBanners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/users/advertisements/active");
      return res.data;
    },
    staleTime: Infinity,
  });

  return (
    <section
      className="bg-cover relative h-[700px]  bg-center bg-no-repeat  py-10 "
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* 🔹 Overlay layer (blur or opacity) */}
      <div className="absolute inset-0   backdrop-blur-sm z-0"></div>

      <div className="relative">
        {isLoading ? (
          <h2 className="text-3xl  text-center py-10 font-semibold ">
            Loading advertisements...
          </h2>
        ) : banners.length ? (
          <div>
            <h2 className="text-2xl sm:text-3xl  font-bold text-center mb-8">
              Advertisements
            </h2>
            {/* First slider - left to right */}
            <Marquee>
              {banners.map((ad) => (
                <div
                  key={ad._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden p-4 mr-2 h-full"
                >
                  <img
                    src={ad.image_url}
                    alt={ad.medicine_name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold mt-3">
                    {ad.medicine_name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{ad.description}</p>
                </div>
              ))}
            </Marquee>
            {/* Second slider - right to left */}
            <Marquee direction="right" className=" mt-3">
              {banners.map((ad) => (
                <div
                  key={ad._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden p-4 mr-2 h-full"
                >
                  <img
                    src={ad.image_url}
                    alt={ad.medicine_name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold mt-3">
                    {ad.medicine_name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{ad.description}</p>
                </div>
              ))}
            </Marquee>
          </div>
        ) : (
          <h2 className="text-2xl sm:text-3xl  font-bold text-center mb-8">
            No Advertisements
          </h2>
        )}
      </div>
    </section>
  );
};

export default Banner;
