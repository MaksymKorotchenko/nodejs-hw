import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import { connextMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import notesRouter from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(logger);
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(notesRouter);

app.use(notFoundHandler);
app.use(errorHandler);

await connextMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
