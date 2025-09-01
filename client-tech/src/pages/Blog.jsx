import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const blogs = [
  {
    id: 1,
    title: "The Future of AI in Everyday Life",
    excerpt:
      "AI is transforming the way we live, work, and connect. Smart assistants, automation, and AI-driven apps are everywhere.",
    date: "August 28, 2025",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxqDtirq3lDSbt6wsrelu4vRjZBEHgICDf2A&s",
  },
  {
    id: 2,
    title: "Top Web Development Trends in 2025",
    excerpt:
      "From Web3 to AI-driven design, explore key technologies shaping modern web development.",
    date: "August 18, 2025",
    image:
      "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Cloud Computing for Startups",
    excerpt:
      "Why cloud solutions are essential for startups: scalability, cost efficiency, and flexibility explained.",
    date: "August 10, 2025",
    image:
      "https://images.unsplash.com/photo-1504610926078-a1611febcad3?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Cybersecurity Essentials for 2025",
    excerpt:
      "Protect your digital assets and personal information in an increasingly connected world.",
    date: "August 5, 2025",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
  },
];

export default function AdvancedBlogCarousel() {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll with infinite loop
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let frame;

    const scrollStep = () => {
      if (!isHovered && scrollContainer) {
        scrollContainer.scrollLeft += 1; // speed
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0; // seamless loop
        }
      }
      frame = requestAnimationFrame(scrollStep);
    };

    frame = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(frame);
  }, [isHovered]);

  const scroll = (direction) => {
    const amount = 300;
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -amount, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  // Duplicate blogs for seamless loop
  const duplicatedBlogs = [...blogs, ...blogs];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-b from-sky-200 via-sky-300 to-blue-900">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-extrabold text-blue-900 drop-shadow-lg">
          Our Blog
        </h1>
        <p className="mt-4 text-lg text-blue-100">
          Insights, updates, and latest trends in technology.
        </p>
      </motion.div>

      {/* Carousel */}
      <div className="relative max-w-[85%] mx-auto">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/70 hover:bg-white text-blue-900 p-3 rounded-full shadow hover:scale-110 transition"
        >
          <FaChevronLeft />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-hidden whitespace-nowrap py-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {duplicatedBlogs.map((blog, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.08, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative inline-block min-w-[300px] md:min-w-[350px] bg-white shadow-2xl rounded-3xl overflow-hidden cursor-pointer"
            >
              <motion.img
                src={blog.image}
                alt={blog.title}
                className="w-full h-56 object-cover"
                whileHover={{ scale: 1.05 }}
              />
              <div className="p-5">
                <p className="text-sm text-blue-600 font-semibold">{blog.date}</p>
                <h2 className="text-xl font-bold mt-2 text-blue-900">{blog.title}</h2>
                <p className="text-gray-600 mt-2">{blog.excerpt}</p>
                <button className="mt-4 px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold rounded-xl shadow hover:scale-105 transition">
                  Read More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/70 hover:bg-white text-blue-900 p-3 rounded-full shadow hover:scale-110 transition"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
