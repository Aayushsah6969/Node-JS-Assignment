import db from '../db.js';
import getDistance from '../utils/distance.js';

export const addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'School added successfully', id: result.insertId });
  });
};

export const listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

  db.query('SELECT * FROM schools', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const sortedSchools = results.map((school) => {
      const distance = getDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        school.latitude,
        school.longitude
      );
      return { ...school, distance };
    }).sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
  });
};