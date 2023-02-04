import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

// Atoms
import { userDataState } from "../../atoms/user";

// Styles
import styles from "./styles.module.scss";

const Contact = () => {
  const { token, firstname, lastname } = useRecoilValue(userDataState);
  const [managers, setManagers] = useState<any>([]);
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [size, setSize] = useState<number>(0);

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

  const sendMail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (size > 1000) return toast.info("Votre message est trop long");

    fetch(`${process.env.REACT_APP_BACKEND_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Votre message a bien été envoyé.");
          setMessage("");
        } else {
          console.error(data);
          toast.error("Impossible d'envoyer votre message.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  };

  return (
    <div className={styles.__contact}>
      <h1>Contact</h1>
      <p>Envoyer un message rapide à un membre de l'équipe RH</p>
      <form onSubmit={(e) => sendMail(e)}>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setSize(e.target.value.length);
          }}
          className={size > 1000 ? styles.__red : ""}
        ></textarea>
        <br />
        <select value={email} onChange={(e) => setEmail(e.target.value)}>
          <option value="" selected disabled hidden defaultChecked>
            Choisir un·e manager
          </option>
          {managers.map(({ firstname, lastname, email }: any) => (
            <option
              key={email}
              value={email}
            >{`${firstname} ${lastname} (${email})`}</option>
          ))}
        </select>
        <input
          disabled={size <= 1000 && email !== "" ? false : true}
          type="submit"
          value="Envoyer"
        />
        <div className={styles.__counter}>{size}/1000</div>
      </form>
    </div>
  );
};

export default Contact;
