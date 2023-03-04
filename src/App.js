import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header/header";
import Horizontal from "./HorizontalResults/horizontal";
import SpotLight from "./SpotLight/spotLight";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const spotLightDay = new Date().toISOString().substring(0, 10);
        const results = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=${spotLightDay}&end_date=${spotLightDay}&thumbs=true`
        );
        const resultsJson = await results.json();

        setData(resultsJson);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  if (loading) {
    return (
      <div className="appLoader">
        <ClipLoader
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      {data.length > 0 && (
        <>
          <SpotLight results={data[0]} />
        </>
      )}
      <Horizontal />
    </div>
  );
}

export default App;
