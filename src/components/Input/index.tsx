// Styles
import styles from "./styles.module.scss";

// Assets
import envelope from "../../assets/images/icon/envelope.svg";
import lock from "../../assets/images/icon/lock.svg";

interface Props {
  type: string;
  label?: string;
  minlength?: number;
  maxlength?: number;
  required?: boolean;
  placeholder?: string;
  value?: string;
}

const Input = ({
  type,
  minlength,
  maxlength,
  required,
  placeholder,
  value,
}: Props) => {
  return (
    <div className={styles.__input}>
      {(type !== "text" && type !== "submit") &&
        <div className={`${styles.__icon}`}><img src={type === "email" ? envelope : type === "password" ? lock : ""} alt={type === "email" ? "enveloppe" : type === "password" ? "cadenas" : ""} /> |</div>}
      <input
        className={type === "submit" ? styles.__submit : styles.__field}
        type={type}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
