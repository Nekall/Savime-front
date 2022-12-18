import { Link } from "react-router-dom";

// Assets
import logo from "../../assets/images/logo/logo-full-transparent.png";

// Styles
import styles from "../../styles/pages/home.module.scss";

const Home = () => {
  return (
    <section className={styles.__home}>
      <div>
        <img className={styles.__logo} src={logo} alt="logo savime" />
        <hr />
        <p>Time-saver for teams & companies</p>
        <Link to={"/concept"}>CONCEPT</Link>{" "}<Link to={"/connexion"}>DEMO</Link>
      </div>
    </section>
  );
};

export default Home;
