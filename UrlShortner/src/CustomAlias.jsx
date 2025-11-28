import { useState } from "react";

function CustomAlias() {
  const [mainUrl, setMainUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [message, setMessage] = useState("");

  const baseURL = "http://localhost:8001";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${baseURL}/url/custom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: mainUrl, alias }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Custom short link created: ${baseURL}/${alias}`);
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold text-center mb-4">
          Create Custom Alias
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="url"
            placeholder="Enter long URL"
            value={mainUrl}
            onChange={(e) => setMainUrl(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Enter custom alias (e.g., zaid123)"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">
            Create Custom Link
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}

export default CustomAlias;
