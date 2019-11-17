import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "../css/artworks.css";
import fallbackImage from "../photo.svg";

/**
 * Display artworks category
 * @param {artworks} artworks
 */
function Artworks({ artworks }) {
  return (
    <div className="container">
      {artworks.length > 0 ? (
        artworks.map(artwork => (
          <Fragment key={artwork.node.href}>
            <main>
              <p>{artwork.node.displayLabel}</p>
              <h6>Artwork</h6>
            </main>
            <img
              className={
                artwork.node.imageUrl.length > 0 ? "avatar" : "avatar no-image"
              }
              src={
                artwork.node.imageUrl.length > 0
                  ? artwork.node.imageUrl
                  : fallbackImage
              }
              alt="artwork_image"
            />
          </Fragment>
        ))
      ) : (
        <h4>No result found</h4>
      )}
    </div>
  );
}

Artworks.propTypes = {
  artworks: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        displayLabel: PropTypes.string,
        href: PropTypes.string,
        imageUrl: PropTypes.string
      })
    })
  )
};

export default Artworks;
