const Pool = require ("pg").Pool;

const pool = new Pool({
    user: "iihlcywiwuzkad",
    password: "37ecfd19f6464e24e28b882d94eed4fa60a3b14b65936e79c4f8f0d22a2a1bd4",
    host: "ec2-3-208-168-0.compute-1.amazonaws.com",
    port: 5432,
    database: "d60q90s1qbhtp4",
    ssl: {
        rejectUnauthorized: false
      }
});

module.exports = pool;