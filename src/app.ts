import express from 'express';

import studentRouter from './routes/student.routes';
import teacherRouter from './routes/teacher.routes';

import * as dotenv from 'dotenv';
import database from './common-services/database/database';
import roleCheckerMiddleware from './middleswares/roleChecker.middleware';

class App {
  public server;

  constructor() {
    this.server = express();

    dotenv.config({ path: `.env.${process.env.NODE_ENV}`, debug: true });
    
    this.provideDatabaseConnection();
    
    this.middlewares();
    this.routes();


  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(roleCheckerMiddleware);
  }

  routes() {
    this.server.use(studentRouter);
    this.server.use(teacherRouter);
    this.server.get('/', (req, res) => {
        res.status(200).send({ message: 'Welcome to the API' });
    });
  }

  async provideDatabaseConnection() {
    try {
        await database.connect(); // Establish the database connection
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit if the database connection fails
    }
  }
}

export default new App().server;