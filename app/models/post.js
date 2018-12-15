'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    pid: DataTypes.INTEGER,
    status: DataTypes.STRING,
    uid: DataTypes.INTEGER,
    publishedat: DataTypes.DATE,
    deletedat: DataTypes.DATE
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};