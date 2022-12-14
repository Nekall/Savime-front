import { toast } from "react-toastify";
import { useEffect, useState } from "react";

// Components
import Input from "../../Input";

// Styles
import styles from "./styles.module.scss";

// Assets
import cross from "../../../assets/images/icon/cross.svg";
import avatar from "../../../assets/images/icon/avatar.svg";
import envelope from "../../../assets/images/icon/envelope.svg";

interface ModalProps {
  setModalIsOpen: (value: boolean) => void;
}

const Modal = ({ setModalIsOpen }: ModalProps) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [text, setText] = useState("");

  useEffect((): any => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const sendMail = () => {
    if (email === "" || firstname === "" || lastname === "" || text === "") {
      toast.info("Veuillez remplir tous les champs.", {
        position: "bottom-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstname,
          lastname,
          text,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            toast.success(data.message, {
              position: "bottom-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
            setModalIsOpen(false);
          } else {
            toast.error(data.message, {
              position: "bottom-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(
            "Une erreur est survenue. Contactez support@savime.tech",
            {
              position: "bottom-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            }
          );
        });
    }
  };

  return (
    <div className={styles.__modal}>
      <div className={styles.__content}>
        <button
          className={styles.__close}
          onClick={() => setModalIsOpen(false)}
        >
          <img src={cross} alt="Close" />
        </button>
        <br />
        <h1>Formulaire de contact</h1>
        <Input
          icon={avatar}
          alt={"avatar"}
          type={"text"}
          placeholder={"Prénom"}
          value={firstname}
          onChange={(e: any) => setFirstname(e.currentTarget.value)}
        />
        <Input
          icon={avatar}
          alt={"avatar"}
          type={"text"}
          placeholder={"Nom"}
          value={lastname}
          onChange={(e: any) => setLastname(e.currentTarget.value)}
        />
        <Input
          icon={envelope}
          type={"email"}
          placeholder={"email@email.com"}
          value={email}
          onChange={(e: any) => setEmail(e.currentTarget.value)}
        />
        <Input
          type={"textArea"}
          placeholder={
            "Une question ? Une suggestion ? N'hésitez pas à nous envoyer un message, nous vous répondrons de façon aussi efficace que possible !"
          }
          value={text}
          onChange={(e: any) => setText(e.currentTarget.value)}
        />
        <Input onClick={() => sendMail()} type={"submit"} value={"Envoyer"} />
      </div>
    </div>
  );
};

export default Modal;
