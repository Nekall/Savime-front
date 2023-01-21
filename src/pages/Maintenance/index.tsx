// Assets
import logo from "../../assets/images/logo/logo-full-transparent.png";

// Styles
import styles from "../../styles/pages/maintenance.module.scss";

const Maintenance = () => {
  return (
    <section className={styles.__maintenance}>
      <div>
        <img className={styles.__logo} src={logo} alt="logo savime" />
        <hr />
        <p>Time-saver for teams & companies</p>
      </div>
    </section>
  );
};

export default Maintenance;
