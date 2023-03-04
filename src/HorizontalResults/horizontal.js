import React, { useState, useEffect, useRef } from "react";
import "./horizontal.css";
import ClipLoader from "react-spinners/ClipLoader";
import AlertDialogSlide from "../modalComponent/modalComponent";

function Horizontal() {
  const [items, setItems] = useState([]);
  const today = new Date();
  const yesterday = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);
  const [endDate, setEndDate] = useState(yesterday);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setIsModalOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState({});
  const firstRender = useRef(true);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  useEffect(() => {
    // Fetch more data when the page changes
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      console.log("been")
      fetchData();
    }
  }, [endDate]);

  function fetchData() {
    // Fetch data from the server
    const fourteenDaysAgoFromEnd = new Date(
      endDate.getTime() - 14 * 24 * 60 * 60 * 1000
    );
    console.log("enddate")
    setLoading(true);
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=e1hXx9yEnK0saSB8OWYEgIlTyzxHIh4JMIsovlDW&start_date=${fourteenDaysAgoFromEnd
        .toISOString()
        .substring(0, 10)}&end_date=${endDate
        .toISOString()
        .substring(0, 10)}&thumbs=true`
    )
      .then((response) => response.json())
      .then((newItems) => {

        setItems((prevItems) => [...prevItems, ...newItems.reverse()]);
        setLoading(false);
      });
  }

  function handleScroll() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      console.log("scroll down")
      setEndDate((prev) => {
        return new Date(prev.getTime() - 15 * 24 * 60 * 60 * 1000);
      });

    }
  }


  const uniqueArray = (obj) => (obj.filter((value, index) => {
    const _value = JSON.stringify(value);
    return index === obj.findIndex(obj => {
      return JSON.stringify(obj) === _value;
    });
  }))

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove scroll event listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="item-grid">
        {uniqueArray(items).sort((a,b)=>{return new Date(a.date)-new Date(b.date)}).reverse().map((item) => (
          <div
            key={item.id}
            className="item"
            onClick={() => {
              if (item.media_type === "image") {
                setIsModalOpen(true);
                setItemDetails(item);
              }
              if (item.media_type === "video") {
                window.open(item.url, "_blank");
              }
            }}
          >
            {item.media_type === "image" && (
              <img className="shimmer" src={item.url} />
            )}
            {item.media_type === "video" && (
              <iframe className="shimmer" src={item.url} />
            )}
            <p style={{ marginLeft: "2%" }}>
              {item.title} -
              <span style={{ fontWeight: "bold" }}>{item.date}</span>
            </p>
          </div>
        ))}
      </div>
      <AlertDialogSlide
        results={itemDetails}
        open={modalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
      {loading ? (
        <div className="loader">
          <ClipLoader
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p>Loading .....</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Horizontal;
