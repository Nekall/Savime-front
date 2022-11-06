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

// Assets
import hero from "../../assets/images/landingPage/helena-lopes-unsplash.jpg";

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
      document.title = "Time-saver for teams & companies";
    } else {
      document.title = "Savime";
    }

    return () => clearInterval(refreshTitleInterval);
  }, [refreshTitle]);

  return (
    <section className={styles.__landing_page}>
      <Navbar
        links={[
          { target: "#liberte", name: "Liberté" },
          { target: "#management", name: "Management" },
          { target: "#teletravail", name: "Télétravail" },
          { target: "#newsletters", name: "Newsletters" },
        ]}
      />
      <Hero
        image={hero}
        title={["The time-saver", "for teams & companies"]}
        alt={"group of people sitting while using laptop computer"}
        button={"Contactez-nous"}
      />
      <div className={styles.__content}>
        {[
          {
            image: banner1,
            alt: "man and woman sitting in front of silver macbook",
            orientation: "left",
            anchor: "liberte",
            title: "La liberté, une motivation.",
            content: "La liberté est une source de motivation importante dans dans le monde du travail. Elle encourage les individus à être plus productifs et à prendre des initiatives. La liberté de travailler sans contraintes et de prendre des décisions permet aux individus de s’épanouir professionnellement et de développer leur potentiel. Savime permet cette liberté de par sa facilité d'accès et facilite donc cette liberté de mouvement en brisant les barrières des demandes en présentielles beaucoup trop formelles pour notre époque.",
          },
          {
            image: banner2,
            alt: "three person pointing the silver laptop computer",
            orientation: "right",
            anchor: "management",
            title: ".Le Management, une priorité",
            content: "Le management doit être une priorité pour toute entreprise qui souhaite réussir. En effet, une bonne gestion est essentielle pour garantir le bon fonctionnement et la pérennité de l'entreprise. Elle permet de prendre les bonnes décisions au bon moment, de gérer efficacement les ressources et de motiver les équipes.  Pour garantir un management efficace, il est important de mettre en place une bonne organisation, de bien communiquer et de définir clairement les objectifs. Il est également essentiel de former et de motiver les équipes, de les impliquer dans la prise de décision et de les écouter",
          },
          {
            image: banner3,
            alt: "black iPad beside cup of coffee on table",
            orientation: "left",
            anchor: "teletravail",
            title: "Le télétravail, le futur.",
            content:
              "Le télétravail c'est le futur parce que c'est un moyen de travailler plus efficacement et de manière plus flexible. Il permet aux gens de travailler à leur propre rythme et de se concentrer sur leur travail sans les distractions de l'open-space. Le télétravail est de plus en plus courant, notamment dans les pays développés. En effet, les avancées technologiques ont permis de créer des outils qui facilitent le travail à distance. De plus, de nombreuses entreprises ont compris que le télétravail permet de réduire les coûts liés aux bureaux et au personnel. Enfin, le télétravail permet aux salariés de gagner du temps en évitant les trajets domicile-travail.",
          },
        ].map((banner) => (
          <Banner
            anchor={banner.anchor}
            orientation={banner.orientation}
            image={banner.image}
            alt={banner.alt}
            key={uuidv4()}
            title={banner.title}
            content={banner.content}
          />
        ))}
        <Newsletter
          anchor={"newsletters"}
          title={"Newsletters"}
          lead={
            "Inscrivez-vous aux newsletters de Savime pour recevoir les mails d'informations concernant les futures fonctionnalités."
          }
          content={"Vous recevrez un mail d'informations par mois."}
        />
      </div>
      <Footer />
    </section>
  );
};

export default LandingPage;
