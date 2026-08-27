const apiKey = import.meta.env.VITE_NEWS_API_KEY;

export const newsApi = (location, page = 1, perPage = 12) => {
  const offset = (page - 1) * perPage;

  return fetch(
    `https://api.worldnewsapi.com/search-news?text=${encodeURIComponent(
      location
    )}&number=${perPage}&offset=${offset}`,
    {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }
  ).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return {
      totalResults: data.available || 0,
      articles: (data.news || []).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.text,
        url: item.url,
        urlToImage: item.image,
        publishedAt: item.publish_date,
        author: item.author || "Unknown",
      })),
    };
  });
};