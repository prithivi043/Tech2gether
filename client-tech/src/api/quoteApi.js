import API_BASE_URL from "./config";

export async function sendQuoteForm(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/quotes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send quote request: ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("❌ Error sending quote request:", err);
    throw err;
  }
}
