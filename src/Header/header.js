import "./header.css";

function Header() {
  const myName = "Satya";
  return (
    <div className="Header">
      <div className="imageAndName">
        <div className="nasaImageDiv">
          <img src="/NASA.jpg" alt="NASA Image" className="nasaImage" />
        </div>
        <div className="nameDiv">
          <p className="name">{myName}</p>
        </div>
      </div>
      <div className="astronomyImageDiv">
        <img
          src="/pictureOftheDay.jpg"
          alt="astronomy picture"
          className="astronomyImage"
        />
      </div>
    </div>
  );
}

export default Header;
