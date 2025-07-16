import { useQuery } from "@tanstack/react-query";
import { ReTitle } from "re-title";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import LoadingSpiner from "../../../components/common/Loading/LoadingSpiner";
import EmptyState from "../../../components/common/Ui/EmptyState";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const {
    data: salesData = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["salesData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/sales");
      return res.data;
    },
  });

  // Filter by date range
  const filteredData = useMemo(() => {
    if (!startDate || !endDate) return salesData;
    return salesData.filter((sale) => {
      const createdAt = new Date(sale.paid_at);
      return createdAt >= startDate && createdAt <= endDate;
    });
  }, [salesData, startDate, endDate]);

  // Download as Excel
  const handleDownloadExcel = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, download!",
    }).then((result) => {
      if (result.isConfirmed) {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
        XLSX.writeFile(workbook, "Sales_Report.xlsx");
      }
    });
  };
  if (isLoading || isFetching) return <LoadingSpiner />;

  // Table columns
  const columns = [
    {
      name: "Medicine",
      selector: (row) => row.medicine_name,
      sortable: true,
    },
    {
      name: "Company",
      selector: (row) => row.company_name,
    },
    {
      name: "Buyer Email",
      selector: (row) => row.user_email,
    },
    {
      name: "Seller Email",
      selector: (row) => row.seller_email,
    },
    {
      name: "Qty",
      selector: (row) => row.quantity,
      center: "true",
    },
    {
      name: "Price",
      selector: (row) => `৳${row.total_price.toFixed(2)}`,
      right: "true",
    },
    {
      name: "Paid At",
      selector: (row) =>
        new Date(row.paid_at).toLocaleString("en-BD", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
    },
    {
      name: "Transaction ID",
      selector: (row) => row.transaction_id,
      grow: 2,
    },
  ];

  return (
    <div className="p-4 max-w-7xl">
      <ReTitle title="Dashboard | Sales report" />
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold">Sales Report</h2>
        {salesData.length ? (
          <div className="flex items-center flex-wrap justify-center gap-2">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              isClearable={true}
              placeholderText="Select date range"
              className="input input-bordered w-fit"
            />
            <button onClick={handleDownloadExcel} className="btn btn-primary">
              Download Excel
            </button>
          </div>
        ) : undefined}
      </div>

      {salesData.length ? (
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          responsive
          striped
          persistTableHead
        />
      ) : (
        <EmptyState
          className="p-20"
          title="There was no sales data right now!"
        />
      )}
    </div>
  );
};

export default SalesReport;
