import { Link } from "react-router";
import immunityImg from "../../assets/images/boostImunity.jpg";
import diabetisImg from "../../assets/images/diabetis.jpg";
import heartHelthImg from "../../assets/images/heartHealth.jpg";
import mentalHelthImg from "../../assets/images/mentalHelth.jpg";
import Container from "../common/Ui/Container";

const articles = [
  {
    title: "5 Proven Tips to Boost Your Immunity Naturally",
    description:
      "Discover effective ways to strengthen your immune system with simple lifestyle changes and natural remedies.",
    image: immunityImg,
    slug: "boost-immunity-naturally",
  },
  {
    title: "Managing Diabetes: A Comprehensive Guide",
    description:
      "Learn how to control your blood sugar levels, plan your meals, and live well with diabetes.",
    slug: "managing-diabetes",
    image: diabetisImg,
  },
  {
    title: "How to Reduce Stress and Improve Mental Health",
    description:
      "Explore techniques such as meditation, exercise, and good sleep habits to reduce stress and anxiety.",
    slug: "mental-health-stress-relief",
    image: mentalHelthImg,
  },
  {
    title: "Understanding Heart Health and Preventing Disease",
    description:
      "Get insights into maintaining a healthy heart through diet, exercise, and regular checkups.",
    slug: "heart-health-tips",
    image: heartHelthImg,
  },
];

const HealthTipsArticles = () => {
  return (
    <Container>
      <section className=" px-3 xl:px-0 py-16">
        <h2 className="text-3xl font-bold text-center text-primary mb-4">
          Health Tips & Articles
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Stay informed with expert-written health articles, tips, and wellness
          insights tailored to help you live a healthier life.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg  transition-all"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {article.description}
                </p>
                <Link
                  to={`/articles/${article.slug}`}
                  className="inline-block text-lime-600 font-medium hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default HealthTipsArticles;
