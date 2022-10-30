// Assets
import hero from "../../../assets/images/landingPage/helena-lopes-unsplash.jpg";

// Styles
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <div className={styles.__hero}>
      <div className={styles.__image}>
        <img src={hero} alt="" />
        <h1>The time-saver <span>for teams & companies</span></h1>
      </div>
      <div className={styles.__button}>
          <div><button>CallToAction</button></div>
        </div>
    </div>
  );
};

export default Footer;
