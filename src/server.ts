import express from 'express';
import { connectToDatabase } from './db/connection';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let db: any;

// Connect to the database before starting the Express server
connectToDatabase()
  .then((database) => {
    db = database;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  });

// Sample route
app.get('/api/races', async (req, res) => {
  try {
    const races = await db.collection('races').find().toArray();
    res.json({ races: races.map(race => race.name) });
  } catch (error) {
    console.error('Error fetching races:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add more routes here for other API endpoints