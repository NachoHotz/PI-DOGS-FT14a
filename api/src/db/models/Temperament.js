import { DataTypes } from 'sequelize';
import { sequelize, DogModel } from '../index.js';

const TemperamentModel = sequelize.define(
  'temperament',
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false },
);

// set many-to-many relationship
TemperamentModel.belongsToMany(DogModel, { through: 'dog_temperament' });

export default TemperamentModel;
