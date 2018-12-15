'use strict';
module.exports = (sequelize, DataTypes) => {
  const post_catagories = sequelize.define('post_catagories', {
    c_id: DataTypes.INTEGER
  }, {});
  post_catagories.associate = function(models) {
    // associations can be defined here
  };
  return post_catagories;
};