// Styles
import styles from "./styles.module.scss";

interface Props {
  error?: string;
  type: string;
  label?: string;
  minlength?: number;
  maxlength?: number;
  placeholder?: string;
  value?: any;
  onClick?: () => void | any;
  onChange?: any;
  icon?: string;
  alt?: string;
  required?: boolean;
  pattern?: string;
}

const Input = ({
  error,
  type,
  minlength,
  maxlength,
  placeholder,
  value,
  onClick,
  onChange,
  icon,
  alt,
  required,
  pattern,
}: Props) => {
  minlength = minlength ? minlength : 0;
  maxlength = maxlength ? maxlength : 100;
  return (
    <div className={styles.__input}>
      {type !== "submit" && type !== "textArea" && icon && (
        <div className={`${styles.__icon} ${error ? styles.__red : ""}`}>
          <img src={icon} alt={alt} /> {icon && <>|</>}
        </div>
      )}
      {type === "textArea" ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          className={
            type === "submit"
              ? styles.__submit
              : icon
              ? styles.__field
              : `${styles.__field} ${styles.__no_icon}`
          }
          type={type}
          placeholder={placeholder}
          value={value}
          onClick={onClick}
          onChange={onChange}
          required={required}
          minLength={minlength}
          maxLength={maxlength}
          pattern={pattern}
        />
      )}
      {error && <div className={styles.__error}>{error}</div>}
    </div>
  );
};

export default Input;
