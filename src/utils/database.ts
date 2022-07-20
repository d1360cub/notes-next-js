import {Pool} from 'pg';

let connectDB: any;

if(!connectDB) {
  connectDB = new Pool({
    user: 'postgres',
    password: 'password',
    host: '127.0.0.1',
    database: 'notes_next',
  });
}

export {connectDB};
