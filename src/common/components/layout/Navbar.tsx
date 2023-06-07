import { useEffect, useState } from "react";
import { HiMenu, HiSearch, HiX } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import links from "../../../config/links";
import NavbarMenu from "./NavbarMenu";
import NavbarSearch from "./NavbarSearch";

const Navbar = () => {
  const [changeBg, setChangeBg] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const changeNavClass = () => {
    window.scrollY >= 100 ? setChangeBg(true) : setChangeBg(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", changeNavClass);
    return () => {
      window.removeEventListener("scroll", changeNavClass);
    };
  }, []);

  const toggleMenu = () => {
    setShowSearch(false);
    setShowMenu((prev) => !prev);
  };

  const toggleSearch = () => {
    setShowMenu(false);
    setShowSearch((prev) => !prev);
  };

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
          {links.map((item) => (
            <li className="h-full flex items-stretch" key={item.path}>
              <NavLink className="navbar_link" to={item.path}>
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* actions */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            className={`btn-icon btn-ghost ${showSearch ? "active" : ""}`}
            onClick={toggleSearch}
          >
            <HiSearch className="text-xl" />
          </button>
          <button
            className="btn-icon btn-secondary md:hidden"
            onClick={toggleMenu}
          >
            {showMenu ? (
              <HiX className="text-xl" />
            ) : (
              <HiMenu className="text-xl" />
            )}
          </button>
        </div>
      </div>
      <NavbarSearch show={showSearch} onSubmit={() => setShowSearch(false)} />
      <NavbarMenu show={showMenu} hide={() => setShowMenu(false)} />
    </nav>
  );
};

export default Navbar;
