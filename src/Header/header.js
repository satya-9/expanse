import "./header.css";

function Header() {
  const myName = "Satya";
  return (
    <>
      <p style={{ textAlign:"center", fontWeight: "bold" }}>Space Blog</p>

      <div className="Header">
        <div className="imageAndName">
          <div className="nasaImageDiv">
            <img src="/NASA.jpg" alt="NASA Image" className="nasaImage" />
            <p className="name">{myName}</p>
          </div>
        </div>
        <div className="astronomyImageDiv">
          <img
            src="/pictureOftheDay.jpg"
            alt="astronomy picture"
            className="astronomyImage"
          />
          <p style={{ marginLeft: "10%", fontWeight: "bold" }}>
            Astronomy picture of the Day
          </p>
        </div>
      </div>
    </>
  );
}

export default Header;
