import React, { useState, useEffect } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";
import "./horizontal.css";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "react-modal";
import SpotLight from "../SpotLight/spotLight";

function Horizontal() {
  const [items, setItems] = useState([]);
  const today = new Date();
  const [endDate, setEndDate] = useState(today);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setIsModalOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState({});

  function closeModal() {
    setIsModalOpen(false);
  }

  const customStyles = {
    content: {
      backgroundColor: "white"
    },
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  useEffect(() => {
    // Fetch more data when the page changes
    if (new Date() - endDate > 0) {
      // Check if endDate has changed
      fetchData();
    }
  }, [endDate]);

  function fetchData() {
    // Fetch data from the server
    const tenDaysAgoFromEnd = new Date(
      endDate.getTime() - 14 * 24 * 60 * 60 * 1000
    );
    setLoading(true);
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=${tenDaysAgoFromEnd
        .toISOString()
        .substring(0, 10)}&end_date=${endDate
        .toISOString()
        .substring(0, 10)}&thumbs=true`
    )
      .then((response) => response.json())
      .then((newItems) => {
        if (endDate === today) {
          setItems(newItems.reverse());
        } else {
          setItems((prevItems) => [...prevItems, ...newItems.reverse()]);
        }
        setLoading(false);
      });
  }

  function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setEndDate((prev) => {
        return new Date(prev.getTime() - 14 * 24 * 60 * 60 * 1000);
      });
    }
  }

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove scroll event listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="item-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="item"
            onClick={() => {
              setIsModalOpen(true);
              setItemDetails(item);
            }}
          >
            {item.media_type === "image" && (
              <img className="shimmer" src={item.url} />
            )}
            {item.media_type === "video" && <iframe className="shimmer" src={item.url} />}
            <p style={{marginLeft:"2%"}}>
              {item.title} - 
              <span style={{fontWeight:"bold"}}>{item.date}</span>
            </p>
          </div>
        ))}
        <Modal
          isOpen={modalOpen}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div style={{}}>
            <div style={{ position: "relative", right: "-1200px" }}>
              <img
                src="/iconButton.jpg"
                style={{
                  width: "3%",
                  height: "3%",
                  borderRadius: "30%",
                  border: "2px solid #333",
                }}
                onClick={() => {
                  setIsModalOpen(false);
                }}
              />
            </div>
            <div style={{}}>
              <SpotLight results={itemDetails} />
            </div>
          </div>
        </Modal>
        {loading ? (
          <div className="loader">
            <ClipLoader
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Horizontal;
