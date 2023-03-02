import './header.css';

function Header() {
    const myName="Satya"
  return (
    <div className="Header">
        <div className="imageName">
            <div>
                <img src="/NASA.jpg" alt="NASA Image" className="nasaImage" />
            </div>
            <p className="name">{myName}</p>
        </div>
        <div className="imageName">
            <img src="/pictureOftheDay.jpg" alt="astronomy picture" className="astronomyImage" />
        </div>
    </div>
  );
}

export default Header;