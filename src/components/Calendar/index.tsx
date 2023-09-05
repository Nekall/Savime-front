import { useState } from "react";
import { Calendar as ReactCalendar } from "react-calendar";

// Styles
import styles from "./styles.module.scss";

// Types
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <>
      <h2>Calendrier</h2>
      <ReactCalendar
        className={styles.__calendar}
        locale={"fr-FR"}
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default Calendar;
