// Styles
import styles from "./styles.module.scss";

interface Props {
  image: string;
  alt: string;
  button: string;
  title: Array<string>;
}

const Hero = ({ image, alt, button, title }: Props) => {
  return (
    <div className={styles.__hero}>
      <div className={styles.__image}>
        <img src={image} alt={alt} />
        <h1>{title[0]}<span>{title[1]}</span></h1>
      </div>
      <div className={styles.__button}>
          <div><button>{button}</button></div>
        </div>
    </div>
  );
};

export default Hero;
