import { Link } from "react-router";
import medicineReminder from "../../assets/images/trackingMedicine.jpg";
import Container from "../common/Ui/Container";

const TrackMedicine = () => {
  return (
    <Container>
      <section className=" px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Left side: text content */}
        <div className=" space-y-6 flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Track Your Medicines Easily
          </h2>
          <p className="text-gray-600 text-lg">
            Stay on top of your health with our smart medicine tracker. Set
            reminders, track doses, and get notified — never miss a pill again!
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Custom reminders for each medicine</li>
            <li>Daily, weekly, or hourly tracking</li>
            <li>Auto refill alerts for prescriptions</li>
          </ul>
          <Link to={"/track-medicine"}>
            <button className="btn bg-gradient-to-r from-purple-500 to-cyan-500 text-white">
              Start Tracking Now
            </button>
          </Link>
        </div>

        {/* Right side: image */}
        <div className="flex-1 ">
          <img
            src={medicineReminder}
            alt="Track Medicine"
            className="w-full radius"
          />
        </div>
      </section>
    </Container>
  );
};

export default TrackMedicine;
