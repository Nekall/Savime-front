import { FormEvent, useEffect, useState } from "react";

// Styles
import styles from "./styles.module.scss";

const Contact = () => {
  const [managers, setManagers] = useState<any>([]);
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/managers`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setManagers(data.data);
        }
      });
  }, []);

  const sendMail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("send mail");
  };

  console.log(managers);
  console.log(email);
  console.log(message);

  return (
    <div className={styles.__contact}>
      <h1>Contact</h1>
      <p>Envoyer un message à un membre de l'équipe RH</p>
      <form onSubmit={(e) => sendMail(e)}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <br />
        <select onChange={(e) => setEmail(e.target.value)}>
          <option value="" selected disabled hidden>
            Choisir un·e manager 
          </option>
          {managers.map(({ firstname, lastname, email }: any) => (
            <option
              value={email}
            >{`${firstname} ${lastname} (${email})`}</option>
          ))}
        </select>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default Contact;
