// src/api/contactApi.js
export const sendContactForm = async (formData) => {
  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (error) {
    console.error("❌ Error sending contact form:", error);
    throw error;
  }
};
