import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "../css/articles.css";
import fallbackImage from "../photo.svg";

/**
 * Display articles category
 * @param {articles} props
 */
function Articles({ articles }) {
  return (
    <div className="container">
      {articles.length > 0 ? (
        articles.map(article => (
          <Fragment key={article.node.href}>
            <main>
              <p>{article.node.displayLabel}</p>
              <h6>Article</h6>
            </main>
            <img
              className={
                article.node.imageUrl.length > 0 ? "avatar" : "avatar no-image"
              }
              src={
                article.node.imageUrl.length > 0
                  ? article.node.imageUrl
                  : fallbackImage
              }
              alt="article_image"
            />
          </Fragment>
        ))
      ) : (
        <h4>No result found</h4>
      )}
    </div>
  );
}

Articles.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        displayLabel: PropTypes.string,
        href: PropTypes.string,
        imageUrl: PropTypes.string
      })
    })
  )
};

export default Articles;
