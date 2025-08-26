"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return;
    setLoading(true);
    setImageUrl(null);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setImageUrl(data.url);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">AI Image Studio 🎨</h1>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your image..."
          className="w-full p-3 border rounded-lg mb-4"
        />
        <button
          onClick={generateImage}
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>

        {imageUrl && (
          <div className="mt-6">
            <img
              src={imageUrl}
              alt="AI Generated"
              className="rounded-lg shadow-md w-full"
            />
          </div>
        )}
      </div>
    </main>
  );
}
