// Styles
import styles from "./styles.module.scss";

interface Props {
  error?: any;
  success?: any;
  type: string;
  label?: string;
  minlength?: number;
  maxlength?: number;
  required?: boolean;
  placeholder?: string;
  value?: any;
  onClick?: () => void | any;
  onChange?: any;
  icon?: string;
  alt?: string;
}

const Input = ({
  error,
  success,
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
      {type !== "submit" && type !== "textArea" && (
        <div className={`${styles.__icon} ${error ? styles.__red : ""}`}>
          <img
            src={icon}
            alt={alt}
          />{" "}
          {icon && <>|</>}
        </div>
      )}
      {type === "textArea" ? (
        <textarea placeholder={placeholder}
        value={value}
        onChange={onChange}
        ></textarea>
      ) : (
        <input
          className={type === "submit" ? styles.__submit : styles.__field}
          type={type}
          placeholder={placeholder}
          value={value}
          onClick={onClick}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Input;
