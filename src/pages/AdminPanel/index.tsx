import { useState } from "react";
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

// Assets
import exit from "../../assets/images/icon/exit.svg";

const AdminPanel = () => {
  const [view, setView] = useState<any>(null);
  const navigateTo = useNavigate();
  const setToken = useSetRecoilState(tokenState);
  const userData = useRecoilValue(userDataState);
  const { role } = userData;

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

  const updateView = (section: string) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/${section}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.data.length === 0) {
          setView(<p className={styles.__message_no_data}>{data.message}</p>);
        } else {
          setView(
            <table>
              <thead>
                <tr>
                  {Object.keys(data.data[0]).map((key: any) => {
                    if (
                      key !== "profilePicture" &&
                      key !== "updatedAt" &&
                      key !== "createdAt" &&
                      key !== "employee" &&
                      key !== "document" &&
                      key !== "verified"
                    ) {
                      return (
                        <th>
                          {key === "employee_id"
                            ? "EMPLOYEE"
                            : key.toUpperCase()}
                        </th>
                      );
                    } else {
                      return null;
                    }
                  })}
                </tr>
              </thead>
              <tbody>
                {data.data.map((item: any) => {
                  return (
                    <tr>
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
                            <td>
                              {key === "employee_id"
                                ? `${item.employee.firstname} ${item.employee.lastname}`
                                : item[key]}
                            </td>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        }
      });
  };

  return (
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
          ].map((btn) => {
            return (
              <button key={uuidv4()} onClick={() => updateView(btn.value)}>
                {btn.name}
              </button>
            );
          })}
        </div>
        <div className={styles.__container}>{view}</div>
      </div>
    </div>
  );
};

export default AdminPanel;
