import { NavLink } from "react-router-dom";
import links from "../../../config/links";

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
        {links.map((item) => (
          <li key={item.path}>
            <NavLink className="navbar_menu_link" to={item.path} onClick={hide}>
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavbarMenu;
