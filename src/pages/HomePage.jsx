import CustomerReviews from "../components/Home/CustomerReivew";
import TrackMedicine from "../components/Home/TrackMedicine";

const HomePage = () => {
  return (
    <div className="space-y-44">
      <TrackMedicine />
      <CustomerReviews />
    </div>
  );
};

export default HomePage;
