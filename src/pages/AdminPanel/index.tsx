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
import Input from "../../components/Input";

// Assets
import exit from "../../assets/images/icon/exit.svg";
import logo from "../../assets/images/logo/logo-full-transparent.png";
import AdminTable from "../../components/AdminTable";

const AdminPanel = () => {
  const [view, setView] = useState<any>(null);
  const navigateTo = useNavigate();
  const setToken = useSetRecoilState(tokenState);
  const userData = useRecoilValue(userDataState);
  const { role, token } = userData;
  const [refresh, setRefresh] = useState(false);
  const [section, setSection] = useState("employees");
  const [modalEdit, setModalEdit] = useState(false);
  const [id, setId] = useState(0);
  const [currentElement, setCurrentElement] = useState<any>(null);
  const [modalCreateManager, setModalCreateManager] = useState(false);
  const [newManager, setNewManager] = useState<any>({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });

  const updateView = (section: string) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/${section}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data.length === 0 || !data.success) {
          setView(<p className={styles.__message_no_data}>{data.message}</p>);
        } else {
          setView(
            <AdminTable
              setModalEdit={setModalEdit}
              setId={setId}
              setRefresh={setRefresh}
              refresh={refresh}
              section={section}
              data={data}
            />
          );
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  };

  useEffect(() => {
    if (id !== 0) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/${section}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setCurrentElement(data.data);
          } else {
            console.error(data);
            toast.error("Impossible de récupérer les éléments.");
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Une erreur est survenue. Contactez support@savime.tech");
        });
    }

    updateView(section);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, modalEdit, id, modalCreateManager]);

  if (useCheckJwt() === false) {
    return <Loading />;
  }

  if (role !== "Admin") {
    navigateTo("/tableau-de-bord");
  }

  const logout = () => {
    navigateTo("/admin");
    setToken(null);
    localStorage.removeItem("__svm_token");
    toast.success("Vous êtes déconnecté !");
  };

  const updateElement = (e: any) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/${section}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(currentElement),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setModalEdit(false);
          setRefresh(!refresh);
          toast.success("L'élément a bien été mis à jour.");
        } else {
          console.error(data);
          toast.error("Impossible de mettre à jour l'élément.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  };

  const createManager = (e: any) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/managers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstname: newManager.firstname,
        lastname: newManager.lastname,
        phone: newManager.phone,
        email: newManager.email,
        password: newManager.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setModalCreateManager(false);
          setSection("managers");
          setRefresh(!refresh);
          setNewManager({
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            password: "",
          });
          toast.success("Le manager a bien été créé.");
        } else {
          console.error(data);
          toast.error("Impossible de créer le manager.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  };

  return (
    <>
      <div className={styles.__admin_pannel}>
        <h1>
          <img src={logo} alt="logo savime" /> Panneau Administrateur
        </h1>
        <div className={styles.__logout_btn}>
          <button onClick={() => logout()}>
            Déconnexion <img src={exit} alt="logout" />
          </button>
        </div>
        <div className={styles.__pannel}>
          <div className={styles.__menu}>
            <button onClick={() => setModalCreateManager(true)}>
              Créer un compte Manager
            </button>
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
        <Modal setModalOpen={setModalEdit}>
          <div className={styles.__edit_modal}>
            <form onSubmit={(e) => updateElement(e)}>
              {Object.entries(currentElement).map(
                (element: any, index: number) => {
                  return (
                    index !== 0 &&
                    element[0] !== "profilePicture" &&
                    element[0] !== "createdAt" &&
                    element[0] !== "updatedAt" && (
                      <div key={element[0]}>
                        <label>{element[0]}</label>
                        {element[0] && element[0] !== "type" ? (
                          <Input
                            type={
                              element[0] === "content"
                                ? "textArea"
                                : element[0] === "document"
                                ? "file"
                                : "text"
                            }
                            {...(element[0] === "employee_id" && {
                              disabled: true,
                            })}
                            {...(element[0] !== "document"
                              ? { value: element[1] }
                              : { accept: "application/pdf" })}
                            onChange={(e: any) => {
                              let file: string | ArrayBuffer | null = "";
                              if (element[0] === "document") {
                                const reader = new FileReader();
                                reader.readAsDataURL(e.target.files[0]);
                                reader.onload = async function () {
                                  if (reader.onerror) {
                                    file = "";
                                    toast.error(
                                      "Une erreur est survenue lors de la lecture du fichier."
                                    );
                                  } else {
                                    file = reader.result;
                                  }
                                  setCurrentElement({
                                    ...currentElement,
                                    [element[0]]: file,
                                  });
                                };
                              } else {
                                setCurrentElement({
                                  ...currentElement,
                                  [element[0]]: e.target.value,
                                });
                              }
                            }}
                          />
                        ) : (
                          <select
                            value={element[1]}
                            onChange={(e: { target: { value: any } }) => {
                              setCurrentElement({
                                ...currentElement,
                                [element[0]]: e.target.value,
                              });
                            }}
                          >
                            <option value="attestation">Attestation</option>
                            <option value="payslip">Bulletin</option>
                            <option value="contract">Contrat</option>
                          </select>
                        )}
                      </div>
                    )
                  );
                }
              )}
              <Input type="submit" value="Sauvegarder" />
            </form>
          </div>
        </Modal>
      )}
      {modalCreateManager && (
        <Modal setModalOpen={setModalCreateManager}>
          <div className={styles.__create_manager_modal}>
            <form onSubmit={(e) => createManager(e)}>
              {Object.entries(newManager).map((element: any, index: number) => {
                return (
                  <>
                    <label>{element[0]}</label>
                    <Input
                      type={
                        element[0] === "email"
                          ? "email"
                          : element[0] === "phone"
                          ? "tel"
                          : "text"
                      }
                      value={element[1]}
                      onChange={(e: { target: { value: any } }) => {
                        setNewManager({
                          ...newManager,
                          [element[0]]: e.target.value,
                        });
                      }}
                    />
                  </>
                );
              })}
              <Input type="submit" value="Sauvegarder" />
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AdminPanel;
