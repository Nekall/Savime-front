import { SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

// Assets
import home from "../../assets/images/icon/home.svg";
import card from "../../assets/images/icon/card.svg";
import calendar from "../../assets/images/icon/calendar.svg";
import archive from "../../assets/images/icon/archive.svg";
import paperPlane from "../../assets/images/icon/paper-plane.svg";

// Styles
import styles from "./styles.module.scss";

interface Props {
  setCurrentPage: SetStateAction<any>;
}

const SideMenu = ({ setCurrentPage }: Props) => {
  const links = [
    { icon: home, alt: "home", target: "Voluptas", name: "Voluptas" },
    { icon: card, alt: "card", target: "Adipisicing", name: "Adipisicing" },
    { icon: paperPlane, alt: "paper plane", target: "Repudiandae", name: "Repudiandae" },
    { icon: calendar, alt: "calendar", target: "Quibusdam", name: "Quibusdam" },
    { icon: archive, alt: "archive", target: "Consectetur", name: "Consectetur" },
  ];

  return (
    <div className={styles.__slide_menu}>
      {links.map(({ icon, alt, target, name }) => (
        <button key={uuidv4()} className={styles.__buttons} onClick={()=>setCurrentPage(target)}>
          <img src={icon} alt={alt} /> {name}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
