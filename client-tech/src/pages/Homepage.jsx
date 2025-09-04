// src/pages/HomePage.jsx
import React from "react";
import { Helmet } from "react-helmet"; // ✅ SEO Meta Support
import { motion } from "framer-motion";
import MouseParticles from "react-mouse-particles";
import { Code, Palette, LayoutDashboard, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans text-gray-100 bg-gradient-to-b from-sky-500 via-blue-700 to-blue-900 relative overflow-hidden">
      {/* === SEO Meta Tags === */}
      <Helmet>
        <title>Tech2gether | Web Development, UI/UX & Design Services</title>
        <meta
          name="description"
          content="Tech2gether builds modern websites, creative posters, and seamless UI/UX designs. We create digital experiences that inspire and engage."
        />
        <meta
          name="keywords"
          content="Tech2gether, Web Development, UI/UX Design, Poster Design, Digital Agency, Modern Websites"
        />
        <meta name="author" content="Tech2gether Team" />
      </Helmet>

      {/* === Cursor Particles === */}
      <MouseParticles g={1} num={4} color="skyblue" cull="section, a, button" level={6} />

      {/* === Hero Section === */}
      <header
        id="home"
        className="h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
        role="banner"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/60 to-sky-900/60"></div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl bg-gradient-to-r from-white via-blue-200 to-sky-400 bg-clip-text text-transparent"
        >
          Building Digital Experiences <br /> That Truly Inspire
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative mt-6 text-lg md:text-xl max-w-2xl text-blue-100"
        >
          We transform your ideas into modern websites, striking designs, and user-first digital products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="relative mt-10 flex space-x-5"
        >
          <a
            href="#services"
            className="bg-gradient-to-r from-white to-blue-100 text-blue-700 font-semibold px-6 py-3 rounded-xl shadow-xl hover:scale-110 transition flex items-center gap-2"
          >
            Explore Services <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold px-6 py-3 rounded-xl shadow-xl hover:scale-110 transition"
          >
            Get in Touch
          </a>
        </motion.div>
      </header>

      {/* === Main Content === */}
      <main>
        {/* Services Section */}
        <section id="services" className="py-28 px-6 bg-gradient-to-b from-blue-800 to-blue-950">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-bold mb-16 text-white"
            >
              Our Core Services
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: <Code className="w-12 h-12" aria-hidden="true" />,
                  title: "Web Development",
                  desc: "Modern, responsive, and high-performance web apps.",
                },
                {
                  icon: <Palette className="w-12 h-12" aria-hidden="true" />,
                  title: "Poster Design",
                  desc: "Creative visuals that capture attention instantly.",
                },
                {
                  icon: <LayoutDashboard className="w-12 h-12" aria-hidden="true" />,
                  title: "UI/UX Design",
                  desc: "Seamless experiences built around your users.",
                },
              ].map((service, i) => (
                <motion.article
                  key={i}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-10 shadow-xl flex flex-col items-center text-center hover:shadow-2xl transition"
                >
                  <div className="mb-5 text-sky-300">{service.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3 text-white">{service.title}</h3>
                  <p className="text-blue-200 text-sm">{service.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-28 px-6 bg-gradient-to-b from-blue-950 to-black">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
            >
              From Our Blog
            </motion.h2>
            <p className="text-blue-300 mb-14 max-w-2xl mx-auto">
              Insights, trends, and updates from the world of design and development.
            </p>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "Why Good UI/UX Matters",
                  desc: "Great design builds trust and engagement.",
                  img: "https://amadine.com/assets/img/articles/ux-vs-ui/ux-vs-ui-design@2x.png",
                },
                {
                  title: "Web Dev Trends 2025",
                  desc: "Stay ahead with frameworks & best practices.",
                  img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
                },
                {
                  title: "Designing Impactful Posters",
                  desc: "Make visuals that leave a mark.",
                  img: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=800&q=80",
                },
              ].map((post, i) => (
                <motion.article
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className="relative rounded-2xl overflow-hidden shadow-lg group"
                >
                  <img
                    src={post.img}
                    alt={post.title}
                    loading="lazy" // ✅ Performance
                    className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                    <p className="text-sm text-blue-200">{post.desc}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-28 px-6 bg-gradient-to-b from-black via-blue-950 to-blue-900 relative"
          role="contentinfo"
        >
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-blue-700/30 rounded-full blur-3xl opacity-30"></div>

          <div className="max-w-3xl mx-auto text-center relative">
            <motion.h2
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-bold mb-8 text-white"
            >
              Let’s Work Together
            </motion.h2>
            <p className="text-blue-300 mb-10 max-w-xl mx-auto">
              Ready to bring your vision to life? Let’s collaborate and create something extraordinary.
            </p>
            <a
              href="#"
              className="inline-block bg-gradient-to-r from-sky-400 via-blue-500 to-blue-700 text-white font-semibold px-12 py-4 rounded-full shadow-lg hover:scale-110 transition text-lg"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
