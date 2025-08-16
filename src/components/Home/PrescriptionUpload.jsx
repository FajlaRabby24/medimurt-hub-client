import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFilePrescription, FaUpload } from "react-icons/fa";

const PrescriptionUpload = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [fileName, setFileName] = useState("");

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset();
    setFileName("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <section className="py-16 bg-[#f9fafb]" id="prescription-upload">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <FaFilePrescription className="text-blue-600" /> Upload Prescription
          </h2>
          <p className="text-gray-600 mt-2">
            Upload your doctor’s prescription and get your medicines delivered
            with confidence
          </p>
        </div>

        {/* Form Card */}
        <div className="card bg-white shadow-md rounded-2xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Name & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="input input-bordered w-full"
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-medium">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  className="input input-bordered w-full"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^(01[3-9]\d{8})$/,
                      message: "Enter a valid Bangladeshi phone number",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Upload Prescription
                </span>
              </label>
              <label
                htmlFor="fileUpload"
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition"
              >
                <input
                  type="file"
                  accept="image/*,.pdf"
                  id="fileUpload"
                  className="hidden"
                  {...register("prescription", {
                    required: "Prescription file is required",
                  })}
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="fileUpload"
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <FaUpload className="text-3xl text-blue-600" />
                  <span className="text-gray-500">
                    {fileName ? fileName : "Click to upload"}
                  </span>
                  <span className="text-xs text-gray-400">
                    (Only JPG, PNG, or PDF allowed)
                  </span>
                </label>
              </label>
              {errors.prescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.prescription.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Delivery Address</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows="3"
                placeholder="Enter your delivery address"
                {...register("address", {
                  required: "Delivery address is required",
                })}
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary px-8">
                Submit Prescription
              </button>
            </div>
          </form>
        </div>

        {/* Trust Note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          🔒 Your prescription is safe and confidential. We only share it with
          licensed pharmacists.
        </p>
      </div>
    </section>
  );
};

export default PrescriptionUpload;
