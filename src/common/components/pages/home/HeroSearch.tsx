import { HiSearch } from "react-icons/hi";
import { Form } from "react-router-dom";

const HeroSearch = () => {
  return (
    <Form
      action="/search"
      method="GET"
      className="flex items-stretch gap-2 max-w-[600px] lg:w-[600px] bg-background-content px-3 py-2 rounded duration-200 group"
    >
      <input
        required
        type="text"
        name="query"
        className="py-0 px-2 focus:outline-none border-0 flex-1 text-background-base placeholder:text-secondary-light bg-transparent w-full"
        placeholder="Search for movie or tv show"
      />
      <button type="submit" className="btn btn-primary">
        Explore <HiSearch />
      </button>
    </Form>
  );
};

export default HeroSearch;
