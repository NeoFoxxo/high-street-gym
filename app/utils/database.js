import mysql from "mysql2/promise";

// create the database connection
const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'high-street-gym'
});

// export so that we can connect to the database from any file
export default db;