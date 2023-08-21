import { IconType } from "react-icons";
import { HiHome, HiUsers } from "react-icons/hi";
import { MdOutlineMovie, MdTv } from "react-icons/md";

const links: { title: string; path: string; Icon: IconType }[] = [
  { title: "Home", path: "/", Icon: HiHome },
  { title: "Movies", path: "/movie", Icon: MdOutlineMovie },
  { title: "Tv Shows", path: "/tv", Icon: MdTv },
  { title: "Persons", path: "/person", Icon: HiUsers },
  // { title: "Ai Suggestion", path: "/ai-suggestion" },
];

export default links;
