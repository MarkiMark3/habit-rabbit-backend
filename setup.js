import 'dotenv/config';
import './src/models/user.js';
import './src/models/Token.js';
import './src/models/habits.js';
import './src/models/todo.js';
import { client } from './src/utils/db.js';

client.sync({ force: true });
