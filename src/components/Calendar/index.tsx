import { useState } from "react";
import {Calendar as ReactCalendar} from "react-calendar";

// Styles
import styles from "./styles.module.scss";

const Calendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className={styles.__calendar}>
      <ReactCalendar locale={"fr-FR"} onChange={onChange} value={value} />
    </div>
  );
};

export default Calendar;
