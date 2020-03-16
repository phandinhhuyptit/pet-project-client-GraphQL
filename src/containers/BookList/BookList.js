import { compose } from "recompose";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import BookList from "../../components/BookList";

const buildQuery = gql`
  {
    books {
      id
      name
      genre
    }
  }
`;
const withGraphql = graphql(buildQuery, {
  options: props => {
    return {
      fetchPolicy: "no-cache"
    };
  }
});

export default compose(withGraphql)(BookList);
