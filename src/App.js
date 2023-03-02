import react, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header/header";
import Horizontal from "./HorizontalResults/horizontal";
import SpotLight from "./SpotLight/spotLight";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const results = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=2022-10-01&end_date=2022-10-29&thumbs=true`
        );
        const resultsJson = await results.json();
        setData(resultsJson);
      } catch (error) {
        console.log(error, "1233");
      }
    }
    getData();
  }, []);

  return (
    <div className="App">
      <Header />
      {data.length > 0 && (
        <>
          <SpotLight results={data[0]} />
          <Horizontal />
        </>
      )}
    </div>
  );
}

export default App;
