import { toast } from "react-toastify";
import { useState } from "react";

// Styles
import styles from "./styles.module.scss";

// Assets
import paperPlane from "../../../assets/images/icon/paper-plane.svg";

interface Props {
  title: string;
  lead: string;
  content: string;
  anchor?: string;
}

const Newsletter = ({ title, lead, content, anchor }: Props) => {
  const [email, setEmail] = useState("");
  const [isSend, setIsSend] = useState(false);

  const sendMail = () => {
    if (email === "") {
      toast.info("Veuillez renseigner votre email.");
    } else {
      setIsSend(true);
      fetch(`${process.env.REACT_APP_BACKEND_URL}/newsletters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setEmail("");
            setIsSend(false);
            toast.success(data.message);
          } else {
            console.error(data);
            setIsSend(false);
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.error(error);
          setIsSend(false);
          toast.error("Une erreur est survenue. Contactez support@savime.tech");
        });
    }
  };

  return (
    <div id={anchor} className={styles.__newsletter}>
      <h3>{title}</h3>
      <h4>{lead}</h4>
      <p>{content}</p>
      <div className={styles.__input}>
        <span>@ |</span>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e: any) => setEmail(e.currentTarget.value)}
        />
        {isSend ? (
          <img
            className={styles.__paper_plane}
            src={paperPlane}
            alt="Paper Plane"
          />
        ) : (
          <button disabled className={styles.__send_button} onClick={() => sendMail()}>
            Envoyer
          </button>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
