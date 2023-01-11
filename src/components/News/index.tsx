import { useEffect, useState } from "react";

// Components
import Modal from "../Modal";

// Assets
import plus from "../../assets/images/icon/plus.svg";
import trash from "../../assets/images/icon/trash.svg";
import cross from "../../assets/images/icon/cross.svg";
import pen from "../../assets/images/icon/pen.svg";

// Styles
import styles from "./styles.module.scss";

interface NewsProps {
  editMode?: boolean;
}

const News = ({ editMode }: NewsProps) => {
  const [news, setNews] = useState<any>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [newContent, setNewContent] = useState<string>("");
  const [modalAddNews, setModalAddNews] = useState<boolean>(false);
  const [modalEditNews, setModalEditNews] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/news`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setNews(data.data);
        }
      });
  }, [refresh]);

  const addNews = (e: any) => {
    e.preventDefault();
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
          setModalAddNews(false);
          setRefresh(!refresh);
        }
      });
  };

  const editNews = (e: any) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/news/${id}`, {
      method: "PUT",
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
          setModalEditNews(false);
          setRefresh(!refresh);
        }
      });
  };

  const deleteNews = (id: number) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/news/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRefresh(!refresh);
        }
      });
  };

  return editMode ? (
    <div className={styles.__news_edit_mode}>
      <button
        className={styles.__btn_add_news}
        onClick={() => {
          setNewTitle("");
          setNewContent("");
          setModalAddNews(!modalAddNews);
        }}
      >
        <img src={plus} alt="plus" />
      </button>
      <h2>Actualités internes</h2>
      {modalAddNews && (
        <Modal>
          <div className={styles.__new_actuality}>
            <button
              className={styles.__close}
              onClick={() => setModalAddNews(false)}
            >
              <img src={cross} alt="Close" />
            </button>
            <br />
            <h3>Ajouter une actualité</h3>
            <form onSubmit={(e) => addNews(e)}>
              <input
                type="text"
                placeholder="Titre"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
              <br />
              <textarea
                placeholder="Contenu"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                required
              />
              <br />
              <input type="submit" value="Ajouter" />
            </form>
          </div>
        </Modal>
      )}
      {news.map(({ new_id, title, content, createdAt }: any) => (
        <li key={`new-${new_id}`}>
          <div className={styles.__btn_manage}>
            <button
              title="Double clic pour supprimer 💡"
              className={styles.__btn}
              onDoubleClick={() => deleteNews(new_id)}
            >
              <img src={trash} alt="poubelle" />
            </button>
            <button
              className={styles.__btn}
              onClick={() => {
                setNewTitle(title);
                setNewContent(content);
                setId(new_id);
                setModalEditNews(true);
              }}
            >
              <img src={pen} alt="crayon" />
            </button>
            {modalEditNews && (
              <Modal>
                <div className={styles.__new_actuality}>
                  <button
                    className={styles.__close}
                    onClick={() => setModalEditNews(false)}
                  >
                    <img src={cross} alt="Close" />
                  </button>
                  <br />
                  <h3>Editer une actualité</h3>
                  <form onSubmit={(e) => editNews(e)}>
                    <input
                      type="text"
                      placeholder="Titre"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                    />
                    <br />
                    <textarea
                      placeholder="Contenu"
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      required
                    />
                    <br />
                    <input type="submit" value="Ajouter" />
                  </form>
                </div>
              </Modal>
            )}
          </div>
          <h3>{title}</h3>
          <p className={styles.__date}>
            Publié le {new Date(createdAt).toLocaleDateString("fr-FR")}
          </p>
          <p>{content}</p>
        </li>
      ))}
    </div>
  ) : (
    <div className={styles.__news}>
      <h2>Actualités internes</h2>
      <ul>
        {news
          .slice(0)
          .reverse()
          .map(({ new_id, title, content, createdAt }: any) => (
            <li key={`new-${new_id}`}>
              <button>
                <h3>{title}</h3>
                <p className={styles.__date}>
                  Publié le {new Date(createdAt).toLocaleDateString("fr-FR")}
                </p>
                <p>{content}</p>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default News;
