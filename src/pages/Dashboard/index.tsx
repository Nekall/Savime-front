import { useState } from "react";
import { useRecoilValue } from "recoil";

// Components
import MiniProfile from "../../components/MiniProfile";
import SideMenu from "../../components/SideMenu";
import Navbar from "../../components/Navbar";
import Home from "../../components/Home";
import Loading from "../../components/Loading";
import Settings from "../../components/Settings";

// Styles
import styles from "../../styles/pages/dashboard.module.scss";

// Atoms
import { userDataState } from "../../atoms/user";

// Custom Hooks
import useCheckJwt from "../../hooks/checkJwt";

// Assets
import openInNewTab from "../../assets/images/icon/open-in-new-tab.svg";
import envelopeClosed from "../../assets/images/icon/envelope-closed.svg";
import gear from "../../assets/images/icon/gear.svg";


const Dashboard = () => {
  const userData = useRecoilValue(userDataState);
  const { role, firstname, lastname, email, job, profilePicture } = userData;
  const [currentPage, setCurrentPage] = useState<any>(<Home />);
  const openContactInfos = () => {
    setCurrentPage(
      "Possibilité d'envoyer un mail à l'entreprise (Dropdown mails)"
    );
  };

  const employeeLinks = [
    { target: "#", name: "Lorem ipsum", newTab: false },
    { target: "#", name: "Dolor sit", newTab: false },
    { target: "#", name: "Sit dolores", newTab: false },
    { target: "#", name: "Adipisicing amet", newTab: false },
    {
      target: "https://www.service-public.fr/particuliers/vosdroits/F34474",
      name: (
        <>
          CSE <img src={openInNewTab} alt={"Open in new tab"} />
        </>
      ),
      newTab: true,
    },
  ];

  const employeeShortcuts = (
    <div className={styles.__shortcut}>
      <button className={styles.__envelope} onClick={() => openContactInfos()}>
        <img src={envelopeClosed} alt="envelope" />
      </button>
      <button
        className={styles.__gear}
        onClick={() => setCurrentPage(<Settings />)}
      >
        <img src={gear} alt="gear" />
      </button>
    </div>
  );

  if (useCheckJwt() === false) {
    return <Loading />;
  }

  if (role === "Manager") {
    return (
      <div className={styles.__dashboard}>
        <section className={styles.__header}>
          <Navbar setCurrentPage={setCurrentPage} />
        </section>
        <section className={styles.__side_menu}>
          <div>...</div>
        </section>
        <section className={styles.__view}>
          <div className={styles.__content}>
            <span className={styles.__rounded}></span>
            <h1>Dashboard Manager</h1>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.__dashboard}>
      <section className={styles.__header}>
        <Navbar setCurrentPage={setCurrentPage} links={employeeLinks} shortcuts={employeeShortcuts} />
      </section>
      <section className={styles.__side_menu}>
        <MiniProfile
          firstname={firstname}
          lastname={lastname}
          email={email}
          job={job}
          profilePicture={profilePicture}
        />
        <hr />
        <SideMenu setCurrentPage={setCurrentPage} />
      </section>
      <section className={styles.__view}>
        <div className={styles.__content}>
          <span className={styles.__rounded}></span>
          {currentPage}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
