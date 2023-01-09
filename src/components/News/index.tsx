import { useEffect, useState } from "react";

// Styles
import styles from "./styles.module.scss";

interface NewsProps {
  editMode?: boolean;
}

const News = ({ editMode }: NewsProps) => {
  const [news, setNews] = useState<any>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/news`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setNews(data.data);
        }
      });
  }, []);

  return editMode ? (
    <>
      <h2>Actualités internes</h2>
      <p>Edit Mode</p>
      {news.map(({ new_id, title, content }: any) => (
          <li key={`new-${new_id}`}>
            <h3>{title}</h3>
            <p>{content}</p>
          </li>
        ))}
    </>
  ) : (
    <div className={styles.__news}>
      <h2>Actualités internes</h2>
      <ul>
        {news.map(({ new_id, title, content }: any) => (
          <li key={`new-${new_id}`}>
            <h3>{title}</h3>
            <p>{content}</p>
          </li>
        ))}
      </ul>
      <button className={styles.__more_articles}>Plus d'articles...</button>
    </div>
  );
};

export default News;
