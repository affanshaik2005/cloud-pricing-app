import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRouter from './routes/api';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;