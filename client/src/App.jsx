import React, { useState } from 'react';

const articles = [
  { id: 1, title: 'Introduction to React', content: 'React is a JavaScript library for building user interfaces.' },
  { id: 2, title: 'Getting Started with React Hooks', content: 'React Hooks are functions that let you use state and other React features in functional components.' },
  { id: 3, title: 'React Components', content: 'Components are the building blocks of a React application.' },
];

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const countOccurrences = (text, term) => {
    const regex = new RegExp(term, 'gi');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
  };

  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => (
          part.toLowerCase() === highlight.toLowerCase()
            ? <mark key={index}>{part}</mark>
            : part
        ))}
      </span>
    );
  };

  const totalOccurrences = articles.reduce((count, article) => {
    return count + countOccurrences(article.title, searchTerm) + countOccurrences(article.content, searchTerm);
  }, 0);

  return (
    <div>
      <input
        type="text"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <p>{totalOccurrences} occurrence(s) found</p>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h3>{highlightText(article.title, searchTerm)}</h3>
            <p>{highlightText(article.content, searchTerm)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return (
    <div>
      <h1>Search</h1>
      <SearchBox />
    </div>
  );
}

export default App;
