const { DataSource } = require("apollo-datasource");
const { removeNullKeys } = require("../utils");
class TodoAPI extends DataSource {
  constructor({ DB }) {
    super();
    this.DB = DB.todos;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getTodos({ createdBy, page, pageSize }) {
    const todos = await this.DB.findAndCountAll({
      where: { createdBy },
      order: [["createdAt", "DESC"]],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    return todos;
  }

  async createNewTodo({ title, description, dueDate, createdBy } = {}) {
    try {
      return await this.DB.create({
        title,
        description,
        dueDate,
        createdBy,
      });
    } catch (error) {
      return error.message;
    }
  }

  async getTodoById({ id }) {
    const todo = await this.DB.findOne({ where: { id } });
    return todo;
  }

  async updateTodoById({ id, title, description, dueDate }) {
    const todo = removeNullKeys({ title, description, dueDate });
    const updatedTodo = await this.DB.update(todo, { where: { id } });
    console.log("updatedTodo", updatedTodo[0]);
    return updatedTodo;
  }

  async deleteTodoById({ id }) {
    const todo = await this.DB.destroy({ where: { id } });
    return todo;
  }
}

module.exports = TodoAPI;
