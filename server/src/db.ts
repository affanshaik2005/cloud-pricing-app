import sqlite3 from 'sqlite3';

export function openDb(): sqlite3.Database {
  const db = new sqlite3.Database('instance_prices.db', (err) => {
    if (err) {
      console.error('Error opening database:', err);
    } else {
      console.log('Database connected successfully');
    }
  });
  return db;
}