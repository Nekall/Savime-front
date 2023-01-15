import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Styles
import styles from "./styles.module.scss";

const QuickContact = () => {
  const [managers, setManagers] = useState<any>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/managers`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setManagers(data.data);
        }
      });
  }, []);

  return (
    <div className={styles.__quick_contact}>
      <h2>Contact rapide</h2>
      <ul>
        {managers.map(({ firstname, lastname, email, phone }: any) => (
          <li key={uuidv4()}>
            <h3>{`${firstname} ${lastname}`}</h3>
            <a href={`mailto:${email}`}>{email}</a>
            
            <a href={`tel:+${phone}`}>{phone}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickContact;
