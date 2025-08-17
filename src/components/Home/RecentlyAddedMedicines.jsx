import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import Container from "../common/Ui/Container";

const RecentlyAddedMedicines = () => {
  const axiosPublic = useAxios();
  const { user } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

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

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async (cartInfo) => {
      const res = await axiosSecure.post("/api/users/add-to-cart", cartInfo);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Added to cart!");
      queryClient.invalidateQueries(["cart", user?.email]);
    },
    onError: () => toast.error("Failed to add. Try again!"),
  });

  // Update cart item quantity
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ _id, quantity, total_price }) => {
      const res = await axiosSecure.patch(`/api/users/cart/${_id}`, {
        quantity,
        total_price,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Updated quantity!");
      queryClient.invalidateQueries(["cart", user?.email]);
    },
    onError: () => toast.error("Failed to update. Try again!"),
  });

  // handle add to cart
  const handleAddToCart = (medicine) => {
    if (!user) {
      return navigate("/auth/join-us", { state: { from: location.pathname } });
    }

    const exist = cart.find((item) => item.medicine_id === medicine._id);
    if (exist) {
      updateQuantityMutation.mutate({
        _id: exist._id,
        quantity: exist.quantity + 1,
        total_price:
          (exist.price - (exist.price * exist.discount) / 100) *
          (exist.quantity + 1),
      });
    } else {
      const cartInfo = {
        user_email: user?.email,
        medicine_id: medicine._id,
        medicine_name: medicine.medicine_name,
        image: medicine.image,
        price: medicine.price,
        discount: medicine.discount,
        company_name: medicine.company,
        quantity: 1,
        total_price:
          medicine.price - (medicine.price * medicine.discount) / 100,
        seller_email: medicine.created_by,
        payment_status: "pending",
      };
      addToCartMutation.mutate(cartInfo);
    }
  };

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
                  <h4 className="text-2xl  font-semibold">${item?.price}</h4>
                  <button
                    onClick={() => handleAddToCart(item)}
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
