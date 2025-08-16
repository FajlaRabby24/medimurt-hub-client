import { Link } from "react-router";
import medicineReminder from "../../assets/images/medicinesDelivery.jpg";
import Container from "../common/Ui/Container";

const MedicineDelivery = () => {
  return (
    <Container>
      <section className=" py-12 flex flex-col md:flex-row gap-8">
        {/* Left side: text content */}
        <div className=" space-y-6 flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Fast & Reliable Medicine Delivery
          </h2>
          <p className="text-gray-600 text-lg">
            Order your medicines online and get them delivered safely at your
            doorstep — on time, every time.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Doorstep delivery in 2–3 days</li>
            <li>Cold-chain delivery for sensitive items</li>
            <li>Order tracking & email notifications</li>
          </ul>
          <Link to={"/shop"}>
            <button className="btn btn-primary text-white">
              Start Shopping
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

export default MedicineDelivery;
