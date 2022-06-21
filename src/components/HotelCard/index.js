import "./styles.css";

const HotelCard = ({ hotel }) => {
  return (
    <div className="HotelCard">
      <img className="HotelCard-image" src={hotel.images?.[0]?.lowres} alt={hotel.name} />
      <div className="HotelCard-content">
        <h2 className="HotelCard-content-header">{hotel.name}</h2>
        <span className="HotelCard-content-address">{hotel.address}</span>
        <p className="HotelCard-content-description">{hotel.description}</p>

        <div className="HotelCard-content-button-background" />
        <button className="HotelCard-content-button">
          Book <span className="HotelCard-content-button-raquo">&raquo;</span>
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
