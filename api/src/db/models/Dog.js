/* eslint-disable no-unused-vars */
import { DataTypes, Sequelize } from 'sequelize';
import { sequelize, TemperamentModel } from '../index.js';

const DogModel = sequelize.define(
  'dog',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height: {
      type: DataTypes.JSONB,
      allowNull: false,
    },

    weight: {
      type: DataTypes.JSONB,
      allowNull: false,
    },

    life_span: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.JSONB,
    },
  },
  { timestamps: false },
);

// set many-to-many relationship
DogModel.belongsToMany(TemperamentModel, { through: 'dog_temperament' });

export default DogModel;
