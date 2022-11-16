// Styles
import styles from "./styles.module.scss";

interface Props {
    children: React.ReactNode;
    position: "left" | "center" | "right";
}

const Wrapper = ({ children, position }: Props) => {
  return <div className={`${styles.__wrapper} ${position === "left" ? styles.__left : position === "right"? styles.__right : styles.__center }`}>{children}</div>;
};

export default Wrapper;