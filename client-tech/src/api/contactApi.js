// src/api/contactApi.js
import API_BASE_URL from "./config";

export async function sendContactForm(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    return await response.json();
  } catch (err) {
    console.error("❌ Error sending contact form:", err);
    throw err;
  }
}
