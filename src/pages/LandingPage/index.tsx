import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Components
import Navbar from "../../components/LandingPage/Navbar";
import Footer from "../../components/LandingPage/Footer";
import Newsletter from "../../components/LandingPage/Newsletter";
import Banner from "../../components/LandingPage/Banner";
import Hero from "../../components/LandingPage/Hero";

import banner1 from "../../assets/images/landingPage/brooke-cagle-unsplash.jpg";
import banner2 from "../../assets/images/landingPage/john-schnobrich-unsplash.jpg";
import banner3 from "../../assets/images/landingPage/alexandar-todov-unsplash.jpg";

// Styles
import styles from "../../styles/pages/landing-page.module.scss";

const LandingPage = () => {
  const [refreshTitle, setRefreshTitle] = useState<boolean>(false);

  useEffect(() => {
    let refreshTitleInterval = setInterval(
      () => setRefreshTitle(!refreshTitle),
      5000
    );

    if (document.title === "Savime") {
      document.title = "Time-saver for teams & companies ";
    } else {
      document.title = "Savime";
    }

    return () => clearInterval(refreshTitleInterval);
  }, [refreshTitle]);

  return (
    <section className={styles.__landing_page}>
      <Navbar />
      <Hero />
      <div className={styles.__content}>
        {[{ image: banner1, alt: "", orientation: "left" }, { image: banner2, alt: "", orientation: "right" }, { image: banner3, alt: "", orientation: "left" }].map(
          (banner) => (
            <Banner orientation={banner.orientation} image={banner.image} alt={banner.alt} key={uuidv4()} />
          )
        )}
        <Newsletter />
      </div>
      <Footer />
    </section>
  );
};

export default LandingPage;
