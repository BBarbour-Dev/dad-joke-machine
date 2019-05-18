import React, { useState, useEffect, useCallback } from "react";
import ReactFCCTest from "react-fcctest";
import { FaTwitter } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";

const App = () => {
  const [joke, setJoke] = useState("");
  const fetchJoke = async () => {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" }
    });
    if (!res.ok) {
      throw new Error(res.status);
    }
    const data = await res.json();
    return data;
  };
  const handleQuote = useCallback(() => {
    fetchJoke().then(data => setJoke(data));
  }, []);
  useEffect(() => {
    handleQuote();
  }, [handleQuote]);
  return (
    <div className="container">
      <ReactFCCTest />
      <main>
        <div className="quote-box" id="quote-box">
          <h1 id="text">
            <span className="big-quote">&ldquo;</span>
            {joke.joke}
            <span className="big-quote">&rdquo;</span>
          </h1>
          <div className="button-row">
            <button
              className="button"
              id="new-quote"
              onClick={() => handleQuote()}
            >
              <FaQuestion style={{ marginRight: "3px" }} />
              Ask Dad
            </button>
            <a
              className="button"
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?hashtags=dadjokes&related=freecodecamp&text=${
                joke.joke
              }`}
            >
              <FaTwitter style={{ marginRight: "3px" }} />
              Tweet
            </a>
          </div>
          <div className="hidey" id="author">
            {joke.id}
          </div>
        </div>
      </main>
      <footer>
        <h1>dadJokes</h1>
      </footer>
    </div>
  );
};

export default App;
