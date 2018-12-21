'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRoles = sequelize.define('user_roles', {
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {});
  UserRoles.associate = function(models) {
    // associations can be defined here
  };
  return UserRoles;
};