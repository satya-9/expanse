import { useEffect, useState } from "react";
import "./spotLight.css";
import Modal from "react-modal";

function SpotLight(props) {
  const [item, setItem] = useState(props.results);
  const [modalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setItem(props.results);
  }, []);

  const spotLigtComponent = () => {
    return (
      <div className="spotLight">
        <div className="description">
          <p className="spotLightText">{item.title}</p>
          <p className="spotLightText">{item.explanation.split(".")[0]}</p>
          <p className="spotLightText">{item.copyright}</p>
        </div>
        <div
          className="imagediv"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          {item.media_type === "image" && (
            <img className="shimmer" src={item.url} />
          )}
          {item.media_type === "video" && (
            <iframe className="shimmer" src={item.url} title={item.title}/>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {spotLigtComponent()}
      <Modal
        isOpen={modalOpen}
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
          <div style={{}}>{spotLigtComponent()}</div>
        </div>
      </Modal>
    </>
  );
}

export default SpotLight;
