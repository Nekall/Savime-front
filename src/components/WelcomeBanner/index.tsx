// Styles
import styles from "./styles.module.scss";

const WelcomeBanner = () => {
  const today = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <div className={styles.__welcome_banner}>
      <h2>Bienvenue sur votre espace Savime,</h2>
      <p>Nous somme le : {today}</p>
      <p>N'hésitez pas à nous envoyer un message via l'onglet message si vous avez une demande particulière.</p>
    </div>
  );
};
export default WelcomeBanner;
