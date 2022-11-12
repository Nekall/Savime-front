import { v4 as uuidv4 } from "uuid";

// Assets
import home from "../../assets/images/icon/home.svg";
import card from "../../assets/images/icon/card.svg";
import calendar from "../../assets/images/icon/calendar.svg";
import archive from "../../assets/images/icon/archive.svg";
import paperPlane from "../../assets/images/icon/paper-plane.svg";

// Styles
import styles from "./styles.module.scss";

const SideMenu = () => {
  const links = [
    { icon: home, alt: "home", target: "#", name: "Voluptas" },
    { icon: card, alt: "card", target: "#", name: "Adipisicing" },
    { icon: paperPlane, alt: "paper plane", target: "#", name: "Repudiandae" },
    { icon: calendar, alt: "calendar", target: "#", name: "Quibusdam" },
    { icon: archive, alt: "archive", target: "#", name: "Consectetur" },
  ];

  return (
    <div className={styles.__slide_menu}>
      {links.map(({ icon, alt, target, name }) => (
        <a key={uuidv4()} className={styles.__link} href={target}>
          <img src={icon} alt={alt} /> {name}
        </a>
      ))}
    </div>
  );
};

export default SideMenu;
