import { connect } from 'mongoose';
import { logger } from '../utils/logger';
import { MONGODB_URI } from '../utils/secret';
const mongoURI: string = MONGODB_URI;

const databaseConnect = async () => {
  try {
    await connect(mongoURI);
    logger.info('Database connection successful');
  } catch (error) {
    console.log(error);
    logger.fatal('Database connection error');
  }
};

export default databaseConnect;
