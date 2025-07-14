import { format } from "date-fns";
import { useRef } from "react";
import { FaPrint } from "react-icons/fa6";
import { Navigate, useLocation } from "react-router";
import { useReactToPrint } from "react-to-print";
import Logo from "../../components/common/logo/Logo";
import useAuth from "../../hooks/useAuth";

const InvoicePage = () => {
  const contentRef = useRef(null);
  const { state } = useLocation();
  const { user } = useAuth();

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `Invoice_${state?.transactionId}`,
  });

  if (!state?.transactionId) {
    return <Navigate to="/cart" replace />;
  }

  const { transactionId, cart, paymentTime, grandTotal, paymentMethod } = state;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Invoice</h2>
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={reactToPrintFn}
        >
          <FaPrint /> <span>Download</span>
        </button>
      </div>

      {/* Printable Section */}
      <div
        ref={contentRef}
        className="bg-white p-4 sm:p-6 md:p-8 rounded-md  border text-sm"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-4">
          <Logo />
          <div className="text-left md:text-right mt-4 md:mt-0">
            <p>
              <span className="font-medium">Invoice Date:</span>{" "}
              {format(new Date(paymentTime), "MMMM d, yyyy")}
            </p>
            <p>
              <span className="font-medium">Invoice ID:</span> #{transactionId}
            </p>
          </div>
        </div>

        {/* Buyer Info */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-2">Billed To:</h3>
          <p>{user?.displayName}</p>
          <p>{user?.email}</p>
        </div>

        {/* Item Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border text-xs sm:text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Medicine</th>
                <th className="border px-4 py-2 text-center">Company</th>
                <th className="border px-4 py-2 text-center">Unit Price</th>
                <th className="border px-4 py-2 text-center">Qty</th>
                <th className="border px-4 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item, i) => (
                <tr key={i} className="text-gray-800">
                  <td className="border px-4 py-2">{item.medicine_name}</td>
                  <td className="border px-4 py-2 text-center">
                    {item.company_name}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    ৳
                    {(item.price - (item.price * item.discount) / 100).toFixed(
                      2
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {item.quantity}
                  </td>
                  <td className="border px-4 py-2 text-right">
                    ৳{item.total_price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="text-right space-y-2 text-sm sm:text-base">
          <p>
            <span className="font-semibold">Payment Method:</span>{" "}
            {paymentMethod?.type}
          </p>
          <p>
            <span className="font-semibold">Transaction ID:</span>{" "}
            <code className="text-xs break-all">{transactionId}</code>
          </p>
          <p className="text-lg sm:text-xl font-bold">
            Grand Total:{" "}
            <span className="text-green-600">৳{grandTotal.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
