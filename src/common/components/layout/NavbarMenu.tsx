import { NavLink } from "react-router-dom";

type NavbarMenuProps = {
  show: boolean;
  hide: () => any;
};

const NavbarMenu = ({ hide, show }: NavbarMenuProps) => {
  return (
    <div
      style={
        show
          ? { top: "100%", transform: "translateY(0)" }
          : { top: 0, transform: "translateY(-100%)" }
      }
      className="absolute md:hidden duration-300 left-0 w-full bg-secondary-800 "
    >
      <ul className="container flex flex-col items-stretch gap-2 font-medium py-2">
        <li className="">
          <NavLink className="navbar_menu_link" to={"/"} onClick={hide}>
            Home
          </NavLink>
        </li>
        <li className="">
          <NavLink className="navbar_menu_link" to={"/movie"} onClick={hide}>
            Movies
          </NavLink>
        </li>
        <li className="">
          <NavLink className="navbar_menu_link" to={"/tv"} onClick={hide}>
            Tv Shows
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavbarMenu;
