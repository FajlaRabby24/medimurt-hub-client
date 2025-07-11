import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaCartPlus, FaEye } from "react-icons/fa";
import LoadingSpiner from "../components/common/Loading/LoadingSpiner";
import Container from "../components/common/Ui/Container";
import useAxios from "../hooks/useAxios";

const Shop = () => {
  const axiosPublic = useAxios();
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const {
    data: medicines = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["allMedicines"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/medicines");
      return res.data;
    },
    staleTime: Infinity,
  });

  if (isLoading || isFetching) return <LoadingSpiner />;

  return (
    <Container className={"pb-20"}>
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
              {medicines.map((med) => (
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
                  <td>${med.price}</td>
                  <td>{med.discount || 0}%</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => setSelectedMedicine(med)}
                      className="btn btn-sm btn-outline"
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <button
                      // onClick={() => handleAddToCart(med)}
                      className="btn btn-sm btn-primary"
                      title="Add to Cart"
                    >
                      <FaCartPlus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                <strong>Price:</strong> ${selectedMedicine.price}
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
