import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "../css/collections.css";
import fallbackImage from "../photo.svg";

/**
 * Display collections category
 * @param {collections} collections
 */
function Collections({ collections }) {
  return (
    <div className="container">
      {collections.length > 0 ? (
        collections.map(col => (
          <Fragment key={col.node.href}>
            <main>
              <p>{col.node.displayLabel}</p>
              <h6>Collection</h6>
            </main>
            <img
              className={
                col.node.imageUrl.length > 0 ? "avatar" : "avatar no-image"
              }
              src={
                col.node.imageUrl.length > 0 ? col.node.imageUrl : fallbackImage
              }
              alt="collection_image"
            />
          </Fragment>
        ))
      ) : (
        <h4>No result found </h4>
      )}
    </div>
  );
}

Collections.propTypes = {
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        displayLabel: PropTypes.string,
        href: PropTypes.string,
        imageUrl: PropTypes.string
      })
    })
  )
};

export default Collections;
