import React, { useState } from "react";
import PropTypes from "prop-types";
import "../css/searchbar.css";
import searchIcon from "../magnifying-glass.svg";
import loadingIcon from "../loading-indicator.svg";
import cancelIcon from "../clear.svg";

function SearchBar({ loading, searchTerm }) {
  const [term, setTerm] = useState("");

  // controlled input
  const onInputChange = ({ target: { value } }) => {
    setTerm(value);
  };

  // fire query with the term submitted
  const onSearchSubmit = e => {
    e.preventDefault();
    if (term.length > 0) {
      searchTerm(term);
    }
  };

  // clear the term
  const onClearTerm = () => {
    setTerm("");
  };

  return (
    <div>
      <form onSubmit={onSearchSubmit} className="ui form">
        <img
          className={term.length > 0 ? "search with-text" : "search"}
          src={searchIcon}
          alt="search-icon"
          onClick={onSearchSubmit}
        />
        {loading ? (
          <img className="loading" src={loadingIcon} alt="loading-icon" />
        ) : term ? (
          <img
            className="cancel"
            src={cancelIcon}
            alt="cancel-icon"
            onClick={onClearTerm}
          />
        ) : null}
        <input
          className={term.length > 0 ? "input-with-text" : "input-no-text"}
          value={term}
          onChange={onInputChange}
          type="text"
          placeholder="Search by artist, gallery, style, theme, tag etc."
        />
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  loading: PropTypes.bool,
  searchTerm: PropTypes.func
};

export default SearchBar;
