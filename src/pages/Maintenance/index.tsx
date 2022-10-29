import { useEffect, useState } from "react";

// Assets
import logo from "../../assets/images/logo/logo-full-transparent.png";

// Styles
import styles from "../../styles/pages/maintenance.module.scss";

const Maintenance = () => {
    const [refreshTitle, setRefreshTitle] = useState<boolean>(false);

    useEffect(() => {
      let refreshTitleInterval = setInterval(
        () => setRefreshTitle(!refreshTitle),
        3000
      );
  
      if (document.title === "Savime | In Progress") {
        document.title = "Savime";
      } else {
        document.title = "Savime | In Progress";
      }
  
      return () => clearInterval(refreshTitleInterval);
    }, [refreshTitle]);
  return (
    <section className={styles.__maintenance_page}>
      <div>
        <img className={styles.__logo} src={logo} alt="logo savime" />
        <hr />
        <p>Time-saver for teams & companies</p>
      </div>
    </section>
  );
};

export default Maintenance;
