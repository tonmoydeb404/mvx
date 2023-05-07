import "swiper/swiper-bundle.css";
import HeroSearch from "../common/components/HeroSearch";
import PopularMedia from "../common/components/pages/home/PopularMedia";
import TrendingMedia from "../common/components/pages/home/TrendingMedia";

const Home = () => {
  return (
    <main>
      <header className="bg-[url('https://www.themoviedb.org/t/p/w533_and_h300_bestv2/gMJngTNfaqCSCqGD4y8lVMZXKDn.jpg')] bg-no-repeat bg-cover before:block before:absolute before:bottom-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-b before:from-secondary-900/50 before:to-secondary-900 before:backdrop-blur-[2px] before:z-[0] relative ">
        <div className="container flex items-center justify-center min-h-[550px] ">
          <div className="z-[1] relative flex flex-col text-center">
            <h2 className="text-5xl sm:text-6xl font-bold">Wellcome.</h2>
            <p className="sm:text-lg mt-2 mb-10">
              explore your favourite movies & tv shows from here
            </p>

            <HeroSearch />
          </div>
        </div>
      </header>

      <TrendingMedia className="container mb-24" />

      <PopularMedia className="container mb-24" />
    </main>
  );
};

export default Home;
