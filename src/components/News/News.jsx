import { NewsList } from "../NewsList/NewsList";
import styles from "./News.module.css";

export const News = ({
  news,
  locationName,
  onLoadMoreNews,
  isNewsLoading,
  hasMoreNews,
  newsError,
}) => {
  return (
    <section className={styles.news}>
      <div className="container">
        <h2 className={styles.title}>
          The local news at your chosen location: {locationName}
        </h2>

        {newsError ? (
          <p>Something went wrong!</p>
        ) : (
          <NewsList
            news={news}
            onLoadMoreNews={onLoadMoreNews}
            isNewsLoading={isNewsLoading}
            hasMoreNews={hasMoreNews}
          />
        )}
      </div>
    </section>
  );
};