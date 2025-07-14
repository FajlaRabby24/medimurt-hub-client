import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import LoadingSpiner from "../common/Loading/LoadingSpiner";
import Container from "../common/Ui/Container";

const CategoryCardSection = () => {
  const axiosPublic = useAxios();

  const {
    data: categories = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["medicineCategoriesForHomePage"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/users/categories");
      return res.data;
    },
    staleTime: Infinity,
  });

  if (isFetching || isLoading) {
    return <LoadingSpiner />;
  }

  return (
    <Container>
      <section className="py-10 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Browse Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories?.slice(0, 8)?.map((cat) => (
            <Link to={`/categories/${cat.category_name}`} key={cat._id}>
              <div className="bg-white rounded-lg shadow-md pb-3 cursor-pointer hover:shadow-lg transition">
                <img
                  src={cat.category_image}
                  alt={cat.category_name}
                  className="w-full h-32 object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-2 text-center">
                  {cat.category_name}
                </h3>
                <p className="text-sm text-gray-600 text-center mt-1">
                  {cat.total_medicines ? cat.total_medicines : "No"} Medicines
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default CategoryCardSection;
