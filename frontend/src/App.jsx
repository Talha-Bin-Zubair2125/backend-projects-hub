import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // States
  const [URL, setURL] = useState("");
  const [Response, setResponse] = useState("");

  // Generate short URL
  const generateurl = async () => {
    if (!URL) {
      alert("Please enter a URL!");
      return;
    }
    try {
      const data_to_backend = await axios.post("http://localhost:3000/ShortURL", {
        URL_SHORTNING: URL,
      });
      setResponse(data_to_backend.data.New_URL);
    } catch (error) {
      alert("Error generating short URL. Check backend!");
    }
  };

  // Redirection function
  const redirection = () => {
    if (!Response) {
      alert("Please generate a short URL first!");
      return;
    }
    window.open(Response, "_blank");
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">🔗 URL Shortener</h1>

        <input
          type="url"
          placeholder="Enter your long URL here..."
          value={URL}
          onChange={(e) => setURL(e.target.value)}
          className="input-box"
        />

        <div className="button-group">
          <button className="btn generate" onClick={generateurl}>
            Generate
          </button>
          <button className="btn redirect" onClick={redirection}>
            Redirect
          </button>
        </div>

        {Response && (
          <div className="result">
            <p>Your Short URL:</p>
            <a href={Response} target="_blank" rel="noopener noreferrer">
              {Response}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
