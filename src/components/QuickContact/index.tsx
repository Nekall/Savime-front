import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

// Atoms
import { userDataState } from "../../atoms/user";

// Styles
import styles from "./styles.module.scss";

const QuickContact = () => {
  const token = useRecoilValue(userDataState).token;
  const [managers, setManagers] = useState<any>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/managers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setManagers(data.data);
        } else {
          console.error(data);
          toast.error("Impossible de récupérer la liste des membres RH.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  }, [token]);

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
