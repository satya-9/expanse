import { useEffect, useState } from "react";
import "./spotLight.css";
import Modal from "react-modal";
import AlertDialogSlide from "../modalComponent/modalComponent";

function SpotLight(props) {
  const [item, setItem] = useState(props.results);
  const [modalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setItem(props.results);
  }, []);

  const spotLightComponent = () => {
    return (
      <div className="spotLight">
        <div className="description">
          <p className="spotLightText" style={{fontWeight:"bold"}}>{item?.title}</p>
          <p className="spotLightText" style={{marginLeft:"20px"}}>{item?.explanation.split(".")[0]+item?.explanation?.split(".")[1]}</p>
          <p className="spotLightText">{item?.copyright}</p>
        </div>
        <div
          className="imagediv"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          {item.media_type === "image" && (
            <img className="shimmerImage" src={item.url} />
          )}
          {item.media_type === "video" && (
            <iframe className="shimmerImage" src={item.url} title={item.title}/>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {spotLightComponent()}
      <AlertDialogSlide results={item} open={modalOpen} onClose={()=>{setIsModalOpen(false)}} />
    </>
  );
}

export default SpotLight;
