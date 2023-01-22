// Styles
import styles from "./styles.module.scss";

interface Props {
  title: string;
  lead: string;
  content: string;
  anchor?: string;
}

const Introduction = ({ title, lead, content, anchor }: Props) => {
  return (
    <div id={anchor} className={styles.__introduction}>
      <h3>{title}</h3>
      <h5>{lead}</h5>
      <p>{content}</p>
    </div>
  );
};

export default Introduction;
