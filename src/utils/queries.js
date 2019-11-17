import { gql } from "apollo-boost";

export const GET_ARTIST_RESULTS = gql`
  query getSearchResults($query: String!, $entity: [SearchEntity]) {
    search(query: $query, first: 5, entities: $entity) {
      edges {
        node {
          displayLabel
          href
          imageUrl
        }
      }
    }
  }
`;
