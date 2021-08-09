const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    todos(createdBy: ID!, page: Int = 1, pageSize: Int = 5): TodoCollection!
    todoById(id: ID!): Todo
  }

  type Mutation {
    login(email: String): User
    createTodo(
      title: String
      description: String
      dueDate: String
      createdBy: String
    ): Todo
    deleteTodo(id: ID!): String
    updateTodo(
      id: ID!
      title: String
      description: String
      dueDate: String
    ): [String]
  }

  type Todo {
    id: ID!
    title: String!
    description: String!
    dueDate: String!
    createdBy: User!
  }

  type TodoCollection {
    count: Int!
    page: Int
    itemsPerPage: Int
    hasMore: Boolean
    next: Int
    rows: [Todo]
  }

  type User {
    id: ID!
    email: String!
    token: String
  }
`;

module.exports = typeDefs;
