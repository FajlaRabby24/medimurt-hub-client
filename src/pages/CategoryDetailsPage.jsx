import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import Container from "../components/common/Ui/Container";
import useAxios from "../hooks/useAxios";

const CategoryDetailsPage = () => {
  const { category } = useParams();
  const axiosPublic = useAxios();
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const { data: medicines = [] } = useQuery({
    queryKey: ["categoryMedicines", category],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/medicines/category/${category}`);
      return res.data;
    },
    staleTime: Infinity,
  });

  const handleSelect = (medicine) => {
    // Add to cart logic here (could be context or local state)
    Swal.fire("Added!", `${medicine.name} added to cart.`, "success");
  };

  return (
    <Container>
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
                <th>Unit</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med) => (
                <tr key={med._id}>
                  <td>
                    <img
                      src={med.image}
                      alt={med.name}
                      className="w-12 h-12 rounded"
                    />
                  </td>
                  <td>{med.name}</td>
                  <td>{med.genericName}</td>
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

        {/* Modal */}
        {selectedMedicine && (
          <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">{selectedMedicine.name}</h3>
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.name}
                className="w-full h-40 object-cover rounded my-2"
              />
              <p>
                <strong>Generic Name:</strong> {selectedMedicine.genericName}
              </p>
              <p>
                <strong>Description:</strong> {selectedMedicine.description}
              </p>
              <p>
                <strong>Unit:</strong> {selectedMedicine.unit}
              </p>
              <p>
                <strong>Price:</strong> ${selectedMedicine.price}
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
