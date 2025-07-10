import Banner from "../components/Home/Banner";
import CustomerReviews from "../components/Home/CustomerReivew";
import HealthTipsArticles from "../components/Home/HelthTipsArticles";
import TrackMedicine from "../components/Home/TrackMedicine";

const HomePage = () => {
  return (
    <div className="space-y-44">
      <Banner />
      <TrackMedicine />
      <CustomerReviews />
      <HealthTipsArticles />
    </div>
  );
};

export default HomePage;
