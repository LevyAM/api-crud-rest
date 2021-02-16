const { Sequelize, Model } = require("sequelize");
const connection = require("../database/connection");

class User extends Model {

}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: connection,
    logging: false,
	defaultScope: {
		attributes: {}
	}
 }
);

User.sync({ force: false });

module.exports = User;


