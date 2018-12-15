'use strict';
module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define('images', {
    imagename: DataTypes.STRING,
    imagepath: DataTypes.STRING,
    imagesize: DataTypes.DOUBLE,
    imagetype: DataTypes.STRING,
    originalpath: DataTypes.STRING
  }, {});
  images.associate = function(models) {
    // associations can be defined here
  };
  return images;
};