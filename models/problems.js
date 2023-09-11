const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const { Solutions } = require('./solutions');
const {Users} = require('./users')

const SharedProblems = sequelize.define('sharedProblems', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    problem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    problemCreator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSolved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

SharedProblems.belongsTo(Users, { foreignKey: 'userId' });
// SharedProblems.hasMany(Solutions, { as :'solutions'})


module.exports = {
    SharedProblems

}