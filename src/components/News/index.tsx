import { useEffect, useState } from "react";

// Assets
import plus from "../../assets/images/icon/plus.svg"
import trash from "../../assets/images/icon/trash.svg"

// Styles
import styles from "./styles.module.scss";

interface NewsProps {
  editMode?: boolean;
}

const News = ({ editMode }: NewsProps) => {
  const [news, setNews] = useState<any>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/news`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setNews(data.data);
        }
      });
  }, [modal]);

  const addNews = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/news`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setModal(false);
        }
      });
  };

  return editMode ? (
    <>
      <h2>Actualités internes</h2>
      <p>Edit Mode</p>
      {modal && (
        <div className={styles.__modal}>
          <button onClick={()=>setModal(false)}>X</button>
          <h3>Ajouter une actualité</h3>
          <input
            type="text"
            placeholder="Titre"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Contenu"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <br />
          <button onClick={()=>addNews()}>Ajouter</button>
        </div>
      )}
      <button onClick={()=>setModal(!modal)}><img src={plus} alt="plus" /></button>
      {news.map(({ new_id, title, content }: any) => (
          <li key={`new-${new_id}`}>
            <h3>{title}</h3>
            <button><img src={trash} alt="poubelle" /></button>
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
