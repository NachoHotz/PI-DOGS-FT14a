import server from './src/server.js';
import sequelize from './src/db/index.js';
import { envConfig } from './src/config/index.js';

const { API_PORT, NODE_ENV } = envConfig;

sequelize
  .sync({ force: NODE_ENV === 'development' ? true : false })
  .then(() => {
    console.log('Database connected successfully');
    server.listen(API_PORT, () => {
      console.log(`Server runnning on PORT ${API_PORT}`);
    });
  });
