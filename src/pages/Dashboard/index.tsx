// Styles
import styles from "../../styles/pages/dashboard.module.scss";

const Dashboard = () => {
  fetch(``)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

  return (
    <div className={styles.__dashboard}>
      <section className={styles.__header}>
        
      </section>
      <section className={styles.__side_menu}>side menu</section>
      <section className={styles.__view}>
        <div className={styles.__content}>
          <span className={styles.__rounded}></span>
          <h3>VIEW</h3>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
