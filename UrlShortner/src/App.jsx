import { useState, useRef, useCallback } from "react";

function App() {
  const [mainUrl, setMainUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const inputRef = useRef(null);

  const baseURL = "http://localhost:8001";

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!validateUrl(mainUrl)) {
      setErrorMsg("Please enter a valid URL");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(`${baseURL}/url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: mainUrl }),
      });

      const data = await res.json();

      if (res.ok) {
        setShortId(data.id);
        setOriginalUrl("");
        setAnalytics(null);
        setShowAnalytics(false);
      } else {
        setErrorMsg(data.error || "Failed to shorten URL.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong.");
    }
    setLoading(false);
  };

  const copyToClipboard = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard.writeText(`${baseURL}/${shortId}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shortId]);

  const handleRedirect = async () => {
    try {
      const res = await fetch(`${baseURL}/url/${shortId}`);
      const data = await res.json();

      if (data?.id) {
        window.open(data.id, "_blank");
      } else {
        alert("Original URL not found.");
      }
    } catch (err) {
      console.error(err);
      alert("Redirect failed.");
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`${baseURL}/url/analytics/${shortId}`);
      const data = await res.json();
      setAnalytics(data);
      setShowAnalytics(true);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch analytics.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold text-center mb-4">
          URL Shortener
        </h1>

        <form onSubmit={handleShorten} className="flex flex-col gap-2">
          <input
            type="url"
            placeholder="Enter long URL"
            value={mainUrl}
            onChange={(e) => setMainUrl(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-4 py-2"
            disabled={loading}
          />
          {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {shortId && (
          <div className="mt-6 bg-gray-50 p-4 rounded text-center">
            <p className="text-sm text-gray-700 mb-2">Your short URL:</p>

            <input
              ref={inputRef}
              type="text"
              value={`${baseURL}/${shortId}`}
              readOnly
              className="p-2 border rounded w-full text-center mb-3"
            />

            <div className="flex gap-2 justify-center mb-4">
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                {copied ? "Copied!" : "Copy"}
              </button>

              <button
                onClick={handleRedirect}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              >
                Redirect
              </button>

              <button
                onClick={fetchAnalytics}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Analytics
              </button>
            </div>

            {/* Test */}
          </div>
        )}

        {showAnalytics && analytics && (
          <div className="mt-6 bg-gray-200 p-4 rounded max-h-56 overflow-y-auto">
            <p className="font-semibold text-gray-800 mb-2">Analytics</p>
            <p>Total Clicks till now: {analytics.totalclicks}</p>
            <button
              onClick={() => setShowAnalytics(false)}
              className="mb-2 text-sm text-blue-600 underline"
            >
              Hide Analytics
            </button>
            <ul className="text-sm">
              {analytics.Analytics.map((item, index) => (
                <li key={index}>{new Date(item.timestamp).toLocaleString()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
