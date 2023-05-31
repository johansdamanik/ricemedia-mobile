'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsTo(models.Post, { foreignKey: 'postId' });
    }
  }
  Tag.init(
    {
      postId: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Tag name is required' },
          notEmpty: { msg: 'Tag name is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Tag',
    }
  );
  return Tag;
};
