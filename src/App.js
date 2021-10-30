import logo from "./logo.svg";
import "./App.css";
import TextList from "./TextList";
import Error from "./Error";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import { useState } from "react";

// API KEY
const giphy = new GiphyFetch("IXXJT71j0XcGFelwdvK10d6p1XwgSJRE");

function App() {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [err, setErr] = useState(false);

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    if (text.length === 0) {
      setErr(true);
      return;
    }

    console.log(text);

    const apiCall = async () => {
      const response = await giphy.animate(text, { limit: 50 });
      console.log(response.data);
      setResults(response.data);
    };

    apiCall();
    setText("");
    setErr(false);
  };

  return (
    <div className="App">
      <h1>Animated Text Generator</h1>
      <h3>Type text into the form and hit submit</h3>
      <input className="input-field" value={text} onChange={handleInput} />
      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
      <Error isError={err} text="need length longer than 0 for input" />
      {results && <TextList gifs={results} />}
    </div>
  );
}

export default App;
