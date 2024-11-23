import React, { useState, useEffect, useRef } from "react";
import { RotatingLines } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
import appStore from "./images/apple ssooo.png";
import googlePlay from "./images/google s.png";
import phoneImage from "./images/thrift spin.png";
import manSoon from "./images/mansoon.svg";

const ComingSoonSection = () => {
  const [userType, setUserType] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = useState(""); // State for email input
  const [loading, setLoading] = useState(false);
  const [spin, setSpin] = useState(false);
  const phoneImageRef = useRef(null);
  const [isToastShown, setIsToastShown] = useState(false);

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleWaitlistSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      if (!isToastShown) {
        toast.error("Please enter a valid email address.");
        setIsToastShown(true);
      }
      return;
    }

    if (!inputValue) {
      if (!isToastShown) {
        toast.error("Please enter a valid name or store name.");
        setIsToastShown(true);
      }
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://mythriftwaitlist.fly.dev/api/v1/sendmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: inputValue,
            email: email,
            type: userType,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Successfully joined the waitlist!");
        setIsToastShown(false); // Reset the toast shown state after success
      } else if (response.status === 409) {
        if (!isToastShown) {
          toast.error("Email has already been registered, Thank you.");
          setIsToastShown(true);
        }
      } else {
        if (!isToastShown) {
          toast.error(
            `Failed to join the waitlist: ${data.message || "Unknown error"}`
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
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSpin(true);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (phoneImageRef.current) {
      observer.observe(phoneImageRef.current);
    }

    return () => {
      if (phoneImageRef.current) {
        observer.unobserve(phoneImageRef.current);
      }
    };
  }, []);

  return (
    <div>
      <section
        ref={phoneImageRef}
        className="md:w-full md:max-w-[1440px] md:mx-auto md:px-6 md:py-16 md:flex md:items-center md:justify-between"
      >
        <div className="md:max-w-lg">
          <h2 className="md:text-4xl lg:text-4xl text-4xl items-center mt-8 flex justify-center text-center font-bold mb-4">
            Coming soon to the app store
          </h2>
          <p className="md:text-lg text-gray-700 text-center md:text-left md:mb-6 px-4 md:px-0  mt-8 text-lg">
            Get ready to take your online shopping experience to the next level
            with the MyThrift app. Soon, you'll be able to explore, shop, and
            snag the best thrifted finds right from your phone. Stay tuned and
            be the first to know when we launch!
          </p>
          <div className="md:flex md:gap-4 flex justify-center md:justify-start mt-8 gap-4">
            <img
              src={googlePlay}
              alt="Google Play Store"
              className="md:h-12 lg:h-12 h-9 cursor-pointer"
            />
            <img
              src={appStore}
              alt="App Store"
              className="md:h-10 lg:h-11 height mt-0.5 cursor-pointer"
            />
          </div>
        </div>

        <div className="md:relative flex justify-center md:justify-end mt-20 md:mt-0">
          <img
            id="phone-image"
            src={phoneImage}
            alt="MyThrift App"
            className={`md:h-auto md:w-4/6 px-4 md:px-0 ${
              spin ? "spin-animation" : ""
            }`}
          />
        </div>
      </section>

      <section className="w-full max-w-[1440px] mx-auto pb-20 px-6 flex items-center justify-between bg-[url('/src/assets/curveline.png')] bg-no-repeat bg-center">
        <div className="relative md:block lg:block hidden">
          <img
            src="https://res.cloudinary.com/dtaqusjav/image/upload/v1724415304/mansoon_msyshp.svg"
            alt="Man smiling"
            className="h-auto translate-y-20 w-auto"
          />
        </div>

        <div id="coming-soon" className="md:max-w-lg mt-12">
          <h2 className="text-5xl md:block lg:block hidden font-bold mb-4">
            <span className="text-black">Be the First to</span>
            <br />
            <span className="text-customOrange">
              <span className="text-black">Experience</span> My Thrift
            </span>
          </h2>
          <h1 className="text-5xl mt-4 text-center md:hidden lg:hidden font-bold">
            Be the First to experience{" "}
            <span className="text-customOrange"> My Thrift.</span>
          </h1>
          <p className="md:text-lg md:text-left md:w-full text-center text-gray-700 mt-4 mb-6">
            Join our waitlist now and get early access to a world of unique
            thrifted and new fashion. Don’t miss out—secure your spot today!
          </p>

          <div className="md:relative md:justify-start flex justify-center text-gray-700 mb-5">
            <select
              className="block appearance-none md:w-full md:max-w-md w-full bg-[#F7F7F7] border text-gray-700 placeholder-gray-500 px-4 py-3 pr-12 rounded-full focus:outline-none focus:border-gray-500 bg-no-repeat bg-right"
              aria-label="Who are you registering as"
              value={userType}
              onChange={handleUserTypeChange}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='gray'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundPositionX: "calc(100% - 1rem)",
                backgroundPositionY: "center",
                backgroundSize: "1rem 1rem",
              }}
            >
              <option value="">Who are you registering as...</option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>

            <div className="pointer-events-none absolute md:mr-20 lg:mr-20 mr-12 inset-y-0 right-0 flex items-center px-2 text-gray-700">
              {/* <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.516 7.548l4.486 4.486 4.485-4.486a.75.75 0 1 1 1.06 1.06l-5.015 5.015a.75.75 0 0 1-1.06 0l-5.015-5.015a.75.75 0 1 1 1.06-1.06z" />
              </svg> */}
            </div>
          </div>

          {userType === "customer" && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter Your Name"
                className="block md:w-full md:max-w-md px-4 py-3 bg-[#F7F7F7] text-gray-700 placeholder-gray-500 rounded-full focus:outline-none focus:border-gray-500"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
          )}
          {userType === "vendor" && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter Your Store Name"
                className="block w-full  md:w-full md:max-w-md  px-4 py-3 bg-[#F7F7F7] text-gray-700 placeholder-gray-500 rounded-full focus:outline-none focus:border-gray-500"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="flex w-full md:block ml-2 lg:block hidden max-w-md">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="flex-grow py-3 px-12 bg-[#F7F7F7] text-gray-700 placeholder-gray-500 rounded-l-full focus:outline-none focus:border-gray-500"
              value={email} // Bind the value to the state
              onChange={handleEmailChange} // Update the state on input change
            />
            <button
              onClick={handleWaitlistSubmit}
              className="bg-gradient-to-r from-customOrange to-red-500 text-white font-semibold py-3 px-6 rounded-r-full hover:bg-orange-600"
              disabled={loading}
            >
              {loading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />
              ) : (
                "Join the Waitlist"
              )}
            </button>
          </div>
          <div className="flex w-full md:hidden lg:hidden max-w-md">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="flex-grow py-3 px-4 bg-[#F7F7F7] text-gray-700 placeholder-gray-500 rounded-full focus:outline-none focus:border-gray-500"
              value={email} // Bind the value to the state
              onChange={handleEmailChange} // Update the state on input change
            />
          </div>
          <button
            onClick={handleWaitlistSubmit}
            className="bg-gradient-to-r from-customOrange mt-2 flex justify-center to-red-500 text-white font-semibold py-3 px-6 rounded-full md:hidden lg:hidden block w-full hover:bg-orange-600"
            disabled={loading}
          >
            {loading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              "Join the Waitlist"
            )}
          </button>
        </div>
      </section>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ComingSoonSection;
