import React, { useState } from "react";
import "./horizontal.css";
import AlertDialogSlide from "../modalComponent/modalComponent";
import InfiniteScroll from "react-infinite-scroll-component";

function Horizontal() {
  const [items, setItems] = useState([]);
  const today = new Date();
  const yesterday = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);
  const [endDate, setEndDate] = useState(yesterday);
  const [modalOpen, setIsModalOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState({});

  const fetchMoreData = () => {
    // Fetch data from the server
    const fourteenDaysAgoFromEnd = new Date(
      endDate.getTime() - 14 * 24 * 60 * 60 * 1000
    );
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
        setEndDate((prev) => {
          return new Date(prev.getTime() - 15 * 24 * 60 * 60 * 1000);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h1>Loading ....</h1>}
    >
      <div className="item-grid">
        {items.map((item) => (
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
              <img className="shimmer" src={item?.url} />
            )}
            {item.media_type === "video" && (
              <iframe className="shimmer" src={item?.url} />
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
    </InfiniteScroll>
  );
}

export default Horizontal;
