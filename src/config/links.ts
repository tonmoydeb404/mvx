import { IconType } from "react-icons";
import { HiHome, HiUsers } from "react-icons/hi";
import { MdOutlineMovie, MdTv } from "react-icons/md";

const links: { title: string; path: string; Icon: IconType }[] = [
  { title: "Home", path: "/", Icon: HiHome },
  { title: "Movies", path: "/movies", Icon: MdOutlineMovie },
  { title: "Tv Shows", path: "/tvs", Icon: MdTv },
  { title: "Persons", path: "/persons", Icon: HiUsers },
];

export default links;
