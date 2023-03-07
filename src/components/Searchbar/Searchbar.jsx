import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <span className={styles.buttonLabel}>Search</span>
        </button>

        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
