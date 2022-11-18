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
  onClick?: () => void;
  onChange?: any;
  icon?: string;
  alt?: string;
}

const Input = ({
  type,
  minlength,
  maxlength,
  required,
  placeholder,
  value,
  onClick,
  onChange,
  icon,
  alt,
}: Props) => {
  return (
    <div className={styles.__input}>
      { type !== "submit" && (
        <div className={`${styles.__icon}`}>
          <img
            src={
              icon
                ? icon
                : type === "email"
                ? envelope
                : type === "password"
                ? lock
                : ""
            }
            alt={
              alt
                ? alt
                : type === "email"
                ? "enveloppe"
                : type === "password"
                ? "cadenas"
                : ""
            }
          />{" "}
          |
        </div>
      )}
      <input
        className={type === "submit" ? styles.__submit : styles.__field}
        type={type}
        placeholder={placeholder}
        value={value}
        onClick={onClick}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
