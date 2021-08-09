const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const { createStore } = require("./utils");

// creates a sequelize connection once. NOT for every request
const DB = createStore();

const UserAPI = require("./dataSource/user");
const TodoAPI = require("./dataSource/todo");

const dataSources = () => ({
  userAPI: new UserAPI({ DB }),
  todoAPI: new TodoAPI({ DB }),
});

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

// run server
server.listen().then(() => {
  console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/sandbox
    `);
});
