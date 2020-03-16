import React, { useEffect, useState } from "react";
import { graphql } from "react-apollo";
// import { getBooksQuery } from '../queries/queries';
import {
  ListGroup,
  Modal,
  Button,
  Form,
  InputGroup,
  Col
} from "react-bootstrap";
import { BookListWrapper, H2 } from "./styled";
import loGet from "lodash/get";
import { gql } from "apollo-boost";
import * as Yup from "yup";
import * as Formik from "formik";
import { useMutation } from "@apollo/react-hooks";

const ADD_BOOK = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const BOOK_LIST = gql`
  query 




`;

const schema = Yup.object({
  name: Yup.string().required(),
  genre: Yup.string().required(),
  authorId: Yup.string().required()
});

const BookList = props => {
  const [isShow, setShow] = useState(false);
  const [name, setName] = useState(undefined);
  const [genre, setGenre] = useState(undefined);
  const [authorId, setAuthorId] = useState(undefined);
  const [addBook, { data }] = useMutation(ADD_BOOK);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const displayBooks = () => {
    const { data } = props;
    const loading = loGet(data, ["loading"], false);
    const lengthBooks = loGet(data, ["books", "length"], 0);
    const books = loGet(data, ["books"], []);

    if (loading) {
      return <div>Loading books...</div>;
    } else {
      if (lengthBooks <= 0) {
        return <h2> No Data </h2>;
      } else {
        return books.map(book => {
          return (
            <ListGroup.Item key={`book_${loGet(book, ["id"])}`}>
              {" "}
              {loGet(book, ["name"])}
            </ListGroup.Item>
          );
        });
      }
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log("OK ");
    addBook({ variables: { name, genre, authorId } });
    handleClose();
  };

  return (
    <BookListWrapper>
      <div className="book-list-wrapper">
        <H2>Book List</H2>
        <ListGroup className="book-list">{displayBooks()}</ListGroup>
      </div>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                value={genre}
                onChange={e => setGenre(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  required
                  value={authorId}
                  onChange={e => setAuthorId(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </BookListWrapper>
  );
};

export default BookList;
