import { HiSearch } from "react-icons/hi";
import { Form } from "react-router-dom";

const HeroSearch = () => {
  return (
    <Form
      action="/search"
      method="GET"
      className="flex items-stretch gap-2 max-w-[600px] lg:w-[600px] bg-white/40 px-3 py-2 rounded hover:bg-white/50 duration-200 group"
    >
      <input
        type="text"
        name="query"
        className="py-0 px-2 focus:outline-none border-0 flex-1 text-white bg-transparent placeholder:text-secondary-300 w-full group-hover:placeholder:text-secondary-200"
        placeholder="Search for movie or tv show"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary-600 font-medium text-sm uppercase rounded inline-flex items-center gap-1"
      >
        Explore <HiSearch />
      </button>
    </Form>
  );
};

export default HeroSearch;
