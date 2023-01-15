import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Styles
import styles from "./styles.module.scss";

const Contact = () => {
  const [managers, setManagers] = useState<any>([]);
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [size, setSize] = useState<number>(0);

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

    if (size > 1000) {
      return toast.info("Votre message est trop long", {
        position: "bottom-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    console.log("send mail");
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
          <option value="" selected disabled hidden>
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
        <div>{size}/1000</div>
      </form>
    </div>
  );
};

export default Contact;
