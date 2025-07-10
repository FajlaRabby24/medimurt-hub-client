import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../common/Ui/Container";

const testimonials = [
  {
    quote:
      "The delivery was super fast and the medicines were 100% genuine. Loved the service!",
    name: "Fatima Rahman",
    title: "Nutritionist",
  },
  {
    quote:
      "Finally found a pharmacy I can trust online. The reminder system is a game-changer!",
    name: "Shakil Khan",
    title: "Chronic Patient & Freelancer",
  },
  {
    quote:
      "Excellent experience! Smooth order process and delivery on the same day.",
    name: "Ayesha Siddiqua",
    title: "Primary School Teacher",
  },
  {
    quote:
      "I used the medicine tracker for my parents — it helped a lot to keep them on schedule.",
    name: "Tanvir Alam",
    title: "Software Engineer",
  },
  {
    quote:
      "I’m impressed by the product quality and the way vendors are verified. Very professional.",
    name: "Dr. Rezaul Karim",
    title: "MBBS, Medical Officer",
  },
  {
    quote:
      "Their multi-vendor system lets you compare prices before buying — smart idea!",
    name: "Nadia Khatun",
    title: "Housewife",
  },
  {
    quote:
      "Very convenient for ordering diabetic supplies regularly. Highly recommended.",
    name: "Mohammed Jahangir",
    title: "Retired Banker",
  },
  {
    quote:
      "Using this platform for my pharmacy orders saved me so much time and travel.",
    name: "Sabrina Morshed",
    title: "Corporate Executive",
  },
  {
    quote:
      "App is super smooth and the emergency order option literally saved us once!",
    name: "Hasanul Haque",
    title: "Father & Tech Enthusiast",
  },
  {
    quote:
      "Their Google login and dashboard made it very easy for me to reorder quickly.",
    name: "Shaila Parveen",
    title: "Elderly Caregiver",
  },
];

const CustomerReviews = () => {
  return (
    <Container>
      <section className="bg-gray-100 py-16 px-4 radius text-center mb-36">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          What our customers are sayings
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-10">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>

        <Swiper
          spaceBetween={10}
          breakpoints={{
            320: { slidesPerView: 1 },
            450: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
          }}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="max-w-7xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card transition-all duration-300 ease-in-ou">
                <div className="text-4xl text-cyan-600 mb-4">“</div>
                <p className="text-gray-700 mb-6">{testimonial.quote}</p>
                <div className="h-1 w-16 mx-auto border-b-2 border-dashed border-gray-300 mb-3"></div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-500">{testimonial.title}</p>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom navigation buttons */}
        </Swiper>
        <div className="flex justify-center mt-6 gap-5">
          <button className="prev-btn p-2 rounded-full bg-white shadow-md hover:bg-gray-200">
            <ArrowLeft size={18} />
          </button>
          <button className="next-btn p-2 rounded-full bg-lime-500 text-white hover:bg-lime-600">
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </Container>
  );
};

export default CustomerReviews;
