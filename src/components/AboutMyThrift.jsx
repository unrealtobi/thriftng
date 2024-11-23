import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import cart from "../assets/cart.svg";
import icons from "../assets/cons.svg";
import shop from "../assets/shop.svg";
import phone2 from "./images/two phones.png";

gsap.registerPlugin(ScrollTrigger);

const AboutMyThrift = () => {
  const cardsRef = useRef([]);
  const phoneImageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5, 
        stagger: 0.5,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
        },
      }
    );

    
    gsap.fromTo(
      phoneImageRef.current,
      { x: "100%", opacity: 0 }, 
      {
        x: "0%",
        opacity: 1,
        duration: 10,
        ease: "expo.out", 
        scrollTrigger: {
          trigger: phoneImageRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 10, 
          delay: 9, 
        },
      }
    );
  }, []);

  return (
    <div className="md:-translate-y-12">
      {/* Introduction Section */}
      <section className="md:w-full md:max-w-[1440px] md:h-[600px] mt-20 pb-20 md:gap-6 gap-5  md:mx-auto md:py-14 md:flex justify-center" id="about-us">
        <div
          className="md:w-10/12 lg:w-10/12 md:ml-16 lg:ml-16 md:block lg:block hidden"
          ref={phoneImageRef}
        >
          <img src={phone2} alt="Phone" />
        </div>
        <div className="md:ml-6 lg:ml-6 lg:mt-32 -translate-y-12 md:text-left lg:text-left flex justify-center text-center   flex-col md:mt-32">
          <h2 className="text-4xl font-bold">
            <span className="text-black">What is </span>
            <span className="text-customOrange">My Thrift?</span>
          </h2>
          <p className="md:mt-4 lg:mt-4 mt-7 p-4 text-gray-600 md:text-lg lg:text-lg md:max-w-full lg:max-w-full lg:mr-16 md:mr-16">
            My Thrift is an app for discovering and purchasing thrifted and new
            clothes from local vendors and online stores. It simplifies fashion
            shopping by offering a wide range of unique items in one convenient
            platform, allowing you to find great clothes from home. We know, its
            very demure and mindful right?
          </p>
        </div>
        <div className="md:w-10/12 lg:w-10/12 translate-y-1 md:ml-16 lg:ml-16 md:hidden lg:hidden">
          <img src={phone2} alt="Phone" />
        </div>
      </section>

      {/* Cards Section */}
      <section className="bg-[#F7F7F7] py-12">
        <h2 className="text-4xl font-bold text-center mb-7">
          <span className="text-black">What Can I do With </span>
          <span className="text-customOrange">My Thrift?</span>
        </h2>
        <div className="p-7 flex flex-col lg:flex-row justify-around items-center lg:space-y-0 lg:space-x-0">
          {/* Card 1 */}
          <div
            className="bg-white rounded-2xl shadow-lg p-8 text-center mb-8 lg:mb-0 lg:w-80"
            ref={(el) => (cardsRef.current[0] = el)}
          >
            <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
              <img src={cart} alt="Cart" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Shop Thrifted & New Clothes
            </h3>
            <p className="mt-4 text-gray-600">
              Shop a diverse selection of thrifted and new clothing from local
              markets and online vendors, all in one place.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white rounded-2xl shadow-lg p-7 text-center mb-8 lg:mb-0 lg:w-80"
            ref={(el) => (cardsRef.current[1] = el)}
          >
            <div className="bg-purple-100 rounded-full p-4 inline-block mb-4">
              <img src={shop} alt="Shop" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Showcase your Business
            </h3>
            <p className="mt-4 text-gray-600">
              Register your business with us and display your products on our
              app. Reach a wide audience and sell to people with ease.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white rounded-2xl shadow-lg p-7 text-center lg:mb-0 lg:w-80"
            ref={(el) => (cardsRef.current[2] = el)}
          >
            <div className="bg-yellow-100 rounded-full p-4 inline-block mb-4">
              <img src={icons} alt="Icons" className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Seamless Shopping
            </h3>
            <p className="mt-4 text-gray-600">
              Shop from the comfort of your home with secure payments, real-time
              order tracking, and a smooth, user-friendly experience.
            </p>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default AboutMyThrift;
