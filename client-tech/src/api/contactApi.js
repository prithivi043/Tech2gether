const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendContactForm = async (formData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
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
