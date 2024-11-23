import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FiX } from "react-icons/fi";
import { RiMenu3Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import logo from "./images/mogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import womanpic from "./images/girlie.png";
const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isToastShown, setIsToastShown] = useState(false);

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const modalRef = useRef(null);
  const sideMenuRef = useRef(null);
  const animationPlayed = useRef(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.logwork.com/widget/countdown.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!animationPlayed.current) {
        const scrollPosition = window.scrollY;
        const elementPosition =
          textRef.current.offsetTop - window.innerHeight * 0.75;

        if (scrollPosition > elementPosition) {
          gsap.to(textRef.current, { opacity: 1, y: 0, duration: 1 });
          gsap.to(imageRef.current, { opacity: 1, y: 0, duration: 1 });
          gsap.to(buttonRef.current, { opacity: 1, y: 0, duration: 1 });

          animationPlayed.current = true;
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      gsap.fromTo(
        modalRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }, 0);
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "back.in(1.7)",
      onComplete: () => setIsModalOpen(false),
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      gsap.to(sideMenuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(sideMenuRef.current, {
        x: "-100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  };

  const handleSendMessage = async () => {
    if (!isAnonymous && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (!isToastShown) {
        toast.error("Please enter a valid email address.");
        setIsToastShown(true);
      }
      return;
    }

    if (!message.trim()) {
      if (!isToastShown) {
        toast.error("Please enter a message.");
        setIsToastShown(true);
      }
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://mythriftwaitlist.fly.dev/api/v1/contactus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: isAnonymous
              ? "Anonymous"
              : `From: ${email}\nMessage: ${message}`,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!");
        closeModal();
        setEmail("");
        setMessage("");
        setIsAnonymous(false);
        setIsToastShown(false); // Reset toast shown state after successful message
      } else {
        if (!isToastShown) {
          toast.error(
            `Failed to send message: ${data.message || "Unknown error"}`
          );
          setIsToastShown(true);
        }
      }
    } catch (error) {
      if (!isToastShown) {
        toast.error(`An error occurred: ${error.message}`);
        setIsToastShown(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrollToWaitlist = () => {
    const waitlistSection = document.getElementById("coming-soon");
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    toggleMenu();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const textVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1.5,
      },
    },
  };

  return (
    <div className="bg-customOrange relative overflow-hidden bg-[url('/src/assets/frame43.png')] bg-no-repeat bg-cover bg-center">
      <nav className="sticky top-0 z-50">
        <div className="container mt-6 md:mx-auto justify-between md:px-6 flex md:justify-between md:items-center">
          <div>
            <img src={logo} alt="My Thrift Logo" className="h-5 ml-4" />
          </div>
          <div className="flex items-center md:hidden">
            <button
              aria-expanded={isMenuOpen}
              aria-controls="side-menu"
              onClick={toggleMenu}
              className="text-white text-2xl mr-4"
            >
              <RiMenu3Line />
            </button>
          </div>
          <div className="hidden md:flex items-center md:space-x-6">
            <button
              onClick={openModal}
              className="bg-white text-xs px-2 py-2 mr-4 text-customOrange font-semibold md:py-2 md:px-4 rounded-full hover:bg-gray-100"
            >
              Contact Us
            </button>
          </div>
        </div>
      </nav>

      {/* Side Menu */}
      <div
        ref={sideMenuRef}
        className="fixed top-0 left-0 h-full w-full text-white z-50 transform -translate-x-full"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          background:
            "linear-gradient(to bottom, rgba(249, 83, 30, 0.8) 1%, rgba(0, 0, 0, 0.7) 10%, rgba(0, 0, 0, 0.9) 100%)",
        }}
      >
        <div className="flex flex-col justify-between h-full">
          {/* Top Section: Branding and Close Button */}
          <div className="flex justify-end  px-6 mt-6">
            {/* <img src={logo} alt="My Thrift Logo" className="h-5" /> */}
            <button onClick={toggleMenu} className="text-white">
              <FiX size={24} />
            </button>
          </div>

          {/* Middle Section: Navigation Links */}
          <ul className="flex flex-col items-center justify-center space-y-6 text-xl">
            <li>
              <button
                onClick={() => handleScrollToSection("about-us")}
                className="text-white inline-block py-2 font-medium  border-b border-white hover:text-customOrange hover:transform hover:scale-105 transition-all duration-100"
              >
                About Us
              </button>
            </li>

            <li>
              <button
                onClick={() => handleScrollToSection("faq-section")}
                className="text-white inline-block py-2 border-b font-medium border-white hover:text-customOrange hover:transform hover:scale-105 transition-all duration-100"
              >
                FAQ
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  toggleMenu();
                  openModal();
                }}
                className="text-white inline-block py-2 border-b font-medium border-white hover:text-customOrange hover:transform hover:scale-105 transition-all duration-100"
              >
                Contact Us
              </button>
            </li>
          </ul>

          {/* Bottom Section: Social Media Icons */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-8">
              <a
                href="https://www.instagram.com/mythriftng?igsh=MTFzM2tkMXp2Z2RpYg=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-customOrange hover:transform hover:scale-105 transition-all duration-100"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a
                href="https://x.com/mythriftng"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-customOrange hover:transform hover:scale-105 transition-all duration-200"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-customOrange hover:transform hover:scale-105 transition-all duration-200"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto md:px-6 px-6 text-center lg:text-left">
        <div className="lg:flex lg:items-center">
          <div className="lg:w-full h-full md:pb-20 lg:pb-20 pb-7 mt-20 md:px-20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-white text-6xl font-bold lg:text-6xl"
            >
              <motion.span variants={textVariants}>Browse</motion.span>
              <motion.span variants={textVariants}>
                <span className="bg-[url('/src/assets/line.png')] bg-no-repeat bg-bottom">
                  {" "}
                  Local Markets{" "}
                </span>
              </motion.span>
              <motion.span variants={textVariants}>
                from the Comfort of Your Home
              </motion.span>
            </motion.div>

            <p
              ref={textRef}
              className="mt-6 text-white font-light lg:text-xl opacity-0 transform translate-y-12"
            >
              Step into a world of affordable thrifted (okrika) finds with My
              Thrift – your online gateway to the best local markets and
              vendors. Explore, shop, and discover the most affordable products,
              including maxi skirts, cargo pants, tees, and much more, all from
              the comfort of your home. Discover new vendors with awesome
              products at better prices.
            </p>

            <div
              className="md:mt-8 mt-12 md:gap-7 lg:gap-7 gap-5 flex justify-center lg:justify-start opacity-0 transform translate-y-12"
              ref={buttonRef}
            >
              <img
                src="https://res.cloudinary.com/dtaqusjav/image/upload/v1724414014/people_aenuc1.svg"
                alt="People icons"
                className="h-9 translate-y-2"
              />
              <button
                onClick={handleScrollToWaitlist}
                className="bg-white text-customOrange h-12 px-4 font-semibold md:py-2 md:h-12 md:px-8 rounded-full hover:bg-gray-100"
              >
                Join the Waitlist
              </button>
            </div>
          </div>

          <div
            className="md:w-full w-full md:mt-20   flex justify-center items-center md:h-full opacity-0 transform"
            ref={imageRef}
          >
            <img
              src={womanpic}
              alt="Happy shopper with bags"
              className="md:w-auto md:h-full w-3/4 h-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-60"
            onClick={closeModal}
          ></div>
          <div
            ref={modalRef}
            className="relative bg-white rounded-lg shadow-lg z-10 w-11/12 md:w-1/3"
          >
            <div className="relative bg-customOrange py-2 text-white rounded-t-lg">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white hover:text-gray-200"
              >
                <FiX size={24} />
              </button>
              <h2 className="md:text-2xl text-lg font-semibold text-center py-4">
                Have a Question or Suggestion?
              </h2>
            </div>

            <div className="p-6">
              <p className="text-center text-gray-500 md:px-14 -translate-y-3 text-xs mb-4">
                Leave us a message and we'll get back to you as soon as
                possible!
              </p>

              {!isAnonymous && (
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mb-4 p-3 border border-gray-300 rounded-full h-10 focus:outline-none focus:border-customOrange"
                />
              )}

              <textarea
                placeholder="Write a message.."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full mb-4 p-3 border border-gray-300 resize-none rounded-md focus:outline-none bg-gray-100 h-44 focus:border-customOrange placeholder:text-top placeholder:pl-1 placeholder:pt-2"
              />

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={() => setIsAnonymous(!isAnonymous)}
                  className="mr-2"
                />
                <label htmlFor="anonymous" className="text-gray-500 text-sm">
                  Submit Anonymously
                </label>
              </div>

              <button
                onClick={handleSendMessage}
                className="w-full bg-customOrange text-white p-3 rounded-full hover:bg-orange-600 flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  />
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-center" />
    </div>
  );
};

export default Hero;
