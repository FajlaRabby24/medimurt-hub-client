import { BsTwitterX } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import Logo from "../common/logo/Logo";

const Footer = () => {
  return (
    <div className="bg-base-200">
      <div className="footer footer-horizontal footer-center   p-10">
        <aside>
          <Logo />
          <p className="flex flex-col md:flex-row gap-3 font-semibold">
            <span>Email: fajlarabby.dev@gmail.com</span>
          </p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4 ">
            <a target="_blank" href="https://github.com/FajlaRabby24">
              <button>
                <FaGithub
                  className="p- bg-black cursor-pointer p-2 rounded-full "
                  color="#fff"
                  size={40}
                />
              </button>
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/fajla">
              <button>
                <FaLinkedinIn
                  className="p- bg-black cursor-pointer p-2 rounded-full "
                  color="#fff"
                  size={40}
                />
              </button>
            </a>
            <a target="_blank" href="https://x.com/FajlaRabby24">
              <button>
                <BsTwitterX
                  className="p- bg-black cursor-pointer p-2 rounded-full "
                  color="#fff"
                  size={40}
                />
              </button>
            </a>
          </div>
        </nav>
      </div>
      <p className="text-center sm:font-normal py-2  ">
        Copyright © {new Date().getFullYear()} - All right reserved by
        mediMart-hub.org
      </p>
    </div>
  );
};

export default Footer;
