const {DataTypes } = require('sequelize')
const sequelize = require('../utils/db')


const Users = sequelize.define('users', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true ,
        primaryKey : true 
    },
    username : {
        type : DataTypes.STRING ,
        allowNull : false ,
        unique : true 
    },
    password : {
        type : DataTypes.STRING ,
        allowNull : false 
    }, 
    token :
    {
       type: DataTypes.STRING ,
       allowNull : false 
    }
})


const SharedProblems = sequelize.define('sharedProblems', {
    id : {
         type : DataTypes.INTEGER ,
         autoIncrement : true 
    },
    problem : {
         type : DataTypes.STRING ,
         allowNull : false 
    },
    problemCreator : {
        type : DataTypes.STRING ,
        allowNull : false 
    },
    isSolved : {
         type :DataTypes.BOOLEAN,
         allowNull : false 
    }
})


module.exports = {
    Users,
    SharedProblems
}