import { Helmet } from "react-helmet-async";
import "swiper/swiper-bundle.css";
import Hero from "../common/components/pages/home/Hero";
import PopularMedia from "../common/components/pages/home/PopularMedia";
import TrendingMedia from "../common/components/pages/home/TrendingMedia";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>MVX - Explore Your Entertainment</title>
      </Helmet>
      <main>
        <Hero />
        <TrendingMedia className="container mb-24" />
        <PopularMedia className="container mb-24" />
      </main>
    </>
  );
};

export default Home;
