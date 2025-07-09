import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../utilities/imageUpload";

const ManageMedicine = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const [viewData, setViewData] = useState(null);
  const [uploading, setIsUploading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [editData, setEditData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: medicines = [], refetch } = useQuery({
    queryKey: ["sellerMedicines"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/medicines/mine?email=${user.email}`
      );
      return res.data;
    },
  });

  // onsubmit
  const onSubmit = async (data) => {
    setIsUploading(true);
    const image = data?.photo[0];
    const imageUrl = await imageUpload(image);
    const medicineData = {
      name: data.name,
      genericName: data.genericName,
      description: data.description,
      image: imageUrl,
      category: data.category,
      company: data.company,
      unit: data.unit,
      price: Number(data.price),
      discount: Number(data.discount) || 0,
      created_by: user.email,
      created_at: new Date().toISOString(),
    };

    try {
      const medicineRes = await axiosSecure.post(
        "/api/medicines",
        medicineData
      );
      if (medicineRes.data.insertedId) {
        refetch();
        toast.success("Medicine added successfully!");
      }
    } catch (err) {
      toast.error("Medicine upload failed. Please try again!");
    } finally {
      setIsUploading(false);
      reset();
      setPreviewImage(null);
      setShowModal(false);
    }
  };

  // handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/api/medicines/${id}`);
        refetch();
        toast.success("Medicine deleted successfully!");
      }
    });
  };

  // handle image preview
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
    }
  };

  return (
    <div className="p-4 sm:p-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Manage Medicines</h2>
        <button
          onClick={() => {
            setEditData(null);
            reset();
            setShowModal(true);
          }}
          className="btn btn-primary"
        >
          Add Medicine
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full min-w-[800px]">
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
                    alt={med.name}
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td>{med.name}</td>
                <td>{med.genericName}</td>
                <td>{med.category}</td>
                <td>{med.company}</td>
                <td>{med.unit}</td>
                <td>${med.price}</td>
                <td>{med.discount}%</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewData(med)}
                      className="btn btn-sm btn-outline"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleDelete(med._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add */}
      {showModal && (
        <dialog open className="modal modal-middle">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="modal-box space-y-4 max-w-full sm:max-w-xl"
          >
            <h3 className="font-bold text-lg">Add New Medicine</h3>

            <input
              type="text"
              placeholder="Item Name"
              className="input input-bordered w-full"
              {...register("name", { required: true })}
            />

            <input
              type="text"
              placeholder="Generic Name"
              className="input input-bordered w-full"
              {...register("genericName", { required: true })}
            />

            <textarea
              placeholder="Short Description"
              className="textarea textarea-bordered w-full"
              {...register("description", { required: true })}
            ></textarea>

            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Category</option>
              <option value="Painkiller">Painkiller</option>
              <option value="Antibiotic">Antibiotic</option>
              <option value="Antacid">Antacid</option>
              <option value="Antihistamine">Antihistamine</option>
            </select>

            <select
              {...register("company", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Company</option>
              <option value="Square">Square</option>
              <option value="ACI">ACI</option>
              <option value="Beximco">Beximco</option>
            </select>

            <select
              {...register("unit", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="Mg">Mg</option>
              <option value="ML">ML</option>
            </select>

            <input
              type="number"
              placeholder="Per Unit Price"
              className="input input-bordered w-full"
              {...register("price", { required: true })}
            />

            <input
              type="number"
              placeholder="Discount % (default 0)"
              className="input input-bordered w-full"
              {...register("discount")}
            />
            {/* Photo */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full sm:w-[110px]"
                {...register("photo", {
                  required: "Photo is required",
                  onChange: (e) => handleImagePreview(e),
                })}
              />
              {previewImage && (
                <img
                  className="w-full sm:w-[100px] h-auto rounded-sm"
                  src={previewImage}
                  alt="preview"
                />
              )}
            </div>
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo.message}</p>
            )}

            <div className="modal-action flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button
                type="submit"
                disabled={uploading}
                className="btn btn-primary "
              >
                {uploading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Save"
                )}
              </button>
              <button
                type="button"
                className="btn w-full sm:w-auto"
                onClick={() => {
                  setShowModal(false);
                  reset();
                  setEditData(null);
                  setPreviewImage(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      )}

      {/* View Modal */}
      {viewData && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-2">Medicine Details</h3>
            <img
              src={viewData.image}
              alt={viewData.name}
              className="w-32 h-32 object-cover rounded mb-4"
            />
            <p>
              <strong>Name:</strong> {viewData.name}
            </p>
            <p>
              <strong>Generic Name:</strong> {viewData.genericName}
            </p>
            <p>
              <strong>Description:</strong> {viewData.description}
            </p>
            <p>
              <strong>Category:</strong> {viewData.category}
            </p>
            <p>
              <strong>Company:</strong> {viewData.company}
            </p>
            <p>
              <strong>Unit:</strong> {viewData.unit}
            </p>
            <p>
              <strong>Price:</strong> ${viewData.price}
            </p>
            <p>
              <strong>Discount:</strong> {viewData.discount}%
            </p>
            <div className="modal-action">
              <button onClick={() => setViewData(null)} className="btn">
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageMedicine;
