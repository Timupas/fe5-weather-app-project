import styles from "./NewsItem.module.css";

export const NewsItem = ({ item }) => {
  return (
    <article className={styles.item}>
      <a
        className={styles.link}
        href={item.url}
        target="_blank"
        rel="noreferrer"
      >
        <img className={styles.image} src={item.urlToImage} alt={item.title} />
        <h3 className={styles.title}>{item.title}</h3>
      </a>
    </article>
  );
};
