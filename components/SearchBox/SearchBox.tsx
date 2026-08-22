'use client';

import { useState } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    onSearch(value);
  };

  return (
    <input
      className={css.input}
      type="text"
      value={text}
      onChange={handleChange}
      placeholder="Search notes"
    />
  );
};
export default SearchBox;
