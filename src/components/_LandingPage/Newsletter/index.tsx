// Styles
import styles from "./styles.module.scss";

interface Props {
  title: string;
  lead: string; 
  content: string;
  anchor?: string;
}

const Newsletter = ({ title, lead, content, anchor }: Props) => {
  return (
    <div id={anchor} className={styles.__newsletter}>
      <h3>{title}</h3>
      <h5>
        {lead}
      </h5>
      <p>
        {content}
      </p>
      <div className={styles.__input}>
        <span>@ |</span>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email@adress.com"
        />
        <input type="submit" value="Send" />
      </div>
    </div>
  );
};

export default Newsletter;
