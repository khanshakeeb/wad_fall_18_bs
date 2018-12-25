'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
   
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.INTEGER, 
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    first_name: DataTypes.STRING,
    last_name:DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.posts, { foreignKey: 'user_id'})
  };
  return User;
};