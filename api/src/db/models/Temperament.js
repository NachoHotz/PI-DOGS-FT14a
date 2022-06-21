import { DataTypes } from 'sequelize';

export default (sequelize) => {
  sequelize.define(
    'temperament',
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false },
  );
};
