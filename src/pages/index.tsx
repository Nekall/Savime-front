// Assets
import logo from "../assets/images/logo/logo-full-transparent.png";

// Styles
import styles from "../styles/pages/home.module.scss";

const Home = () => <section className={styles.__home_page}>
    <div>
        <img className={styles.__logo} src={logo} alt="logo savime" />
    </div>
</section>;

export default Home;