import { useEffect, useState } from "react";
import "./spotLight.css";

function SpotLight(props) {
  const [item, setItem] = useState(props.results);

  useEffect(() => {
    setItem(props.results);
  },[]);
  
  return (
    <div className="spotLight">
      <div className="description">
        <p className="spotLightText">{item.title}</p>
        <p className="spotLightText">{item.explanation.split(".")[0]}</p>
        <p className="spotLightText">{item.copyright}</p>
      </div>
      <div className="imagediv">
        {item.media_type === "image" && (
          <img className="shimmer" src={item.url} />
        )}
        {item.media_type === "video" && <iframe src={item.url} />}
      </div>
    </div>
  );
}

export default SpotLight;
