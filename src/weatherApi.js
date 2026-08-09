const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export const weatherApi = (location) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      location,
    )}&appid=${apiKey}&units=metric`,
  ).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  });
};