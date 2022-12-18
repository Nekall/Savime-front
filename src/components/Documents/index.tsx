// Styles
import styles from "./styles.module.scss";

const Documents = () => {
  return (
    <div className={styles.__documents}>
      <h2>Attestation de travail</h2>
      <div>
        <button>Générer</button>
        <button>Télécharger</button>
      </div>
      <h2>Contrat de travail</h2>
      <div>
        <button>Générer</button>
        <button>Télécharger</button>
      </div>
      <h2>...</h2>
      <div>
        <button>Générer</button>
        <button>Télécharger</button>
      </div>
      <h2>...</h2>
      <div>
        <button>Générer</button>
        <button>Télécharger</button>
      </div>
    </div>
  );
};

export default Documents;
