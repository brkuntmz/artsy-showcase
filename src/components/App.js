import React, { useState } from "react";
import { GET_ARTIST_RESULTS } from "../utils/queries";
import SearchBar from "./SearchBar";
import { useLazyQuery } from "@apollo/react-hooks";
import Artists from "./Artists";
import Articles from "./Articles";
import Artworks from "./Artworks";
import Cities from "./Cities";
import Collections from "./Collections";

const categories = [
  { id: 0, name: "Artists" },
  { id: 1, name: "Artworks" },
  { id: 2, name: "Articles" },
  { id: 3, name: "Cities" },
  { id: 4, name: "Collections" }
];

const App = ({ client }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryIdx, setCategoryIdx] = useState(0);
  // apollo hooks for lazily fire queries
  const [getSearchResult, { loading, data }] = useLazyQuery(GET_ARTIST_RESULTS);

  const onSearch = async term => {
    //fire initial api request
    setSearchTerm(term);
    getSearchResult({ variables: { query: term, entity: ["ARTIST"] } });
    // select artists category
    setCategoryIdx(0);
  };

  const onCategorySelected = id => {
    // Consecutive requests based on specific entity
    // For the purpose of lazy loading, it's better to load them on demand
    // because the result set can be long in reality (even though we're limiting it manually to 5)
    // for consecutive selections on the same category will be retrieved from cache
    // thanks to Apollo and prevent multiple requests
    if (id === 0) {
      getSearchResult({ variables: { query: searchTerm, entity: ["ARTIST"] } });
    } else if (id === 1) {
      getSearchResult({
        variables: { query: searchTerm, entity: ["ARTWORK"] }
      });
    } else if (id === 2) {
      getSearchResult({
        variables: { query: searchTerm, entity: ["ARTICLE"] }
      });
    } else if (id === 3) {
      getSearchResult({ variables: { query: searchTerm, entity: ["CITY"] } });
    } else if (id === 4) {
      getSearchResult({
        variables: { query: searchTerm, entity: ["COLLECTION"] }
      });
    }
    // set selected category idx
    setCategoryIdx(id);
  };

  return (
    <div className="resultContainer">
      <SearchBar searchTerm={onSearch} loading={loading} />
      {(searchTerm || loading) && (
        <div className="resultList">
          <ul>
            {categories.map((li, index) => (
              <li
                className={categoryIdx === index ? "selected" : null}
                onClick={_ => onCategorySelected(li.id)}
                key={li.id}
              >
                {li.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {data && data.search && (
        <>
          <div className="resultList">
            {categoryIdx === 0 && <Artists artists={data.search.edges} />}
            {categoryIdx === 1 && <Artworks artworks={data.search.edges} />}
            {categoryIdx === 2 && <Articles articles={data.search.edges} />}
            {categoryIdx === 3 && <Cities cities={data.search.edges} />}
            {categoryIdx === 4 && (
              <Collections collections={data.search.edges} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
