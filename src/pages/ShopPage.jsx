import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReTitle } from "re-title";
import { useState } from "react";
import { FaCartPlus, FaEye } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import LoadingSpiner from "../components/common/Loading/LoadingSpiner";
import Container from "../components/common/Ui/Container";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";

const Shop = () => {
  const axiosPublic = useAxios();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 5;

  // Fetch paginated medicine data
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["allMedicines", page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/users/medicines?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
  console.log(data);
  const medicines = data?.data || [];
  const totalPages = data?.totalPages || 0;

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

  // Handle Add to Cart
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

  if (isLoading || isFetching) return <LoadingSpiner />;

  return (
    <Container className={"pb-20"}>
      <ReTitle title="Shop" />
      <div className="p-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Shop Medicines
        </h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full min-w-[900px]">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Generic</th>
                <th>Category</th>
                <th>Company</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines?.map((med) => (
                <tr key={med._id}>
                  <td>
                    <img
                      src={med.image}
                      alt={med.medicine_name}
                      className="w-12 h-12 rounded"
                    />
                  </td>
                  <td>{med.medicine_name}</td>
                  <td>{med.generic_name}</td>
                  <td>{med.category}</td>
                  <td>{med.company}</td>
                  <td>{med.unit}</td>
                  <td>৳{med.price}</td>
                  <td>{med.discount || 0}%</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => setSelectedMedicine(med)}
                      className="btn btn-sm btn-outline"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleAddToCart(med)}
                      className="btn btn-sm btn-primary"
                    >
                      <FaCartPlus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                className={`join-item btn ${
                  page === num + 1 ? "btn-primary" : ""
                }`}
                onClick={() => setPage(num + 1)}
              >
                {num + 1}
              </button>
            ))}

            <button
              className="join-item btn"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        {/* View Modal */}
        {selectedMedicine && (
          <dialog open className="modal modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-2">
                {selectedMedicine.medicine_name}
              </h3>
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.medicine_name}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <p>
                <strong>Generic:</strong> {selectedMedicine.generic_name}
              </p>
              <p>
                <strong>Category:</strong> {selectedMedicine.category}
              </p>
              <p>
                <strong>Company:</strong> {selectedMedicine.company}
              </p>
              <p>
                <strong>Unit:</strong> {selectedMedicine.unit}
              </p>
              <p>
                <strong>Dosage Form:</strong> {selectedMedicine.dosage_form}
              </p>
              <p>
                <strong>Description:</strong> {selectedMedicine.description}
              </p>
              <p>
                <strong>Price:</strong> ৳{selectedMedicine.price}
              </p>
              <p>
                <strong>Discount:</strong> {selectedMedicine.discount}%
              </p>

              <div className="modal-action">
                <button
                  onClick={() => setSelectedMedicine(null)}
                  className="btn"
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </Container>
  );
};

export default Shop;
