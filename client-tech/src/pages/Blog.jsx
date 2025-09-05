// src/pages/BlogPage.jsx
import React, { useRef, useEffect, useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";

// ✅ Lazy load react-icons
const FaChevronLeft = lazy(() =>
  import("react-icons/fa").then((m) => ({ default: m.FaChevronLeft }))
);
const FaChevronRight = lazy(() =>
  import("react-icons/fa").then((m) => ({ default: m.FaChevronRight }))
);

const blogs = [
  {
    id: 1,
    title: "The Future of AI in Everyday Life",
    excerpt:
      "AI is no longer science fiction. From healthcare to smart assistants, explore how AI is shaping tomorrow’s world today.",
    date: "August 28, 2025",
    category: "Artificial Intelligence",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Top Web Development Trends in 2025",
    excerpt:
      "Discover the latest frameworks, design principles, and technologies driving modern web experiences.",
    date: "August 18, 2025",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Cloud Computing for Startups",
    excerpt:
      "Startups thrive on scalability and flexibility. Learn why the cloud is the backbone of lean innovation.",
    date: "August 10, 2025",
    category: "Cloud Computing",
    image:
      "https://images.unsplash.com/photo-1504610926078-a1611febcad3?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Cybersecurity Essentials for 2025",
    excerpt:
      "Stay ahead of evolving threats. Practical tips to protect your digital presence and business assets.",
    date: "August 5, 2025",
    category: "Cybersecurity",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
  },
];

export default function BlogPage() {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let frame;
    const scrollStep = () => {
      if (!isHovered && scrollContainer) {
        scrollContainer.scrollLeft += 1;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      frame = requestAnimationFrame(scrollStep);
    };
    frame = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(frame);
  }, [isHovered]);

  const scroll = (dir) => {
    const amt = 420;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amt : amt,
      behavior: "smooth",
    });
  };

  const duplicatedBlogs = [...blogs, ...blogs];

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 max-w-4xl mx-auto px-6"
      >
        <span className="text-sky-600 font-semibold uppercase tracking-wide">
          Tech2Gether Blog
        </span>
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
          Ideas, Insights & Innovation
        </h1>
        <p className="mt-5 text-lg text-slate-600 leading-relaxed">
          Stay ahead of technology trends with expert perspectives on AI, Cloud,
          Web Development, and Cybersecurity.
        </p>
      </motion.div>

      {/* Featured Blog */}
      <div className="relative max-w-6xl mx-auto mb-24 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-xl bg-slate-200"
        >
          <img
            src={blogs[0].image}
            alt={blogs[0].title}
            loading="lazy"
            className="w-full h-[500px] object-cover object-center"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-10 left-10 max-w-2xl text-white"
          >
            <span className="px-3 py-1 bg-sky-600 rounded-full text-xs font-medium uppercase tracking-wide">
              {blogs[0].category}
            </span>
            <h2 className="text-4xl font-bold mt-4">{blogs[0].title}</h2>
            <p className="mt-3 text-lg text-slate-200">{blogs[0].excerpt}</p>
            <button className="mt-6 px-6 py-3 bg-white/90 hover:bg-white text-slate-900 rounded-lg font-medium shadow transition">
              Read Full Article
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Blog Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-[92%] mx-auto"
      >
        {/* Left Arrow */}
        <Suspense fallback={<div />}>
          <button
            onClick={() => scroll("left")}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 shadow-md hover:bg-slate-100 text-slate-800 p-3 rounded-full transition"
          >
            <FaChevronLeft />
          </button>
        </Suspense>

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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="inline-block min-w-[340px] md:min-w-[380px] bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden cursor-pointer"
            >
              <img
                src={blog.image}
                alt={blog.title}
                loading="lazy"
                className="w-full h-52 object-cover object-center"
              />
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs font-medium text-sky-600 uppercase tracking-wide">
                  <span className="px-2 py-1 bg-sky-100 rounded-full text-sky-700">
                    {blog.category}
                  </span>
                  <span>{blog.date}</span>
                </div>
                <h3 className="text-lg font-bold mt-3 text-slate-900 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-slate-600 mt-2 line-clamp-3">
                  {blog.excerpt}
                </p>
                <span className="mt-4 inline-block text-sky-600 font-medium hover:underline">
                  Read More →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        <Suspense fallback={<div />}>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 shadow-md hover:bg-slate-100 text-slate-800 p-3 rounded-full transition"
          >
            <FaChevronRight />
          </button>
        </Suspense>
      </motion.div>
    </div>
  );
}
