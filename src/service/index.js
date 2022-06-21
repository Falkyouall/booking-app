import axios from "axios";

const baseUrl = "https://afrecruitingfront-webapi-prod.azurewebsites.net/api";
const headers = { "X-DevTours-Developer": process.env.REACT_APP_DEVELOPER };

export const getLocations = () => axios.get(`${baseUrl}/location`, { headers });

export const getHotelById = (id) => axios.get(`${baseUrl}/hotel/${id}`, { headers });

export const getHotels = async (options) => {
  const { skip, top, locationId } = options;
  const startDate = new Date(options.startDate).toISOString();
  const endDate = new Date(options.endDate).toISOString();

  const availabilitiesOptions = {};
  if (options.minimalRating > 0) {
    availabilitiesOptions.rating = options.minimalRating;
  }
  const result = await axios.get(`${baseUrl}/availabilities`, {
    params: {
      startDate,
      endDate,
      skip,
      top,
      location: locationId,
    },
    headers,
  });

  if (result.status !== 200) {
    throw new Error("Error getting availabilities");
  }

  const availabilities = result.data?.items;
  const hotelIds = Array.from(new Set(availabilities.map(({ hotelId }) => hotelId)));
  const hotels = await Promise.all(
    hotelIds.map(async (hotelId) => ({
      ...(await getHotelById(hotelId))?.data,
      availabilities: availabilities.filter((availability) => availability.hotelId === hotelId),
    }))
  );

  return hotels;
};
