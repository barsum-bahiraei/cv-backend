import 'reflect-metadata';

import application from './application';
import * as http from 'http';
import dotenv from 'dotenv';

dotenv.config();
const PORT: string | number = process.env.PORT || 3000;

const app = http.createServer(application.instance);

app.listen(PORT, () => {
  console.log(`Server is listening on :${PORT}`);
});
