import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";
import Container from "../common/Ui/Container";

const RecentlyAddedMedicines = () => {
  const axiosPublic = useAxios();
  const navigate = useNavigate();

  const {
    data: medicines = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recent-medicines"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/users/recent-medicines");
      return res.data;
    },
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <span className="loading loading-bars loading-lg mx-auto block mt-10"></span>
    );
  }

  if (isError) {
    return (
      <p className="text-error text-center mt-10">Failed to load medicines!</p>
    );
  }

  return (
    <Container>
      <section className="">
        <h2 className="text-2xl md:text-3xl mb-6 font-bold text-center">
          Recently Added Medicines
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {medicines?.map((item) => (
            <div
              key={item?._id}
              className="card bg-base-100  shadow-sm hover:scale-105 transition-all"
            >
              <figure>
                <img
                  className="max-h-[195px] w-full object-cover"
                  src={item?.image}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item?.medicine_name}</h2>
                <p>{item?.description}</p>
                <div className="card-actions flex items-center pt-6 justify-between">
                  <h4 className="text-2xl  font-semibold">৳{item?.price}</h4>
                  <button
                    onClick={() => navigate("/shop")}
                    className="btn btn-primary"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default RecentlyAddedMedicines;
