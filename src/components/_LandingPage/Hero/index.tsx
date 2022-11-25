import { useState } from "react";

// Styles
import styles from "./styles.module.scss";

// Components
import Modal from "../Modal";

interface Props {
  image: string;
  alt: string;
  button: string;
  title: Array<string>;
}

const Hero = ({ image, alt, button, title }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <>
    <div className={styles.__hero}>
      <div className={styles.__image}>
        <img src={image} alt={alt} />
        <h1>{title[0]}<span>{title[1]}</span></h1>
      </div>
      <div className={styles.__button}>
          <div><button onClick={()=>setModalIsOpen(true)}>{button}</button></div>
        </div>
    </div>
    {modalIsOpen && <Modal setModalIsOpen={setModalIsOpen} />}
    </>
  );
};

export default Hero;
