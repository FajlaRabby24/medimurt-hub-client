import Banner from "../components/Home/Banner";
import CategoryCardSection from "../components/Home/CategoryCardSection";
import CustomerReviews from "../components/Home/CustomerReivew";
import HealthTipsArticles from "../components/Home/HelthTipsArticles";
import TrackMedicine from "../components/Home/TrackMedicine";

const HomePage = () => {
  return (
    <div className="space-y-44">
      <Banner />
      <CategoryCardSection />
      <TrackMedicine />
      <CustomerReviews />
      <HealthTipsArticles />
    </div>
  );
};

export default HomePage;
