// Styles
import styles from "./styles.module.scss";

const UsefulInfo = () => {
  return (
    <div className={styles.__useful_info}>
      <h2>Infos perso & pratiques :</h2>
      <p>Prochaines vacances : </p>
      <p>Jours restant à poser :</p>
    </div>
  );
};

export default UsefulInfo;
