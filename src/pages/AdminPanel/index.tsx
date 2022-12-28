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
  const [view, setView] = useState<any>(<Loading />);
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
        console.log(data.data);
        if (data.data.length === 0) {
          setView(data.message);
        } else {
          setView(
            <>
              {data.data.map((element: any) => {
                for (const [key, value] of Object.entries(element)) {
                  console.log(`${key}: ${value}`);
                }
                return element.toString();
              })}
            </>
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
