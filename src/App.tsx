import React, { useState, useEffect, ChangeEvent } from 'react';

interface SearchResult {
  id: number;
  name: string;
}

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedTerm, setDebouncedTerm] = useState<string>(searchTerm);
  const [results, setResults] = useState<SearchResult[]>([]);

  // Update debounced term after a delay
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Fetch results when debounced term changes
  useEffect(() => {
    if (debouncedTerm) {
      // Replace with your search logic
      const fetchData = async () => {
        const searchResults = await searchFunction(debouncedTerm);
        setResults(searchResults);
      };

      fetchData();
    } else {
      setResults([]);
    }
  }, [debouncedTerm]);

  const searchFunction = async (term: string): Promise<SearchResult[]> => {
    // Simulate an API call
    return [
      { id: 1, name: `Result for ${term}` },
      { id: 2, name: `Another result for ${term}` },
    ];
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search..." />
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
