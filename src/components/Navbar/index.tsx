import { NavigateFunction, useNavigate } from "react-router-dom";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
import { Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";

// Styles
import styles from "./styles.module.scss";

// Assets
import logo from "../../assets/images/logo/logo-full-transparent.png";
import exit from "../../assets/images/icon/exit.svg";

// Atoms
import { tokenState, userDataState } from "../../atoms/user";

interface Props {
  setCurrentPage: Dispatch<any>;
  links?: Array<any>;
  shortcuts?: any;
}

const Navbar = ({ setCurrentPage, links, shortcuts }: Props) => {
  const navigateTo: NavigateFunction = useNavigate();
  const setUserData: SetterOrUpdater<any> = useSetRecoilState(userDataState);
  const setToken: SetterOrUpdater<string | null> = useSetRecoilState(tokenState);
  const companyName: string | undefined = process.env.REACT_APP_COMPANY_NAME;

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
      token: null,
      phone: null,
    });
    setToken(null);
    localStorage.removeItem("__svm_token");
    toast.success("Vous êtes déconnecté !");
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
          <span>Déconnexion</span> <img src={exit} alt="logout" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
