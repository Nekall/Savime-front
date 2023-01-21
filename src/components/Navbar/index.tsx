import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
import { SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

// Styles
import styles from "./styles.module.scss";

// Assets
import logo from "../../assets/images/logo/logo-full-transparent.png";
import exit from "../../assets/images/icon/exit.svg";

// Atoms
import { tokenState, userDataState } from "../../atoms/user";

interface Props {
  setCurrentPage: SetStateAction<any>;
  links?: Array<any>;
  shortcuts?: any;
}

const Navbar = ({ setCurrentPage, links, shortcuts }: Props) => {
  const navigateTo = useNavigate();
  const setUserData = useSetRecoilState(userDataState);
  const setToken = useSetRecoilState(tokenState);
  const companyName = process.env.REACT_APP_COMPANY_NAME;

  const disconnect = () => {
    navigateTo("/connexion");
    setUserData({
      id: null,
      role: null,
      firstname: null,
      lastname: null,
      email: null,
      job: null,
      profilePicture: null,
    });
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

  return (
    <div className={styles.__navbar}>
      <img className={styles.__logo} src={logo} alt="logo" />
      {companyName && (
        <span className={styles.__company_name}>⨉ {companyName}</span>
      )}
      <div className={styles.__menu}>
        {links &&
          links.map((link: any) => {
            return (
              <a
                key={uuidv4()}
                href={link.target}
                target={link.newTab ? "_blank" : "_self"}
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            );
          })}
      </div>
      {shortcuts && shortcuts}
      <div className={styles.__disconnect}>
        <button onClick={() => disconnect()}>
          Déconnexion <img src={exit} alt="logout" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
