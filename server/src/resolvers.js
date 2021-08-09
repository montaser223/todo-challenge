const { extractPaginationInfo } = require("./utils");

const Query = {
  todos: async (_, { createdBy, page, pageSize }, { dataSources }) => {
    const todos = await dataSources.todoAPI.getTodos({
      createdBy,
      page,
      pageSize,
    });
    const result = extractPaginationInfo(todos, page, pageSize);
    return result;
  },
  todoById: async (_, { id }, { dataSources }) => {
    const todo = await dataSources.todoAPI.getTodoById({ id });
    return todo;
  },
};

const Mutation = {
  login: async (_, { email }, { dataSources }) => {
    const user = await dataSources.userAPI.findOrCreateUser({ email });
    if (user) {
      user.token = Buffer.from(email).toString("base64");
      return user;
    }
  },
  createTodo: async (
    _,
    { title, description, dueDate, createdBy },
    { dataSources }
  ) => {
    const todo = await dataSources.todoAPI.createNewTodo({
      title,
      description,
      dueDate,
      createdBy,
    });
    const savedTodo = await todo.save();
    return savedTodo;
  },
  deleteTodo: async (_, { id }, { dataSources }) => {
    const todo = await dataSources.todoAPI.deleteTodoById({ id });
    return todo;
  },

  updateTodo: async (
    _,
    { id, title, description, dueDate },
    { dataSources }
  ) => {
    const todo = await dataSources.todoAPI.updateTodoById({
      id,
      title,
      description,
      dueDate,
    });
    return todo;
  },
};

const resolvers = { Query, Mutation };

module.exports = resolvers;
