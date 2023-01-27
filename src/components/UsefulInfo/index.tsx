// Styles
import styles from "./styles.module.scss";

const UsefulInfo = () => {
  return (
    <div className={styles.__useful_info}>
      <h2>Infos concernant Savime :</h2>
      <h3>Prochainement sur votre application Savime :</h3>
      <ul>
        <li>Possibilité d'actualiser vous même votre attestation de travail.</li>
        <li>Possibilité de poser des jours de congé directement depuis l'onglet Calendrier.</li>
        <li>Possibilité d'envoyer vos documents style "Arrêt maladie" directement depuis votre espace.</li>
      </ul>
    </div>
  );
};

export default UsefulInfo;
