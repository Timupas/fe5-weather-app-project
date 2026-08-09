const apiKey = import.meta.env.VITE_PICTURES_API_KEY;

export const picturesApi = (location, page = 1, perPage = 12) => {
  return fetch(
    `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
      location,
    )}&image_type=photo&safesearch=true&page=${page}&per_page=${perPage}`,
  ).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  });
};