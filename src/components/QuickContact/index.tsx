import { useEffect, useState } from "react";

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

  console.log(managers);

  return (
    <div className={styles.__quick_contact}>
      <h2>Contact rapide</h2>
      <ul>
        {managers.map(({ firstname, lastname, email, phone }: any) => (
          <li>
            <h3>{`${firstname} ${lastname}`}</h3>
            <a href={`mailto:${email}`}>{email}</a>
            <br />
            <a href={`tel:+${phone}`}>{phone}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickContact;
