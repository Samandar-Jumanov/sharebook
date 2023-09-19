const DbUsers = require('./users');
const SharedCode = require('./shareCode');
const ProblemSolutions = require('./problemSolutions');
const Stars = require('../models/stars')
const GivenStars  = require('./givenStar');
const { Followers, Following } = require('./follow');



SharedCode.belongsTo(DbUsers, {
  foreignKey: 'userId',
});

DbUsers.hasMany(SharedCode, {
  foreignKey: 'userId',
  as: 'problems',
});

ProblemSolutions.belongsTo(SharedCode, {
  foreignKey: 'problemId',
});

SharedCode.hasMany(ProblemSolutions, {
  foreignKey: 'problemId',
  as: 'problemSolution',
});

ProblemSolutions.belongsTo(DbUsers, {
  foreignKey: 'userId',
});

DbUsers.hasMany(ProblemSolutions, {
  foreignKey: 'userId',
  as: 'userSolutions',
});



//Stars and Users 

Stars.belongsTo(DbUsers, {
  foreignKey :'userId'
})

DbUsers.hasMany(Stars , {
  foreignKey :'userId',
  as :'stars'
})


//Given stars 
GivenStars.belongsTo(DbUsers , {
  foreignKey :'userId',
})

DbUsers.hasMany(GivenStars , {
  foreignKey :'userId',
  as :'givenStars'
})



//Users and follow 

Followers.belongsTo(DbUsers , {
  foreignKey :'userId'
})

DbUsers.hasMany(Followers , {
  foreignKey :'userId', as :'followers'
})

Following.belongsTo(DbUsers , {
  foreignKey :'userId', as :'following'
})



module.exports = { DbUsers, SharedCode, ProblemSolutions , Stars };