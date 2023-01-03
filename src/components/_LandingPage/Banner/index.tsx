// Styles
import styles from "./styles.module.scss";

interface Props {
  image: string;
  alt: string;
  orientation: "left" | "right" | string;
  title: string;
  content: string;
  anchor?: string;
}

const Banner = ({ image, alt, orientation, title, content, anchor }: Props) => {
  return (
    <div
      id={anchor}
      className={`${styles.__banner} ${
        orientation === "right" ? styles.__right : ""
      }`}
    >
      <div className={styles.__content}>
        <div className={styles.__text}>
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
        <div className={styles.__box}>
          <img className={styles.__image} src={image} alt={alt} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
