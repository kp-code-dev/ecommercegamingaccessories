import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaPhone, FaMapLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";

function Footer() {
  return (
    <footer className="w-full bg-card/50 backdrop-blur-sm border-t border-border p-6 text-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm font-body">
            &copy; 2026-{new Date().getFullYear()} Gaming Gear Ecommerce Store. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground font-body">Follow Us</span>
            <a href="https://www.facebook.com/codeandlifekp" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-lg">
              <FaFacebookF />
            </a>
            <a href="https://www.youtube.com/@CoderLifeKP" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-lg">
              <FaYoutube />
            </a>
            <a href="https://www.instagram.com/code_and_life_kp" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-lg">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-4 pt-4 flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground font-body">
              <FaMapLocationDot className="text-primary" />
              <span>Ahmedabad, Gujarat, India - 380001</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm font-body">
              <IoIosMail className="text-primary" />
              <a href="mailto:kp.codeandlife@gmail.com" className="text-muted-foreground hover:text-primary transition-colors no-underline">kp.codeandlife@gmail.com</a>
            </div>
            <div className="flex items-center gap-2.5 text-sm font-body">
              <FaPhone className="text-primary" />
              <a href="tel:+917016028198" className="text-muted-foreground hover:text-primary transition-colors no-underline">+917016028198</a>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground font-body">
              <IoTime className="text-primary" />
              <span>Mon-Fri: 9am-6pm</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm font-body">
            <Link to="/about-us" className="text-muted-foreground hover:text-primary transition-colors no-underline">About</Link>
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors no-underline">Privacy Policy</Link>
            <Link to="/contact-us" className="text-muted-foreground hover:text-primary transition-colors no-underline">Contact</Link>
            <Link to="/return-policy" className="text-muted-foreground hover:text-primary transition-colors no-underline">Return Policy</Link>
            <Link to="/faqs" className="text-muted-foreground hover:text-primary transition-colors no-underline">FAQ</Link>
            <Link to="/term-of-use" className="text-muted-foreground hover:text-primary transition-colors no-underline">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
