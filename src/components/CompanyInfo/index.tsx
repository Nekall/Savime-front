import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

// Assets
import plus from "../../assets/images/icon/plus.svg";
import trash from "../../assets/images/icon/trash.svg";

// Components
import Input from "../../components/Input";

// Atoms
import { userDataState } from "../../atoms/user";

// Styles
import styles from "./styles.module.scss";
import Modal from "../Modal";

interface CompanyInfoProps {
  editMode?: boolean;
}

const CompanyInfo = ({ editMode }: CompanyInfoProps) => {
  const [teamInfo, setTeamInfo] = useState<Array<any>>([]);
  const [compagnyInfo, setCompagnyInfo] = useState<any>([]);
  const [modalAddInfo, setModalAddInfo] = useState<boolean>(false);
  const [newNameInfo, setNewNameInfo] = useState<string>("");
  const [newValueInfo, setNewValueInfo] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const token = useRecoilValue(userDataState).token;

  useEffect(() => {
    if (!modalAddInfo) {
      setNewNameInfo("");
      setNewValueInfo("");
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/managers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTeamInfo(data.data);
        } else {
          console.error(data);
          toast.error("Impossible de récupérer la liste des membres RH.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });

    fetch(`${process.env.REACT_APP_BACKEND_URL}/company-informations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCompagnyInfo(data.data);
        } else {
          console.error(data);
          toast.error(
            "Impossible de récupérer les informations de l'entreprise."
          );
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  }, [token, modalAddInfo, refresh]);

  const updateCompanyInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/company-informations`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(compagnyInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success(
            "Les informations de l'entreprise ont bien été modifiées."
          );
        } else {
          console.error(data);
          toast.error(
            "Impossible de modifier les informations de l'entreprise."
          );
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  };

  const addCompanyInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/company-informations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: newNameInfo,
        value: newValueInfo,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setModalAddInfo(false);
          setCompagnyInfo([...compagnyInfo, data.data]);
          toast.success("L'information a bien été ajoutée.");
        } else {
          console.error(data);
          toast.error("Impossible d'ajouter l'information.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  };

  const deleteCompanyInfo = (id: string) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/company-informations/${id}`, {
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
          toast.success("L'information a bien été supprimée.");
        } else {
          console.error(data);
          toast.error("Impossible de supprimer l'information.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez nous.");
      });
  };

  return editMode ? (
    <>
      <div className={styles.__company_info}>
        <button
          className={styles.__btn_add_info}
          onClick={() => {
            setModalAddInfo(!modalAddInfo);
          }}
        >
          <img src={plus} alt="plus" />
        </button>
        <h2>Informations générales de l'entreprise</h2>
        {modalAddInfo && (
          <Modal setModalOpen={setModalAddInfo}>
            <div className={styles.__new_actuality}>
              <br />
              <h3>Ajouter une information</h3>
              <form onSubmit={(e) => addCompanyInfo(e)}>
                <label>Nom</label>
                <Input
                  required
                  type={"text"}
                  value={newNameInfo}
                  onChange={(e: any) => setNewNameInfo(e.target.value)}
                />
                <label>Valeur</label>
                <Input
                  required
                  type={"text"}
                  value={newValueInfo}
                  onChange={(e: any) => setNewValueInfo(e.target.value)}
                />
                <Input type="submit" value="Ajouter" />
              </form>
            </div>
          </Modal>
        )}
        <form onSubmit={(e) => updateCompanyInfo(e)}>
          {compagnyInfo.map(({ company_information_id, name, value }: any) => {
            return (
              <div className={styles.__inputs} key={name}>
                <Input
                  required
                  type="text"
                  value={name}
                  onChange={(e: { target: { value: any } }) => {
                    setCompagnyInfo(
                      compagnyInfo.map((item: { name: any; value: any }) => {
                        if (item.name === name) {
                          item.name = e.target.value;
                        }
                        return item;
                      })
                    );
                  }}
                />
                <Input
                  required
                  type="text"
                  value={value}
                  onChange={(e: { target: { value: any } }) => {
                    setCompagnyInfo(
                      compagnyInfo.map((item: { name: any; value: any }) => {
                        if (item.name === name) {
                          item.value = e.target.value;
                        }
                        return item;
                      })
                    );
                  }}
                />
                <button
                  title="Double clic pour supprimer 💡"
                  className={styles.__delete_btn}
                  type="button"
                  onDoubleClick={() =>
                    deleteCompanyInfo(company_information_id)
                  }
                >
                  <img src={trash} alt="Supprimer" />
                </button>
              </div>
            );
          })}
          {compagnyInfo.length > 0 && <Input type="submit" value="Sauvegarder" />}
        </form>
      </div>
    </>
  ) : (
    <div className={styles.__company_info}>
      <h2>Informations générales de l'entreprise</h2>
      <table>
        <tbody>
          {compagnyInfo.map(({ name, value }: any) => {
            return (
              <tr key={uuidv4()}>
                <td>{name}</td>
                <td>{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <h3>Equipe RH</h3>
      <div className={styles.__managers}>
        {teamInfo.map(({ firstname, lastname, email, phone, service }: any) => {
          return (
            <div className={styles.__card} key={uuidv4()}>
              <p>{firstname}</p>
              <p>{lastname}</p>
              <p>{email}</p>
              <p>{phone}</p>
              <p>{service}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyInfo;
