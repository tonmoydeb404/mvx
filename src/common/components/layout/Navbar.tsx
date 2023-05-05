import { useEffect, useState } from "react";
import { HiMenu, HiSearch } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import NavbarSearch from "./NavbarSearch";

const Navbar = () => {
  const [changeBg, setChangeBg] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const changeNavClass = () => {
    window.scrollY >= 100 ? setChangeBg(true) : setChangeBg(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", changeNavClass);
    return () => {
      window.removeEventListener("scroll", changeNavClass);
    };
  }, []);

  return (
    <nav
      className={`border-b border-b-secondary-50/10  top-0 left-0 w-full z-[100] duration-200 ${
        changeBg ? "bg-secondary-900 fixed" : "bg-transparent absolute"
      }`}
    >
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
          <button
            className={`px-2 py-2 rounded-sm ${
              showSearch ? "bg-white/30 " : "hover:bg-white/30"
            }`}
            onClick={() => setShowSearch((prev) => !prev)}
          >
            <HiSearch className="text-lg" />
          </button>
          <button className="px-2 py-2 bg-secondary-800 hover:bg-secondary-700 rounded-sm md:hidden">
            <HiMenu className="text-lg" />
          </button>
        </div>
      </div>
      <NavbarSearch show={showSearch} onSubmit={() => setShowSearch(false)} />
    </nav>
  );
};

export default Navbar;
