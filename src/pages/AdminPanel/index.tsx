import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

// Styles
import styles from "../../styles/pages/adminPanel.module.scss";

// Helpers
import useCheckJwt from "../../hooks/checkJwt";

// Atoms
import { tokenState, userDataState } from "../../atoms/user";

// Components
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";

// Assets
import exit from "../../assets/images/icon/exit.svg";
import cross from "../../assets/images/icon/cross.svg";
import trash from "../../assets/images/icon/trash.svg";
import pen from "../../assets/images/icon/pen.svg";

const AdminPanel = () => {
  const [view, setView] = useState<any>(null);
  const navigateTo = useNavigate();
  const setToken = useSetRecoilState(tokenState);
  const userData = useRecoilValue(userDataState);
  const { role } = userData;
  const [refresh, setRefresh] = useState(false);
  const [section, setSection] = useState("employees");
  const [modalEdit, setModalEdit] = useState(false);
  const [id, setId] = useState(0);
  const [currentElement, setCurrentElement] = useState<any>(null);

  const updateView = (section: string) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/${section}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data.length === 0) {
          setView(<p className={styles.__message_no_data}>{data.message}</p>);
        } else {
          setView(
            <table>
              <thead>
                <tr>
                  {Object.keys(data.data[0]).map((key: any, index: number) => {
                    if (
                      key !== "profilePicture" &&
                      key !== "updatedAt" &&
                      key !== "createdAt" &&
                      key !== "employee" &&
                      key !== "document" &&
                      key !== "verified"
                    ) {
                      return (
                        <th key={uuidv4()}>
                          {key === "employee_id" && index > 0
                            ? "EMPLOYEE"
                            : key.toUpperCase()}
                        </th>
                      );
                    } else {
                      return null;
                    }
                  })}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((item: any) => {
                  return (
                    <tr key={uuidv4()}>
                      {Object.keys(item).map((key: any) => {
                        if (
                          key !== "profilePicture" &&
                          key !== "updatedAt" &&
                          key !== "createdAt" &&
                          key !== "employee" &&
                          key !== "document" &&
                          key !== "verified"
                        ) {
                          return (
                            <td key={uuidv4()}>
                              {key === "employee_id" && item.employee
                                ? `${item.employee.firstname} ${item.employee.lastname} (id: ${item.employee.employee_id})`
                                : item[key]}
                            </td>
                          );
                        } else {
                          return null;
                        }
                      })}
                      <td className={styles.__btn_edit}>
                        <button
                          title="Double clic pour supprimer 💡"
                          className={styles.__btn}
                          onDoubleClick={() =>
                            deleteElement(item[Object.keys(item)[0]])
                          }
                        >
                          <img src={trash} alt="Supprimer" />
                        </button>
                        <button
                          onClick={() => {
                            setModalEdit(true);
                            setId(item[Object.keys(item)[0]]);
                          }}
                          className={styles.__btn}
                        >
                          <img src={pen} alt="Editer" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        }
      });
  };

  useEffect(() => {
    //get data one for current section
    if (id !== 0) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/${section}/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setCurrentElement(data.data);
          }
        });
    }

    updateView(section);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, modalEdit, id]);

  if (useCheckJwt() === false) {
    return <Loading />;
  }

  if (role !== "admin") {
    navigateTo("/tableau-de-bord");
  }

  const logout = () => {
    navigateTo("/");
    setToken(null);
    localStorage.removeItem("__svm_token");
    toast.success("Vous êtes déconnecté !", {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  const updateElement = (e: any) => {
    e.preventDefault();
  };

  const deleteElement = (id: number) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/${section}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRefresh(!refresh);
        }
      });
  };

  return (
    <>
      <div className={styles.__admin_pannel}>
        <h1>Panneau Administrateur</h1>
        <div className={styles.__logout_btn}>
          <button onClick={() => logout()}>
            Déconnexion <img src={exit} alt="logout" />
          </button>
        </div>
        <div className={styles.__pannel}>
          <div className={styles.__menu}>
            {[
              { name: "Employé·es", value: "employees" },
              { name: "Managers", value: "managers" },
              { name: "Documents", value: "documents" },
              { name: "Actualités", value: "news" },
              { name: "Infos de l'entreprise", value: "company-informations" },
            ].map((btn) => {
              return (
                <button
                  key={uuidv4()}
                  onClick={() => {
                    setId(0);
                    setSection(btn.value);
                    setRefresh(!refresh);
                  }}
                >
                  {btn.name}
                </button>
              );
            })}
          </div>
          <div className={styles.__container}>{view}</div>
        </div>
      </div>

      {modalEdit && currentElement && (
        <Modal>
          <div className={styles.__edit_modal}>
            <button
              className={styles.__close}
              onClick={() => setModalEdit(false)}
            >
              <img src={cross} alt="Close" />
            </button>
            <br />
            <form onSubmit={(e) => updateElement(e)}>
              {Object.entries(currentElement).map(
                (element: any, index: number) => {
                  return element[0] === "profilePicture" ? (
                    <>
                      <img src={element[1]} alt="Profile pic" />
                      <br />
                    </>
                  ) : (
                    index !== 0 && element[0] !== "createdAt" && element[0] !== "updatedAt" && (
                      <>
                        <label htmlFor={`${element[0]}`}>{element[0]}</label>
                        {element[0] !== "content" ? (
                          <input
                            id={element[0]}
                            type="text"
                            value={element[1]}
                          />
                        ) : (
                          <textarea id={`${element[0]}`} value={element[1]} />
                        )}
                        <br />
                      </>
                    )
                  );
                }
              )}
              <input type="submit" value="Sauvegarder" />
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AdminPanel;
