import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

// Components
import CompanyInfo from '../CompanyInfo';
import Home from '../Home';

// Assets
import home from "../../assets/images/icon/home.svg";
import card from "../../assets/images/icon/card.svg";
import calendar from "../../assets/images/icon/calendar.svg";
import archive from "../../assets/images/icon/archive.svg";

// Styles
import styles from "./styles.module.scss";
import 'react-calendar/dist/Calendar.css';

interface Props {
  setCurrentPage: SetStateAction<any>;
}

const SideMenu = ({ setCurrentPage }: Props) => {
  const [value, onChange] = useState(new Date());

  const renderCalendar = () => <Calendar onChange={onChange} value={value} />
;

  const btns = [
    { icon: home, alt: "home", target: <Home /> , name: "Accueil" },
    { icon: card, alt: "card", target: <CompanyInfo />, name: "Informations" },
    //{ icon: paperPlane, alt: "paper plane", target: "Repudiandae", name: "Repudiandae" },
    { icon: calendar, alt: "calendar", target: renderCalendar, name: "Calendrier" },
    { icon: archive, alt: "archive", target: "Documents (Génération | Téléchargements)", name: "Documents" },
  ];

  return (
    <div className={styles.__slide_menu}>
      {btns.map(({ icon, alt, target, name }) => (
        <button key={uuidv4()} className={styles.__buttons} onClick={()=>setCurrentPage(target)}>
          <img src={icon} alt={alt} /> {name}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
