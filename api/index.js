import server from './src/app.js';
import { sequelize } from './src/db/index.js';

import config from './src/lib/config.js';

const { API_PORT } = config;

// Syncing all the models at once.
sequelize.sync({ force: true }).then(() => {
  console.log('Database synced successfully');
  server.listen(API_PORT, () => {
    console.log(`Server runnning on PORT ${API_PORT}`); // eslint-disable-line no-console
  });
});
