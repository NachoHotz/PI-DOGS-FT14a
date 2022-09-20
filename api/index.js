import server from './src/server.js';
import sequelize from './src/db/index.js';
import { envConfig } from './src/config/index.js';

const { PORT, NODE_ENV } = envConfig;

sequelize
  .sync({ force: NODE_ENV === 'development' ? true : false })
  .then(() => {
    console.log('Database connected successfully');
    server.listen(PORT || 3001, () => {
      console.log(`Server runnning on PORT ${PORT}`);
    });
  });
