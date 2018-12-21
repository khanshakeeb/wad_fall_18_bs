'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('categories', {
    category_name: DataTypes.STRING
  }, {});
  Categories.associate = function(models) {
    // associations can be defined here
  };
  return Categories;
};