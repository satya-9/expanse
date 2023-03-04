import "./header.css";

function Header() {
  return (
    <>
      <p style={{ textAlign: "center", fontWeight: "bold" ,color:"blueviolet"}}>Space Blog</p>
      <div className="Header">
        <img src="/NASA.jpg" alt="NASA Image" className="nasaImage" />
        <div className="astronomyImageDiv">
          <img
            src="/pictureOftheDay.jpg"
            alt="astronomy picture"
            className="astronomyImage"
          />
          <p style={{fontWeight: "bold" }}>
            Astronomy picture of the Day
          </p>
        </div>
      </div>
    </>
  );
}

export default Header;
