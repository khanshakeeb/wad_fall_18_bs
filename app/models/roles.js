'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    role_id: DataTypes.INTEGER,
    roleName: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {});
  roles.associate = function(models) {
    // associations can be defined here
  };
  return roles;
};