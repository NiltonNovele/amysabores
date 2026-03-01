import { Search } from "lucide-react";

interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {}

const SearchBar: React.FC<SearchBarProps> = ({ className, ...props }) => {
  return (
    <div
      className={`hidden sm:flex items-center gap-2 rounded-md ring-1 ring-pink-200 px-3 py-1 shadow-sm bg-white ${className}`}
      {...props}
    >
      <Search className="w-4 h-4 text-pink-400" />
      <input
        id="search"
        placeholder="Buscar bolos, cupcakes..."
        className="text-sm outline-none w-full placeholder-gray-400"
      />
    </div>
  );
};

export default SearchBar;