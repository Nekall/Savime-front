import { useState } from "react";
import { useRecoilValue } from "recoil";

// Components
import CompanyInfo from '../../components/CompanyInfo';
import Home from '../../components/Home';
import Documents from '../../components/Documents';
import Calendar from '../../components/Calendar';
import MiniProfile from "../../components/MiniProfile";
import SideMenu from "../../components/SideMenu";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import Settings from "../../components/Settings";
import News from "../../components/News";
import Employees from "../../components/Employees";

// Pages
import Error from "../Error"

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
import home from "../../assets/images/icon/home.svg";
import card from "../../assets/images/icon/card.svg";
import calendar from "../../assets/images/icon/calendar.svg";
import archive from "../../assets/images/icon/archive.svg";
import paperPlane from "../../assets/images/icon/paper-plane.svg";

const Dashboard = () => {
  const userData = useRecoilValue(userDataState);
  const { role, firstname, lastname, email, job, profilePicture } = userData;
  const [currentPage, setCurrentPage] = useState<any>(role === "Employee" ? <Home /> : <>Home Manager</>);
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

  const employeesBtns = [
    { icon: home, alt: "home", target: <Home /> , name: "Accueil" },
    { icon: card, alt: "card", target: <CompanyInfo />, name: "Informations" },
    { icon: calendar, alt: "calendar", target: <Calendar />, name: "Calendrier" },
    { icon: archive, alt: "archive", target: <Documents />, name: "Documents" },
  ];

  const managersBtns = [
    { icon: home, alt: "home", target: <>Home Manager</> , name: "Accueil" },
    { icon: card, alt: "person", target: <Employees />, name: "Employé-es" },
    { icon: paperPlane, alt: "paper plane", target: <News editMode />, name: "Actualités" },
    { icon: card, alt: "card", target: <CompanyInfo editMode />, name: "Informations" },
    { icon: calendar, alt: "calendar", target: <Calendar />, name: "Calendrier" },
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
          <SideMenu btns={managersBtns} setCurrentPage={setCurrentPage} />
        </section>
        <section className={styles.__view}>
          <div className={styles.__content}>
            <span className={styles.__rounded}></span>
            {currentPage}
          </div>
        </section>
      </div>
    );
  }else if(role === "Employee"){
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
          <SideMenu btns={employeesBtns} setCurrentPage={setCurrentPage} />
        </section>
        <section className={styles.__view}>
          <div className={styles.__content}>
            <span className={styles.__rounded}></span>
            {currentPage}
          </div>
        </section>
      </div>
    );
  }

  return (<Error />)
};

export default Dashboard;
