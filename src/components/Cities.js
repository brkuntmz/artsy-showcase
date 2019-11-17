import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "../css/cities.css";
import fallbackImage from "../photo.svg";

/**
 * Display cities category
 * @param {cities} cities
 */
function Cities({ cities }) {
  return (
    <div className="container">
      {cities.length > 0 ? (
        cities.map(city => (
          <Fragment key={city.node.href}>
            <main>
              <p>{city.node.displayLabel}</p>
              <h6>City</h6>
            </main>
            <img
              className={
                city.node.imageUrl.length > 0 ? "avatar" : "avatar no-image"
              }
              src={
                city.node.imageUrl.length > 0
                  ? city.node.imageUrl
                  : fallbackImage
              }
              alt="city_image"
            />
          </Fragment>
        ))
      ) : (
        <h4>No result found</h4>
      )}
    </div>
  );
}

Cities.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        displayLabel: PropTypes.string,
        href: PropTypes.string,
        imageUrl: PropTypes.string
      })
    })
  )
};

export default Cities;
