const apiKey = import.meta.env.VITE_NEWS_API_KEY;

export const newsApi = (location, page = 1, perPage = 12) => {
  return fetch(
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      location,
    )}&apiKey=${apiKey}&page=${page}&pageSize=${perPage}`,
  ).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  });
};