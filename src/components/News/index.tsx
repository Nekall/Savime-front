import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

// Components
import Modal from "../Modal";

// Atoms
import { userDataState } from "../../atoms/user";

// Assets
import plus from "../../assets/images/icon/plus.svg";
import trash from "../../assets/images/icon/trash.svg";
import pen from "../../assets/images/icon/pen.svg";

// Styles
import styles from "./styles.module.scss";

interface NewsProps {
  editMode?: boolean;
}

const News = ({ editMode }: NewsProps) => {
  const token = useRecoilValue(userDataState).token;
  const [news, setNews] = useState<any>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [newContent, setNewContent] = useState<string>("");
  const [modalAddNews, setModalAddNews] = useState<boolean>(false);
  const [modalEditNews, setModalEditNews] = useState<boolean>(false);
  const [modalReadNews, setModalReadNews] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<any>(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/news`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setNews(data.data);
        } else {
          console.error(data);
          toast.error(
            "Une erreur est survenue lors de la récupération des actualités."
          );
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  }, [refresh, token]);

  const addNews = (e: any) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/news`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
          toast.success("L'actualité a bien été ajoutée.");
        } else {
          console.error(data);
          toast.error("L'actualité n'a pas pu être ajoutée.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  };

  const editNews = (e: any) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/news/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
          toast.success("L'actualité a bien été modifiée.");
        } else {
          console.error(data);
          toast.error("L'actualité n'a pas pu être modifiée.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  };

  const deleteNews = (id: number) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/news/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRefresh(!refresh);
          toast.success("L'actualité a bien été supprimée.");
        } else {
          console.error(data);
          toast.error("L'actualité n'a pas pu être supprimée.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
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
        <Modal setModalOpen={setModalAddNews}>
          <div className={styles.__new_actuality}>
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
              <img src={trash} alt="Supprimer" />
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
              <Modal setModalOpen={setModalEditNews}>
                <div className={styles.__new_actuality}>
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
      {modalReadNews && (
        <Modal setModalOpen={setModalReadNews}>
          <div className={styles.__read_actuality}>
            <br />
            <h3>{selectedNews.title}</h3>
            <p>
              Publié le{" "}
              {new Date(selectedNews.createdAt).toLocaleDateString("fr-FR")}
            </p>
            <div>{selectedNews.content}</div>
          </div>
        </Modal>
      )}
      <ul>
        {news
          .slice(0)
          .reverse()
          .map(({ new_id, title, content, createdAt }: any) => (
            <li key={`new-${new_id}`}>
              <button
                onClick={() => {
                  setSelectedNews(
                    news.find((newItem: any) => newItem.new_id === new_id)
                  );
                  setModalReadNews(true);
                }}
              >
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
