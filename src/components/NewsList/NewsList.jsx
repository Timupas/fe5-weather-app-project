import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

import { NewsItem } from "../NewsItem/NewsItem";
import styles from "./NewsList.module.css";
import { Triangle } from "react-loader-spinner";

export const NewsList = ({
  news,
  onLoadMoreNews,
  isNewsLoading,
  hasMoreNews,
}) => {
  if (!news.length) {
    return null;
  }

  return (
    <Swiper
      className={styles.swiper}
      modules={[Navigation, Pagination, Keyboard, Mousewheel]}
      slidesPerView={1}
      spaceBetween={20}
      navigation={true}
      keyboard={{ enabled: true }}
      mousewheel={{
        enabled: true,
        releaseOnEdges: true,
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3,
      }}
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
      onReachEnd={() => {
        if (hasMoreNews && !isNewsLoading) {
          onLoadMoreNews();
        }
      }}
    >
      {news.map((item) => (
        <SwiperSlide key={item.url} className={styles.slide}>
          <NewsItem item={item} />
        </SwiperSlide>
      ))}

      {isNewsLoading && (
        <SwiperSlide className={styles.slide}>
            <Triangle
              visible={isNewsLoading}
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="triangle-loading"
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
  );
};
