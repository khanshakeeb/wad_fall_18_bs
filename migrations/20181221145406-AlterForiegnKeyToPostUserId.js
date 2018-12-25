'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var sequelize = queryInterface.sequelize;
    return sequelize.transaction(function (t) {
      var migrations = [];
      migrations.push(queryInterface.addConstraint('posts', ['user_id'], {
        type: 'foreign key',
        name: 'user_id_fkey_constraint_name',
        references: { //Required field
          table: 'users',
          field: 'id'
        }
      }));
      return Promise.all(migrations);
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   //queryInterface.removeConstraint(tableName, constraintName)
   var sequelize = queryInterface.sequelize;
    return sequelize.transaction(function (t) {
      var migrations = [];
      migrations.push(queryInterface.removeConstraint('posts', 'user_id_fkey_constraint_name'));
      return Promise.all(migrations);
    });
  }
};
