import { useQuery } from "@tanstack/react-query";
import { ReTitle } from "re-title";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoadingSpiner from "../../../components/common/Loading/LoadingSpiner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../utilities/imageUpload";

const AskForAdvertisement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [uploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch Advertisements
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["sellerAdvertisements", user.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/seller/advertisements/mine?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  console.log(data);
  const advertisements = data?.data || [];
  const totalPages = data?.totalPages || 0;

  // Submit Handler
  const onSubmit = async (data) => {
    setIsUploading(true);
    const image = data?.photo[0];
    const imageUrl = await imageUpload(image);

    const newAd = {
      image_url: imageUrl,
      created_by: user?.email,
      medicine_name: data.name,
      description: data.description,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post(
        `/api/seller/add-advertisements`,
        newAd
      );
      if (res?.data?.insertedId) {
        toast.success("Advertisement submitted successfully!");
        setShowModal(false);
        reset();
        setPreviewImage(null);
        refetch();
      }
    } catch (err) {
      toast.error("Uploading failed. Please try again!");
    } finally {
      setIsUploading(false);
    }
  };

  // handle image preview
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
    }
  };

  // handle view
  const handleView = (ad) => {
    setSelectedAd(ad);
    setShowViewModal(true);
  };

  // handle delete addvertise
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const adDeleteRes = await axiosSecure.delete(
          `/api/seller/delete-advertisements/${id}`
        );
        if (adDeleteRes?.data.deletedCount) {
          toast.success("Advertisement deleted!");
          refetch();
        }
      }
    });
  };

  if (isLoading || isFetching) return <LoadingSpiner />;

  return (
    <div className="p-4  sm:p-6 max-w-7xl">
      <ReTitle title="Dashboard | Ask for ads" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Ask For Advertisement</h2>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          Add Advertise
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="table table-zebra w-full min-w-[750px]">
          <thead>
            <tr>
              <th>Image</th>
              <th>Medicine name</th>
              <th>Description</th>
              <th>Created</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {advertisements.map((ad) => (
              <tr key={ad._id}>
                <td>
                  <img
                    src={ad.image_url}
                    alt="ad"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{ad.medicine_name}</td>
                <td className="max-w-[200px] break-words">{ad.description}</td>
                <td>{new Date(ad.created_at).toLocaleString()}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-xl font-semibold text-xs sm:text-sm ${
                      ad.status === "pending"
                        ? "bg-red-200 text-red-700"
                        : "bg-green-200 text-green-700"
                    }`}
                  >
                    {ad.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(ad)}
                      className="btn btn-sm btn-outline flex items-center gap-1"
                    >
                      <FaEye className="text-base" />
                    </button>
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="btn btn-sm btn-error text-white flex items-center gap-1"
                    >
                      <FaTrash className="text-base" />
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
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="modal-box space-y-4 max-w-full sm:max-w-xl"
          >
            <h3 className="font-bold text-lg">Request Advertisement</h3>
            <input
              type="text"
              placeholder="Medicine Name"
              className="input input-bordered w-full"
              {...register("name", { required: "Medicine name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            {/* Photo */}
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text">Upload Photo</span>
              </label>
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
            </div>

            <textarea
              placeholder="Short Description"
              className="textarea textarea-bordered w-full"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Minimum 10 characters required",
                },
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}

            <div className="modal-action flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button
                type="submit"
                disabled={uploading}
                className="btn btn-primary w-full sm:w-auto"
              >
                {uploading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Submit"
                )}
              </button>
              <button
                type="button"
                className="btn w-full sm:w-auto"
                onClick={() => {
                  setShowModal(false);
                  reset();
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
      {showViewModal && selectedAd && (
        <dialog open className="modal modal-middle sm:modal-middle">
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-xl mb-4">Advertisement Info</h3>
            <img
              src={selectedAd.image_url}
              alt="ad"
              className="w-full h-56 object-cover rounded mb-4"
            />
            <div className="space-y-1">
              <p>
                <strong>Medicine Name:</strong> {selectedAd.medicine_name}
              </p>
              <p>
                <strong>Description:</strong> {selectedAd.description}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                    selectedAd.status === "pending"
                      ? "bg-red-200 text-red-700"
                      : "bg-green-200 text-green-700"
                  }`}
                >
                  {selectedAd.status}
                </span>
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(selectedAd.created_at).toLocaleString()}
              </p>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setShowViewModal(false)}
                className="btn btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AskForAdvertisement;
