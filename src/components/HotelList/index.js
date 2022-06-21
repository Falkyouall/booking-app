import "./styles.css";
import HotelCard from "../HotelCard";

const HotelList = ({ hotels }) => {
  return (
    <section className="HotelList">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </section>
  );
};

export default HotelList;
