import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
import { SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

// Components
import Settings from "../Settings";

// Styles
import styles from "./styles.module.scss";

// Assets
import envelopeClosed from "../../assets/images/icon/envelope-closed.svg";
import openInNewTab from "../../assets/images/icon/open-in-new-tab.svg";
import logo from "../../assets/images/logo/logo-full-transparent.png";
import gear from "../../assets/images/icon/gear.svg";
import exit from "../../assets/images/icon/exit.svg";
//import chat from "../../assets/images/icon/chat.svg";

// Atoms
import { tokenState, userDataState } from "../../atoms/user";

interface Props {
  setCurrentPage: SetStateAction<any>;
}

const Navbar = ({ setCurrentPage }: Props) => {
  const navigateTo = useNavigate();
  const setUserData = useSetRecoilState(userDataState);
  const setToken = useSetRecoilState(tokenState);
  const companyName = "CompanyName";

  const openContactInfos = () => {
    setCurrentPage(
      "Possibilité d'envoyer un mail à l'entreprise (Dropdown mails)"
    );
  };

  const disconnect = () => {
    navigateTo("/connexion");
    setUserData({
      id: null,
      firstname: null,
      lastname: null,
      email: null,
      job: null,
    });
    setToken(null);
    localStorage.removeItem("__svm_token");
    localStorage.removeItem("__svm_user");
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
      <img className={styles.__logo} src={logo} alt="logo " />
      {companyName && (
        <span className={styles.__company_name}>⨉ {companyName}</span>
      )}
      <div className={styles.__menu}>
        {[
          { target: "#", name: "Lorem ipsum", newTab: false },
          { target: "#", name: "Dolor sit", newTab: false },
          { target: "#", name: "Sit dolores", newTab: false },
          { target: "#", name: "Adipisicing amet", newTab: false },
          {
            target:
              "https://www.service-public.fr/particuliers/vosdroits/F34474",
            name: (
              <>
                CSE <img src={openInNewTab} alt={"Open in new tab"} />
              </>
            ),
            newTab: true,
          },
        ].map((link) => {
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
      <div className={styles.__shortcut}>
        {/*<button className={styles.__chat} onClick={() => setCurrentPage("Chat")}>
          <img src={chat} alt="chat" />
    </button>*/}
        <button
          className={styles.__envelope}
          onClick={() => openContactInfos()}
        >
          <img src={envelopeClosed} alt="envelope" />
        </button>
        <button
          className={styles.__gear}
          onClick={() => setCurrentPage(<Settings />)}
        >
          <img src={gear} alt="gear" />
        </button>
      </div>
      <div className={styles.__disconnect}>
        <button onClick={() => disconnect()}>
          Déconnexion <img src={exit} alt="logout" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
