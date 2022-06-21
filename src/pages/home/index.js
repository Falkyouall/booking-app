import React from "react";
import * as Service from "../../service";
import SearchForm from "../../components/SearchForm";
import HotelList from "../../components/HotelList";
import "./styles.css";

const Home = () => {
  const [skip] = React.useState(0);
  const [top] = React.useState(10);

  const [hotels, setHotels] = React.useState(null);

  const [locations, setLocations] = React.useState(null);
  React.useEffect(() => {
    Service.getLocations().then((result) => {
      if (result.status === 200) {
        setLocations(result.data);
      }
    });
  }, []);

  const onSubmit = React.useCallback(
    (formValues) => {
      const { locationId, startDate, endDate, minimalRating } = formValues;

      Service.getHotels({ skip, top, locationId, startDate, endDate, minimalRating }).then((result) => {
        setHotels(result);
      });
    },
    [skip, top]
  );

  return (
    <div className="HomePage">
      {locations && <SearchForm locations={locations} onSubmit={onSubmit} />}
      {hotels && <HotelList hotels={hotels} />}
    </div>
  );
};

export default Home;
