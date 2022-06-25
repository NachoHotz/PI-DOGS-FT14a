import server from './src/server.js';
import sequelize from './src/db/index.js';
import './src/db/index.js';

import config from './src/lib/config.js';

const { API_PORT, NODE_ENV } = config;

// Syncing all the models at once.
sequelize
  .sync({ force: NODE_ENV === 'development' ? true : false })
  .then(() => {
    console.log('Database connected successfully');
    server.listen(API_PORT, () => {
      console.log(`Server runnning on PORT ${API_PORT}`); // eslint-disable-line no-console
    });
  });
