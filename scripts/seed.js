import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfigPath = path.join(__dirname, '../database.yaml');
const dbConfig = yaml.load(fs.readFileSync(dbConfigPath, 'utf8'));

const {
  'sqlite_path': sqlitePath,
} = dbConfig;

const db = new sqlite3.Database(sqlitePath);

const employees = [
  {
    full_name: 'Patrick Tiwa',
    email: 'patricktiwa@gmail.com',
    phone_number:'+237 689483754',
    date_of_birth:'04-23-1990',
    job_title : 'Web Designer',
    departement: 'Design',
    start_date:'04-03-2022'
  },
  {
    full_name: 'Jane Smith',
    email: 'janesmith@gmail.com',
    phone_number:'+237 655489754',
    date_of_birth:'12-03-1999',
    job_title : 'Web Developer',
    departement: 'Development',
    start_date:'10-23-2024'
  },
  {
    full_name: 'Alice Johnson',
    email: 'alicejohnson@gmail.com',
    phone_number:'+237 695489554',
    date_of_birth:'02-23-2002',
    job_title : 'Community Manager',
    departement: 'Marketing',
    start_date:'08-31-2025'
  },
];

const timesheets = [
  {
    employee_id: 1,
    title:'Figma design for mobile App',
    start_time: '2025-02-10 08:00:00',
    end_time: '2025-02-10 17:00:00',
  },
  {
    employee_id: 2,
    title:'Code payement gateway',
    start_time: '2025-02-11 12:00:00',
    end_time: '2025-02-11 17:00:00',
  },
  {
    employee_id: 3,
    title:'Make posts',
    start_time: '2025-02-12 07:00:00',
    end_time: '2025-02-12 16:00:00',
  },
  {
    employee_id: 2,
    title:'Integrate payement module',
    start_time: '2025-02-12 08:00:00',
    end_time: '2025-02-12 17:00:00',
  },
  {
    employee_id: 3,
    title:'Prospect clients',
    start_time: '2025-02-13 07:00:00',
    end_time: '2025-02-13 16:00:00',
  },
];


const insertData = (table, data) => {
  const columns = Object.keys(data[0]).join(', ');
  const placeholders = Object.keys(data[0]).map(() => '?').join(', ');

  const insertStmt = db.prepare(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`);

  data.forEach(row => {
    insertStmt.run(Object.values(row));
  });

  insertStmt.finalize();
};

db.serialize(() => {
  insertData('employees', employees);
  insertData('timesheets', timesheets);
});

db.close(err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Database seeded successfully.');
  }
});

