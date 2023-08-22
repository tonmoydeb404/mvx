import { NavLink } from "react-router-dom";
import links from "../../../config/links";

const BottomNavbar = () => {
  return (
    <section className="block md:hidden fixed inset-x-0 bottom-0 z-10 bg-secondary-base shadow rounded-t-2xl">
      <div id="tabs" className="flex justify-between">
        {links.map((link) => (
          <NavLink
            to={link.path}
            key={link.path}
            className={({ isActive }) =>
              `w-full focus:text-primary-dark hover:text-primary-base justify-center inline-flex flex-col items-center text-center pt-2 pb-1 ${
                isActive ? "text-primary-base" : ""
              }`
            }
          >
            <link.Icon className="w-[24px] h-[24px]" />
            <span className="block text-xs font-light">{link.title}</span>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default BottomNavbar;
