// Assets
//import github from "../../assets/images/icon/github.svg";

// Styles
import styles from "./styles.module.scss";

const Newsletter = () => {
  return (
    <div className={styles.__newsletter}>
      <h3>Fusce qui nulla</h3>
      <h5>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam quis
        facere accusantium itaque, dignissimos ipsam amet cumque nobis iste
        possimus dolore.
      </h5>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut aspernatur
        ad voluptates suscipit eaque libero omnis et repudiandae exercitationem.
        Eos quas accusantium dicta a culpa.
      </p>
      <div className={styles.__input}>
        <span>@ |</span>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email@adress.com"
        />
        <input type="submit" value="Send" />
      </div>
    </div>
  );
};

export default Newsletter;
