import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
  Mousewheel,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

import styles from "./SearchPhotos.module.css";
import { ProgressBar } from "react-loader-spinner";

export const SearchPhotos = ({
  images,
  locationName,
  onLoadMoreImages,
  isImagesLoading,
  hasMoreImages,
}) => {
  if (!images.length) {
    return null;
  }

  return (
    <section className={styles.photos}>
      <div className="container">
        <h2 className={styles.title}>The beautiful nature of {locationName}</h2>

        <Swiper
          className={styles.swiper}
          modules={[Navigation, Pagination, Autoplay, Keyboard, Mousewheel]}
          slidesPerView={1}
          spaceBetween={20}
          grabCursor={true}
          navigation={true}
          keyboard={{ enabled: true }}
          mousewheel={{
            enabled: true,
            releaseOnEdges: true,
            sensitivity: 1,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 3,
          }}
          autoplay={{
            delay: 2500,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          onReachEnd={() => {
            if (hasMoreImages && !isImagesLoading) {
              onLoadMoreImages();
            }
          }}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id} className={styles.slide}>
              <a href={image.pageURL} target="_blank">
                <img
                  className={styles.image}
                  src={image.webformatURL}
                  alt={image.tags || "Beautiful location"}
                />
              </a>
            </SwiperSlide>
          ))}

          {isImagesLoading && (
            <SwiperSlide className={styles.slide}>
              <ProgressBar
                visible={isImagesLoading}
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 0,
                  margin: "auto",
                }}
                wrapperClass=""
              />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </section>
  );
};
