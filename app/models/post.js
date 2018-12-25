'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('posts', {
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    publishedat: DataTypes.DATE,
    deletedat: DataTypes.DATE
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.users, {foreignKey: 'user_id'})
  };
  return Post;
};