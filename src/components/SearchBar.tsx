import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="hidden sm:flex items-center gap-2 rounded-md ring-1 ring-pink-200 px-3 py-1 shadow-sm bg-white">
      <Search className="w-4 h-4 text-pink-400"/>
      <input
        id="search"
        placeholder="Buscar bolos, cupcakes..."
        className="text-sm outline-none w-full placeholder-gray-400"
      />
    </div>
  );
};

export default SearchBar;