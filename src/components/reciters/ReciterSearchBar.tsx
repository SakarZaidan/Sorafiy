import * as React from "react";
import { Input } from "@/components/ui/input";
import type { Reciter } from "@/Iib/types";

interface ReciterSearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  reciters: Reciter[];
}

const ReciterSearchBar: React.FC<ReciterSearchBarProps> = ({
  searchQuery,
  onSearchQueryChange,
  reciters,
}) => {
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearchQueryChange(query);

    if (query.length > 0) {
      const filteredSuggestions = reciters
        .filter((reciter) =>
          reciter.name.toLowerCase().includes(query.toLowerCase()) ||
          reciter.arabicName.toLowerCase().includes(query.toLowerCase())
        )
        .map((reciter) => reciter.name); // Or you could use arabicName or a combination
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearchQueryChange(suggestion);
    setShowSuggestions(false);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search for a reciter..."
        value={searchQuery}
        onChange={handleInputChange}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Hide suggestions when input loses focus, with a slight delay to allow click on suggestion
        onFocus={() => { // Show suggestions again if input is not empty and there are suggestions
          if (searchQuery.length > 0 && suggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReciterSearchBar;