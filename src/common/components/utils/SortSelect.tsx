import { HTMLProps } from "react";
import { SortBy } from "../../../types/tmdb.type";

type SortSelectProps = {
  value: SortBy;
  setValue: (value: SortBy) => any;
  className?: string;
} & HTMLProps<HTMLSelectElement>;

type SortSelectOption = { title: string; value: SortBy };

const options: SortSelectOption[] = [
  { value: "popularity.desc", title: "Popular First" },
  { value: "popularity.asc", title: "Popular Last" },
  { value: "vote_average.desc", title: "Rating First" },
  { value: "vote_average.asc", title: "Rating Last" },
];

const SortSelect = ({ value, setValue, ...props }: SortSelectProps) => {
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value as SortBy)}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.title}
        </option>
      ))}
    </select>
  );
};

export default SortSelect;
