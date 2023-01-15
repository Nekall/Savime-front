import { SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

// Styles
import styles from "./styles.module.scss";
import "react-calendar/dist/Calendar.css";

interface Props {
  btns: Array<any>;
  setCurrentPage: SetStateAction<any>;
}

const SideMenu = ({ btns, setCurrentPage }: Props) => {
  return (
    <div className={styles.__slide_menu}>
      {btns.map(({ icon, alt, target, name }) => (
        <button
          key={uuidv4()}
          className={styles.__buttons}
          onClick={() => setCurrentPage(target)}
        >
          <img src={icon} alt={alt} /> {name}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
