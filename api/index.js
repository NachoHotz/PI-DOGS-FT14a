import server from './src/server.js';
import sequelize from './src/v1/db/index.js';
import { envConfig } from './src/v1/config/index.js';
import './src/v1/db/index.js';

const { API_PORT, NODE_ENV } = envConfig;

// Syncing all the models at once.
sequelize
  .sync({ force: NODE_ENV === 'development' ? true : false })
  .then(() => {
    console.log('Database connected successfully');
    server.listen(API_PORT, () => {
      console.log(`Server runnning on PORT ${API_PORT}`);
    });
  });
