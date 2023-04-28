import { HiMenu, HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="container flex items-center justify-between py-3 ">
        <Link to={"/"} className="font-bold text-2xl">
          <span className="text-primary-500">M</span>VX
        </Link>

        <ul className="hidden md:flex items-center gap-2 font-medium">
          <li>
            <Link className="px-4 py-2 hover:bg-secondary-800" to={"/movies"}>
              Movies
            </Link>
          </li>
          <li>
            <Link className="px-4 py-2 hover:bg-secondary-800" to={"/tv"}>
              Tv Shows
            </Link>
          </li>
        </ul>

        {/* actions */}
        <div className="flex items-center gap-2">
          <button className="px-2 py-2 hover:bg-secondary-800 rounded-sm">
            <HiSearch className="text-lg" />
          </button>
          <button className="px-2 py-2 bg-secondary-800 hover:bg-secondary-700 rounded-sm md:hidden">
            <HiMenu className="text-lg" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
