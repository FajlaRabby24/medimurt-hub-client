import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaLinkedin, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot, FaX } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import Reveal from "../animations/Reveal";
import Container from "../components/common/Ui/Container";

const Contact = () => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setIsSubmitting(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_emailjs_server_id,
        import.meta.env.VITE_emailjs_template_id,
        formRef.current,
        { publicKey: "15JZ_CaN9OaulYRHr" }
      )
      .then(
        () => {
          toast.success("Thanks for reaching out. I'll contact you soon!");
          reset();
          setIsSubmitting(false);
        },
        (error) => {
          toast.error(`FAILED... ${error.text}`);
          setIsSubmitting(false);
        }
      );
  };

  return (
    <Container>
      <section className="px-3 xl:px-0 overflow-hidden w-full">
        <h2 className="text-4xl text-center font-semibold pb-10 pt-6">
          Contact Me
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Contact Information */}
          <Reveal className="bg-gradient-to-br from-[#1e1b38] to-[#291e40] border border-[#5e4ca7] p-3 md:p-6 rounded-lg bg-base-100 shadow-md">
            <h3 className="text-xl text-white font-semibold mb-4">
              Contact Information
            </h3>
            <div className="bg-base-200 space-y-2 px-3 py-3 rounded-lg">
              <p className="flex items-center gap-2 font-semibold">
                <MdEmail size={20} /> Email:{" "}
                <span className="font-normal">fajlarabby.dev@gmail.com</span>
              </p>
              <p className="flex items-center gap-2 font-semibold">
                <FaLocationDot size={20} /> Location:{" "}
                <span className="font-normal">Dhaka, Bangladesh</span>
              </p>
              <p className="flex items-center gap-2 font-semibold">
                <FaPhoneAlt size={20} /> Phone:{" "}
                <span className="font-normal">+8801857796312</span>
              </p>
              <p className="flex items-center gap-2 font-semibold">
                <FaWhatsapp size={20} /> Whatsapp:{" "}
                <span className="font-normal">+8801307495864</span>
              </p>

              {/* Social Icons */}
              <div className="flex mt-6 items-center gap-3">
                <a
                  className="p-2 rounded-full bg-neutral"
                  target="_blank"
                  href="https://github.com/FajlaRabby24"
                >
                  <FaGithub size={25} color="white" />
                </a>
                <a
                  className="p-2 rounded-full bg-neutral"
                  target="_blank"
                  href="https://www.linkedin.com/in/fajla"
                >
                  <FaLinkedin size={20} color="white" />
                </a>
                <a
                  className="p-2 rounded-full bg-neutral"
                  target="_blank"
                  href="https://x.com/FajlaRabby24"
                >
                  <FaX size={20} color="white" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal className="bg-gradient-to-br from-[#1e1b38] to-[#291e40] border border-[#5e4ca7] p-3 md:p-6 rounded-lg bg-base-100 shadow-md">
            <form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                  {...register("user_name", { required: "Name is required" })}
                />
                {errors.user_name && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.user_name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full"
                  {...register("user_email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.user_email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.user_email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Phone (optional)"
                  className="input input-bordered w-full"
                  {...register("user_phone")}
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="input input-bordered w-full"
                  {...register("user_subject", {
                    required: "Subject is required",
                  })}
                />
                {errors.user_subject && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.user_subject.message}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Message..."
                  className="textarea textarea-bordered w-full"
                  rows="4"
                  {...register("message", {
                    required: "Message is required",
                  })}
                ></textarea>
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn w-full btn-info"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Send Email"
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </Container>
  );
};

export default Contact;
