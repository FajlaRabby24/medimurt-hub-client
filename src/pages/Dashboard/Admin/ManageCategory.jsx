import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReTitle } from "re-title";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoadingSpiner from "../../../components/common/Loading/LoadingSpiner";
import EmptyState from "../../../components/common/Ui/EmptyState";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { convertToLocatTime } from "../../../utilities/convertToLocalTime";
import { imageUpload } from "../../../utilities/imageUpload";

const ManageCategorys = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [uploading, setIsUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch all categories
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["medicineCategories", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/admin/categories?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const categories = data?.data || [];
  const totalPages = data?.totalPages || 0;

  // Add / Update category
  const categoryMutation = useMutation({
    mutationFn: async (data) => {
      if (editingCategory) {
        return axiosSecure.patch(
          `/api/admin/categories/${editingCategory._id}`,
          data
        );
      } else {
        return axiosSecure.post("/api/admin/categories", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["medicineCategories"]);
      toast.success(
        `Category ${editingCategory ? "updated" : "added"} successfully!`
      );
      reset();
      setShowModal(false);
      setEditingCategory(null);
      setPreviewImage(null);
      setIsUploading(false);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/api/admin/categories/${id}`);
        queryClient.invalidateQueries(["medicineCategories"]);
        toast.error(`Category deleted successfully!`);
      }
    });
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setValue("name", category.name);
    setValue("image", category.image);
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    setIsUploading(true);
    const image = data?.photo[0];
    const imageUrl = await imageUpload(image);
    const newCategory = {
      category_name: data?.categoryName,
      category_image: imageUrl,
      created_by: user.email,
    };
    categoryMutation.mutate(newCategory);
    setIsUploading(false);
  };

  if (isLoading || isFetching) return <LoadingSpiner />;

  // handle image preview
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
    }
  };

  return (
    <div className="p-4 max-w-7xl">
      <ReTitle title="Dashboard | Manage category" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold">Manage Categories</h2>
        <button
          onClick={() => {
            setShowModal(true);
            setEditingCategory(null);
            reset();
          }}
          className="btn btn-primary"
        >
          Add Category
        </button>
      </div>
      {categories.length ? (
        <div>
          {" "}
          {/* Category Table */}
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full min-w-[700px]">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Category Name</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => (
                  <tr key={cat._id}>
                    <td>{idx + 1}</td>
                    <td>
                      <img
                        src={cat.category_image}
                        alt={cat.categoryName}
                        className="w-16 h-16 rounded"
                      />
                    </td>
                    <td>{cat.category_name}</td>
                    <td>{convertToLocatTime(cat.created_at)}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(cat)}
                          className="btn btn-sm btn-outline"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="btn btn-sm btn-error text-white"
                          title="Delete"
                        >
                          <FaTrash />
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
        </div>
      ) : (
        <EmptyState
          className="p-20"
          title="There was no category!"
          description="You can add category by clicking Add category button."
        />
      )}

      {/* Modal */}
      {showModal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="modal-box space-y-4"
          >
            <h3 className="font-bold text-lg">
              {editingCategory ? "Update Category" : "Add New Category"}
            </h3>

            <input
              type="text"
              placeholder="Category Name"
              className="input input-bordered w-full"
              {...register("categoryName", {
                required: "Category name is required",
              })}
            />
            {errors.categoryName && (
              <p className="text-red-500">{errors.categoryName?.message}</p>
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
                <p className="text-red-500 text-sm">{errors.photo?.message}</p>
              )}
            </div>

            <div className="modal-action">
              <button
                type="submit"
                disabled={uploading}
                className="btn btn-primary w-full sm:w-auto"
              >
                {uploading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : editingCategory ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => {
                  setShowModal(false);
                  reset();
                  setPreviewImage(null);
                  setEditingCategory(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ManageCategorys;
