import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReTitle } from "re-title";
import { useState } from "react";
import { FaStore, FaUser, FaUserShield } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoadingSpiner from "../../../components/common/Loading/LoadingSpiner";
import EmptyState from "../../../components/common/Ui/EmptyState";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["allUsers", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/admin/manage-users?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const users = data?.data || [];
  const totalPages = data?.totalPages || 0;

  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) => {
      await axiosSecure.patch(`/api/admin/update-user-role/${id}`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      toast.success(`Role updated successfully!`);
    },
  });

  const handleRoleChange = (user, newRole) => {
    Swal.fire({
      title: `Change role to ${newRole}?`,
      text: `User: ${user.email}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRole({ id: user._id, role: newRole });
      }
    });
  };

  if (isLoading || isFetching) return <LoadingSpiner />;

  return (
    <div className="p-4 max-w-7xl">
      <ReTitle title="Dashboard | Manage users" />
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      {users.length ? (
        <div>
          {" "}
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full min-w-[700px]">
              <thead className="bg-base-300">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Current Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user._id}>
                    <td>{idx + 1}</td>
                    <td>{user.name || "N/A"}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="capitalize font-semibold">
                        {user.role || "user"}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-2">
                        {user.role !== "admin" && (
                          <button
                            disabled={user.role === "admin"}
                            onClick={() => handleRoleChange(user, "admin")}
                            className="btn btn-sm btn-outline text-blue-600"
                            title="Make Admin"
                          >
                            <FaUserShield />
                          </button>
                        )}
                        {user.role !== "seller" && (
                          <button
                            disabled={user.role === "admin"}
                            onClick={() => handleRoleChange(user, "seller")}
                            className="btn btn-sm btn-outline text-green-600"
                            title="Make Seller"
                          >
                            <FaStore />
                          </button>
                        )}
                        {user.role !== "user" && (
                          <button
                            disabled={user.role === "admin"}
                            onClick={() => handleRoleChange(user, "user")}
                            className="btn btn-sm btn-outline text-red-600"
                            title="Revoke Role"
                          >
                            <FaUser />
                          </button>
                        )}
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
        <EmptyState className="p-20" title="There was no user!" />
      )}
    </div>
  );
};

export default ManageUsers;
