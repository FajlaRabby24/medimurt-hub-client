import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReTitle } from "re-title";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import LoadingSpiner from "../components/common/Loading/LoadingSpiner";
import Container from "../components/common/Ui/Container";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";

const CategoryDetailsPage = () => {
  const { category } = useParams();
  const axiosPublic = useAxios();
  const { cart } = useCart();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["categoryMedicines", category, page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/users/medicines/category/${category}?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const medicines = data?.data || [];
  const totalPages = data?.totalPages || 0;

  // add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async (cartInfo) => {
      const res = await axiosSecure.post("/api/users/add-to-cart", cartInfo);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Added to cart!");
      queryClient.invalidateQueries(["cart", user?.email]);
    },
    onError: () => {
      toast.error("Failed to add. Try again!");
    },
  });

  // update quantity in medicine
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ _id, quantity, total_price }) => {
      const res = await axiosSecure.patch(`/api/users/cart/${_id}`, {
        quantity,
        total_price,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success(`Update the quantity `);
      queryClient.invalidateQueries(["cart", user?.email]);
    },
    onError: () => {
      toast.error("Failed. Try again!");
    },
  });

  // handle select
  const handleSelect = (medicine) => {
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
      };
      addToCartMutation.mutate(cartInfo);
    }
  };

  if (isLoading || isFetching) return <LoadingSpiner />;

  return (
    <Container>
      <ReTitle title="Category " />
      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Medicines in {category} Category
        </h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Generic</th>
                <th>Dosage form</th>
                <th>Company</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines?.map((med) => (
                <tr key={med._id}>
                  <td>
                    <img
                      src={med.image}
                      alt={med.name}
                      className="w-12 h-12 rounded"
                    />
                  </td>
                  <td>{med.medicine_name}</td>
                  <td>{med.generic_name}</td>
                  <td>{med.dosage_form}</td>
                  <td>{med.company}</td>
                  <td>{med.unit}</td>
                  <td>${med.price}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => setSelectedMedicine(med)}
                      >
                        👁️
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleSelect(med)}
                      >
                        Select
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {limit < data?.totalCount && (
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
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        {selectedMedicine && (
          <dialog open className="modal modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">{selectedMedicine.name}</h3>
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.name}
                className="w-full  object-cover rounded my-2"
              />
              <p>
                <strong>Name:</strong> {selectedMedicine.medicine_name}
              </p>
              <p>
                <strong>Generic Name:</strong> {selectedMedicine.generic_name}
              </p>
              <p>
                <strong>Description:</strong> {selectedMedicine.description}
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
                <strong>Dosage form:</strong> {selectedMedicine.dosage_form}
              </p>
              <p>
                <strong>Price:</strong> ${selectedMedicine.price}
              </p>
              <p>
                <strong>Discount:</strong> {selectedMedicine.discount}%
              </p>

              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => setSelectedMedicine(null)}
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

export default CategoryDetailsPage;
