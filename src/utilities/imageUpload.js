import axios from "axios";

// imame upload and return image url
export const imageUpload = async (file) => {
  const imageFormData = new FormData();
  imageFormData.append("file", file);
  imageFormData.append("upload_preset", `medicine__center`);
  imageFormData.append(
    "cloud_name",
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  );

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`,
    imageFormData
  );
  return data?.url;
};
