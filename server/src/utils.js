const { Sequelize } = require("sequelize");

const extractPaginationInfo = (todos, page, pageSize) => {
  const itemsPerPage = pageSize;
  const hasMore = page * pageSize < todos.count;
  const next = hasMore ? page + 1 : 0;
  return { ...todos, page, itemsPerPage, hasMore, next };
};

const createStore = () => {
  // connect to database
  const db = new Sequelize("todos", "montaser", "12345", {
    host: "localhost",
    dialect: "mariadb",
  });
  // create users table instance
  const users = db.define("user", {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    email: Sequelize.STRING,
  });
  // create todos table instance
  const todos = db.define("todo", {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    dueDate: Sequelize.STRING,
    createdBy: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
  return { db, users, todos };
};

const removeNullKeys = (todo) => {
  for (const key in todo) {
    // if there is no value delete key
    if (!todo[key]) delete todo[key];
  }
  console.log(todo);
  return todo;
};

module.exports = { extractPaginationInfo, createStore, removeNullKeys };
