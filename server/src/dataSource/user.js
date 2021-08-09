const { DataSource } = require("apollo-datasource");
const isEmail = require("isemail");

class UserAPI extends DataSource {
  constructor({ DB }) {
    super();
    this.DB = DB;
  }

  initialize(config) {
    this.context = config.context;
  }

  async findOrCreateUser({ email: emailArg } = {}) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email)) return null;
    const users = await this.DB.users.findOrCreate({ where: { email } });
    return users && users[0] ? users[0] : null;
  }
}

module.exports = UserAPI;
