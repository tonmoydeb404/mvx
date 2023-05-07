import { HiSearch } from "react-icons/hi";
import { Form } from "react-router-dom";

type NavbarSearchProps = {
  show: boolean;
  onSubmit: () => any;
};

const NavbarSearch = ({ show, onSubmit }: NavbarSearchProps) => {
  return (
    <div
      style={{ top: show ? "100%" : "-110%" }}
      className="absolute duration-300 left-0 w-full bg-secondary-50 text-secondary-900 py-2"
    >
      <Form
        action="/search"
        method="GET"
        className="container flex items-stretch gap-1"
        onSubmit={onSubmit}
      >
        <input
          name="query"
          placeholder="Search Here"
          required
          type="search"
          className="form-input py-1 flex-1 justify-self-stretch w-full bg-transparent focus:ring-0 focus:outline-none focus:border-primary-600 border-1 border-slate-400 rounded-sm"
        />
        <button type="submit" className="btn btn-primary">
          <span className="hidden sm:inline-block">Search</span>
          <HiSearch className="text-lg" />
        </button>
      </Form>
    </div>
  );
};

export default NavbarSearch;
