import { useQuery } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useAxios from "../../hooks/useAxios";
import Container from "../common/Ui/Container";

const DiscountMedicines = () => {
  const axiosPublic = useAxios();

  const { data: discounts = [], isLoading } = useQuery({
    queryKey: ["discountMedicines"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/medicines/discounted");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <h2 className="text-3xl font-semibold text-center">
        Medicine is loading...
      </h2>
    );
  }

  if (!discounts.length) {
    return (
      <h2 className="text-3xl font-semibold text-center">
        There are no discounted medications now!
      </h2>
    );
  }

  return (
    <Container>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Discounted Medicines
      </h2>
      <section className="py-10 px-4 bg-gray-50">
        <Swiper
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
          }}
          loop={true}
          grabCursor={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay]}
        >
          {discounts.map((med) => (
            <SwiperSlide key={med._id}>
              <div className="bg-white rounded-lg shadow p-4 h-full">
                <img
                  src={med.image}
                  alt={med.medicine_name}
                  className="w-full h-44 object-cover rounded"
                />
                <div className="mt-3">
                  <h3 className="text-lg font-semibold">{med.medicine_name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {med.description}
                  </p>
                  <p className="text-sm mt-2 font-medium">
                    Price:{" "}
                    <span className="line-through text-gray-400">
                      ${med.price}
                    </span>{" "}
                    <span className="text-green-600">
                      $
                      {(med.price - (med.price * med.discount) / 100).toFixed(
                        2
                      )}
                    </span>
                  </p>
                  <span className="badge badge-success mt-2">
                    {med.discount}% OFF
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </Container>
  );
};

export default DiscountMedicines;
