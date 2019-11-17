import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "../css/artists.css";
import fallbackImage from "../photo.svg";

/**
 * Display artists category
 * @param {artists} artists
 */
function Artists({ artists }) {
  return (
    <div className="container">
      {artists.length > 0 ? (
        artists.map(artist => (
          <Fragment key={artist.node.href}>
            <main>
              <p>{artist.node.displayLabel}</p>
              <h6>Artist</h6>
            </main>
            <img
              className={
                artist.node.imageUrl.length > 0 ? "avatar" : "avatar no-image"
              }
              src={
                artist.node.imageUrl.length > 0
                  ? artist.node.imageUrl
                  : fallbackImage
              }
              alt="artist_image"
            />
          </Fragment>
        ))
      ) : (
        <h4>No result found</h4>
      )}
    </div>
  );
}

Artists.propTypes = {
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        displayLabel: PropTypes.string,
        href: PropTypes.string,
        imageUrl: PropTypes.string
      })
    })
  )
};

export default Artists;
