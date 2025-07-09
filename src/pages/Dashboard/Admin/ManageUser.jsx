import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaStore, FaUser, FaUserShield } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoadingSpiner from "../../../components/common/Loading/LoadingSpiner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/users");
      return res.data;
    },
    staleTime: Infinity,
  });

  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) => {
      await axiosSecure.patch(`/api/users/${id}/role`, { role });
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

  if (isLoading) return <LoadingSpiner />;

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

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
                        onClick={() => handleRoleChange(user, "admin")}
                        className="btn btn-sm btn-outline text-blue-600"
                        title="Make Admin"
                      >
                        <FaUserShield />
                      </button>
                    )}
                    {user.role !== "seller" && (
                      <button
                        onClick={() => handleRoleChange(user, "seller")}
                        className="btn btn-sm btn-outline text-green-600"
                        title="Make Seller"
                      >
                        <FaStore />
                      </button>
                    )}
                    {user.role !== "user" && (
                      <button
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
    </div>
  );
};

export default ManageUsers;
