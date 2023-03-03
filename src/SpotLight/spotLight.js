import "./spotLight.css";

function SpotLight(props) {
  const { results } = props;
  return (
    <div className="spotLight">
      <div className="description">
        <p className="spotLightText">{results.title}</p>
        <p className="spotLightText">{results.explanation.split(".")[0]}</p>
        <p className="spotLightText">{results.copyright}</p>
      </div>
      <div className="imagediv">
        <img className="imagespotLight" src={results.url} alt="lop" />
      </div>
    </div>
  );
}

export default SpotLight;
