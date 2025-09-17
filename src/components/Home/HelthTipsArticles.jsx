import { useState } from "react";
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
    content: `Here’s a detailed breakdown on how you can naturally boost immunity:
    - Eat more fruits and vegetables.
    - Get enough quality sleep.
    - Exercise regularly.
    - Reduce stress through mindfulness.
    - Stay hydrated.`,
  },
  {
    title: "Managing Diabetes: A Comprehensive Guide",
    description:
      "Learn how to control your blood sugar levels, plan your meals, and live well with diabetes.",
    image: diabetisImg,
    content: `Managing diabetes requires:
    - Monitoring blood sugar regularly.
    - Following a healthy diet.
    - Exercising consistently.
    - Taking prescribed medications.
    - Managing stress effectively.`,
  },
  {
    title: "How to Reduce Stress and Improve Mental Health",
    description:
      "Explore techniques such as meditation, exercise, and good sleep habits to reduce stress and anxiety.",
    image: mentalHelthImg,
    content: `To improve mental health:
    - Practice meditation or yoga.
    - Exercise at least 30 mins daily.
    - Maintain social connections.
    - Develop healthy sleep habits.
    - Limit caffeine and alcohol.`,
  },
  {
    title: "Understanding Heart Health and Preventing Disease",
    description:
      "Get insights into maintaining a healthy heart through diet, exercise, and regular checkups.",
    image: heartHelthImg,
    content: `For better heart health:
    - Eat more whole grains, fruits, and vegetables.
    - Exercise 150 mins/week.
    - Avoid smoking and alcohol.
    - Go for regular health checkups.
    - Manage blood pressure & cholesterol.`,
  },
];

const HealthTipsArticles = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openModal = (article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  return (
    <Container>
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-primary mb-4">
          Health Tips & Articles
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Stay informed with expert-written health articles, tips, and wellness
          insights tailored to help you live a healthier life.
        </p>

        {/* Grid of articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles?.map((article, index) => (
            <div
              key={index}
              onClick={() => openModal(article)}
              className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all"
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
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedArticle && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm p-4"
            onClick={closeModal} // clicking background closes modal
          >
            <div
              className="bg-white rounded-lg max-w-lg w-full shadow-lg relative p-6 overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
            >
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
                onClick={closeModal}
              >
                ×
              </button>

              {/* Modal Content */}
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedArticle.title}
              </h3>
              <p className="text-gray-600 mb-2 whitespace-pre-line">
                {selectedArticle.description}
              </p>
              <p className="text-gray-600 whitespace-pre-line">
                {selectedArticle.content}
              </p>
            </div>
          </div>
        )}
      </section>
    </Container>
  );
};

export default HealthTipsArticles;
