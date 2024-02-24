import { Link } from "react-router-dom";

// Assets
import logo from "../../assets/images/logo/logo-full-transparent.png";

// Components
import Tooltip from "../../components/Tooltip"

// Styles
import styles from "../../styles/pages/home.module.scss";

const Home = () => {
  return (
    <>
    <Tooltip />
    <section className={styles.__home}>
      <div>
        <img className={styles.__logo} src={logo} alt="logo savime" />
        <hr />
        <p>Time-saver for teams & companies</p>
        <Link to={"/concept"}>CONCEPT</Link> <Link className={styles.__disabled} to={"/connexion"}>DEMO</Link>
      </div>
    </section>
    </>
  );
};

export default Home;
