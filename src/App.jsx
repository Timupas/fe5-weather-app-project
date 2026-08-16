import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { WeatherList } from "./components/WeatherList/WeatherList";
import { WeatherMoreSection } from "./components/WeatherMoreSection/WeatherMoreSection";
import { News } from "./components/News/News";
import { SearchPhotos } from "./components/SearchPhotos/SearchPhotos";
import { Footer } from "./components/Footer/Footer";
import { Modal } from "./components/Modal/Modal";
import { weatherApi } from "./weatherApi";
import { forecastApi } from "./forecastApi";
import { picturesApi } from "./picturesApi";
import { newsApi } from "./newsApi";
import { useEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [locationsList, setLocationsList] = useState(
    JSON.parse(localStorage.getItem("locationsList")) || []
  );
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [selectedForecast, setSelectedForecast] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);
  const [imageQuery, setImageQuery] = useState("");
  const [imagePage, setImagePage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [isImagesLoading, setIsImagesLoading] = useState(false);

  const [newsQuery, setNewsQuery] = useState("");
  const [selectedNews, setSelectedNews] = useState([]);
  const [newsPage, setNewsPage] = useState(1);
  const [totalNews, setTotalNews] = useState(0);
  const [isNewsLoading, setIsNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState("");

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const createName = (name) => {
    setName(name);
  };

  const createLocation = (locate) => {
    setLocation(locate);
  };

  const handleDeleteLocation = (id) => {
    setLocationsList((prevLocations) =>
      prevLocations.filter((location) => location.id !== id)
    );

    if (selectedWeather?.id === id) {
      setSelectedWeather(null);
      setSelectedForecast(null);

      setImageQuery("");
      setSelectedImages([]);
      setImagePage(1);
      setTotalImages(0);

      setNewsQuery("");
      setSelectedNews([]);
      setNewsPage(1);
      setTotalNews(0);
      setNewsError("");
    }
  };

  const handleRefreshLocation = (weather) => {
    weatherApi(weather.name)
      .then((updatedWeather) => {
        setLocationsList((prevLocations) =>
          prevLocations.map((location) =>
            location.id === weather.id ? updatedWeather : location
          )
        );

        if (selectedWeather?.id === weather.id) {
          setSelectedWeather(updatedWeather);
          forecastApi(updatedWeather.name).then((res) => {
            setSelectedForecast(res);
          });
          toast.success(`${updatedWeather.name} refreshed successfully!`);
        } else {
          toast.info(`${updatedWeather.name} was already refreshed!`);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log("Weather refresh error:", error);
      });
  };

  const handleShowMore = (weather) => {
    setSelectedWeather(weather);

    setIsWeatherLoading(true);

    forecastApi(weather.name)
      .then((res) => {
        setSelectedForecast(res);
      })
      .finally(() => setIsWeatherLoading(false));

    setImageQuery(weather.name);
    setSelectedImages([]);
    setImagePage(1);
    setTotalImages(0);

    setNewsQuery(weather.name);
    setSelectedNews([]);
    setNewsPage(1);
    setTotalNews(0);
    setNewsError("");

    loadImages(weather.name, 1);
    loadNews(weather.name, 1);
  };

  const handleLoadMoreImages = () => {
    if (isImagesLoading || selectedImages.length >= totalImages) {
      return;
    }
    const nextPage = imagePage + 1;
    loadImages(imageQuery, nextPage);
  };

  const loadImages = (query, page = 1) => {
    if (isImagesLoading) {
      return;
    }

    setIsImagesLoading(true);

    picturesApi(query, page)
      .then((res) => {
        setSelectedImages((prevImages) => [...prevImages, ...res.hits]);
        setTotalImages(res.totalHits);
        setImagePage(page);
      })
      .catch((error) => {
        console.log("Images loading error:", error);
      })
      .finally(() => {
        setIsImagesLoading(false);
      });
  };

  const handleLoadMoreNews = () => {
    if (isNewsLoading || selectedNews.length >= totalNews) {
      return;
    }

    const nextPage = newsPage + 1;
    loadNews(newsQuery, nextPage);
  };

  const loadNews = (query, page = 1) => {
    if (isNewsLoading) {
      return;
    }

    setIsNewsLoading(true);
    setNewsError("");

    newsApi(query, page)
      .then((res) => {
        setSelectedNews((prevNews) => [...prevNews, ...res.articles]);
        setTotalNews(res.totalResults);
        setNewsPage(page);
      })
      .catch((error) => {
        setSelectedNews([]);
        setTotalNews(0);
        setNewsError("Something went wrong!");
        console.log("News loading error:", error);
      })
      .finally(() => {
        setIsNewsLoading(false);
      });
  };

  useEffect(() => {
    if (location.trim() === "") {
      return;
    }

    weatherApi(location)
      .then((res) => {
        setLocationsList((prevLocations) => {
          const isAlreadyAdded = prevLocations.some(
            (item) => item.id === res.id
          );

          if (isAlreadyAdded) {
            toast.info(`${res.name} is already added`);
            return prevLocations;
          }

          toast.success(`${res.name} added successfully`);
          return [...prevLocations, res];
        });
      })
      .catch((error) => {
        if (error.message === "city not found") {
          toast.error("Location not found. Please check the city name.");
          return;
        }

        toast.error("Something went wrong. Please try again.");
        console.log("Weather loading error:", error);
      });
  }, [location]);

  useEffect(() => {
    localStorage.setItem("locationsList", JSON.stringify(locationsList));
  }, [locationsList]);

  return (
    <>
      <Header
        handleModalToggle={handleModalToggle}
        name={name}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main>
        <Hero createLocation={createLocation} />

        <WeatherList
          locationsList={locationsList}
          name={name}
          handleDeleteLocation={handleDeleteLocation}
          handleShowMore={handleShowMore}
          handleRefreshLocation={handleRefreshLocation}
        />
        <MagnifyingGlass
          visible={isWeatherLoading}
          height="100"
          width="100"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            marginBottom: "50px",
          }}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />

        <WeatherMoreSection
          weather={selectedWeather}
          forecast={selectedForecast}
        />

        {newsQuery && (
          <News
            news={selectedNews}
            locationName={newsQuery}
            onLoadMoreNews={handleLoadMoreNews}
            isNewsLoading={isNewsLoading}
            hasMoreNews={selectedNews.length < totalNews}
            newsError={newsError}
          />
        )}

        {imageQuery && (
          <SearchPhotos
            images={selectedImages}
            locationName={imageQuery}
            onLoadMoreImages={handleLoadMoreImages}
            isImagesLoading={isImagesLoading}
            hasMoreImages={selectedImages.length < totalImages}
          />
        )}
      </main>

      <Footer />

      {isModalOpen && (
        <Modal handleModalToggle={handleModalToggle} createName={createName} />
      )}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme={theme === "dark" ? "dark" : "colored"}
      />
    </>
  );
}

export default App;