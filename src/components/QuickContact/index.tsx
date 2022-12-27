// Styles
import styles from "./styles.module.scss";

const QuickContact = () => {
  return (
    <div className={styles.__quick_contact}>
      <h2>Contact rapide</h2>
      <ul>
        <li>
          <h3>Mr AZERTYUIOP</h3>
          <a href="mailto:test@savime.tech">test@savime.tech</a>
          <br />
          <a href="tel:+0987654321">000987654321</a>
        </li>
        <li>
          <h3>Mr AZERTYUIOP</h3>
          <a href="mailto:test@savime.tech">test@savime.tech</a>
          <br />
          <a href="tel:+0987654321">000987654321</a>
        </li>
        <li>
          <h3>Mr AZERTYUIOP</h3>
          <a href="mailto:test@savime.tech">test@savime.tech</a>
          <br />
          <a href="tel:+0987654321">000987654321</a>
        </li>
      </ul>
    </div>
  );
};

export default QuickContact;
