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
      <Navbar links={[{ target: "#banner1", name: "Banner1"}, { target: "#banner2", name: "Banner2"}, { target: "#banner3", name: "Banner3"}, { target: "#contact", name: "Contact"}]} />
      <Hero image={hero} title={["The time-saver" ,"for teams & companies"]} alt={"group of people sitting while using laptop computer"} button={"CallToAction"}/>
      <div className={styles.__content}>
        {[{ image: banner1, alt: "man and woman sitting in front of silver macbook", orientation: "left", anchor: "banner1" }, { image: banner2, alt: "three person pointing the silver laptop computer", orientation: "right", anchor: "banner2" }, { image: banner3, alt: "black iPad beside cup of coffee on table", orientation: "left", anchor: "banner3" }].map(
          (banner) => (
            <Banner anchor={banner.anchor} orientation={banner.orientation} image={banner.image} alt={banner.alt} key={uuidv4()} title={"Fusce qui nulla"} content={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus harum laborum, recusandae debitis, consectetur ex neque voluptas culpa mollitia illo molestiae dignissimos eveniet provident rerum deleniti porro voluptatum blanditiis vitae numquam! Quaerat, sapiente! Ratione nihil quam ut porro fugiat reiciendis. Minima ea, nam neque tempora similique unde sint perspiciatis sunt provident praesentium. Quae veritatis rem, similique unde deserunt dicta velit repellat delectus. Omnis a eveniet quis impedit asperiores voluptas, cum suscipit dignissimos blanditiis vel quaerat exercitationem, sit earum enim aliquid. Repudiandae ex beatae maxime tenetur deleniti sunt odio ducimus alias reiciendis, et eius id nihil at possimus, modi, iusto totam corrupti voluptatum inventore? Hic voluptatum sed distinctio blanditiis quia explicabo? Ducimus ea mollitia minus, consectetur impedit obcaecati cupiditate autem laboriosam neque deserunt expedita ullam quasi ratione fugit animi hic, consequatur eaque tenetur tempora quia unde provident? Hic, nihil iure voluptatem incidunt officiis molestias, delectus rem quas quibusdam, esse est! Sed."}/>
          )
        )}
        <Newsletter anchor={"contact"} title={"Fusce qui nulla"} lead={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam quis facere accusantium itaque, dignissimos ipsam amet cumque nobis iste possimus dolore."} content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut aspernatur ad voluptates suscipit eaque libero omnis et repudiandae exercitationem. Eos quas accusantium dicta a culpa."}/>
      </div>
      <Footer />
    </section>
  );
};

export default LandingPage;
