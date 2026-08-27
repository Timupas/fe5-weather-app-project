import styles from "./NewsItem.module.css";

export const NewsItem = ({ item }) => {
  const imageUrl = item.image || item.urlToImage;

  return (
    <article className={styles.card}>
      <a
        className={styles.link}
        href={item.url}
        target="_blank"
        rel="noreferrer"
      >
        <div className={styles.imageWrapper}>
          {imageUrl ? (
            <img className={styles.image} src={imageUrl} alt={item.title} />
          ) : (
            <div className={styles.noImage}>No Image</div>
          )}
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{item.title}</h3>
          {item.description && (
            <p className={styles.description}>{item.description}</p>
          )}
        </div>
      </a>
    </article>
  );
};