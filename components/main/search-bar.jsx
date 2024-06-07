import { FiSearch } from "react-icons/fi";
import { Input } from "../ui/input";

const SearchBar = () => {
  return (
    <div className="absolute" style={{ width: "-webkit-fill-available" }}>
      <FiSearch className="absolute m-3 text-primary-text" />
      <Input className="bg-primary-foreground border-0 rounded-none focus-visible:ring-0 text-primary-text placeholder:text-primary-text ps-11" />
    </div>
  );
};

export default SearchBar;
