import { Switch } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingSpiner from "../../../components/common/Loading/LoadingSpiner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageBannerAdvertise = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all advertisements
  const {
    data: advertisements = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["allAdvertisements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/advertisements");
      return res.data;
    },
    staleTime: Infinity,
  });

  // Toggle status mutation
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/api/advertisements/${id}`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allAdvertisements"]);
      toast.success("Advertisement status updated");
    },
    onError: () => toast.error("Update failed!"),
  });

  // Handle toggle
  const handleToggle = (ad) => {
    const newStatus = ad.status === "active" ? "pending" : "active";
    statusMutation.mutate({ id: ad._id, status: newStatus });
  };

  if (isLoading || isFetching) return <LoadingSpiner />;

  return (
    <div className="p-4 sm:p-6 w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        Manage Banner Advertisements
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full min-w-[800px]">
          <thead>
            <tr>
              <th>Image</th>
              <th>Medicine Name</th>
              <th>Description</th>
              <th>Seller Email</th>
              <th>Status</th>
              <th>Slider Toggle</th>
            </tr>
          </thead>
          <tbody>
            {advertisements.map((ad) => (
              <tr key={ad._id}>
                <td>
                  <img
                    src={ad.image_url}
                    alt="Medicine"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{ad.medicine_name}</td>
                <td className="max-w-[200px] break-words">{ad.description}</td>
                <td>{ad.created_by}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      ad.status === "active"
                        ? "bg-green-200 text-green-700"
                        : "bg-yellow-200 text-yellow-700"
                    }`}
                  >
                    {ad.status}
                  </span>
                </td>
                <td>
                  <Switch
                    checked={ad.status === "active"}
                    onChange={() => handleToggle(ad)}
                    className={`${
                      ad.status === "active" ? "bg-green-600" : "bg-gray-400"
                    } relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
                  >
                    <span className="sr-only">Toggle banner</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        ad.status === "active"
                          ? "translate-x-5"
                          : "translate-x-0"
                      } pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBannerAdvertise;
