import { DataTypes } from 'sequelize';
import DogModel from './Dog.js';
import sequelize from '../index.js';

const TemperamentModel = sequelize.define(
  'temperament',
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false },
);

DogModel.belongsToMany(TemperamentModel, { through: 'dog_temperament' });
TemperamentModel.belongsToMany(DogModel, { through: 'dog_temperament' });

export default TemperamentModel;
