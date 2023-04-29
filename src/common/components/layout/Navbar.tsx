import { HiMenu, HiSearch } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b border-b-secondary-50/10 fixed top-0 left-0 w-full z-[100]">
      <div className="container flex items-stretch h-[50px] gap-10">
        <Link to={"/"} className="font-bold text-2xl self-center">
          <span className="text-primary-600">M</span>VX
        </Link>

        <ul className="hidden md:flex items-stretch gap-2 font-medium">
          <li className="h-full flex items-stretch">
            <NavLink className="navbar_link" to={"/"}>
              Home
            </NavLink>
          </li>
          <li className="h-full flex items-stretch">
            <NavLink className="navbar_link" to={"/movie"}>
              Movies
            </NavLink>
          </li>
          <li className="h-full flex items-stretch">
            <NavLink className="navbar_link" to={"/tv"}>
              Tv Shows
            </NavLink>
          </li>
        </ul>

        {/* actions */}
        <div className="flex items-center gap-2 ml-auto">
          <button className="px-2 py-2 hover:bg-white/30 rounded-sm">
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
