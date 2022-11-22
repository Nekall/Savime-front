import { useEffect, useState } from "react";

// Components
import MiniProfile from "../../components/MiniProfile";
import SideMenu from "../../components/SideMenu";
import Navbar from "../../components/Navbar";

// Styles
import styles from "../../styles/pages/dashboard.module.scss";

const Dashboard = () => {
  const [employee, setEmployee] = useState();

  const getUserData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/employees/10`)
    .then((response) => response.json())
    .then((data) => setEmployee(data.employee))
    .catch((err) => console.error(err));
  }

  useEffect(() => {
    //getUserData();
  }, []);

  return (
    <div className={styles.__dashboard}>
      <section className={styles.__header}>
        <Navbar />
      </section>
      <section className={styles.__side_menu}>
        <MiniProfile />
        <hr />
        <SideMenu />
      </section>
      <section className={styles.__view}>
        <div className={styles.__content}>
          <span className={styles.__rounded}></span>
          <h3>...Content...</h3>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
