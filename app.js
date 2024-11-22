const express = require('express');
const pool = require('./db.js');

const app = express();
app.use(express.json());


// Create a new collection
app.post('/api/collections', async (req, res) => {
  const { userId, name, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO collections (user_id, name, description) VALUES ($1, $2, $3) RETURNING *',
      [userId, name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error creating collection' });
  }
});

// Add a recommendation to a collection
app.post('/api/collections/:collectionId/recommendations', async (req, res) => {
  const { collectionId } = req.params;
  const { recommendationId } = req.body;

  try {
    const recommendation = await pool.query(
      'SELECT * FROM recommendations WHERE id = $1',
      [recommendationId]
    );

    if (!recommendation.rows.length) {
      return res.status(404).json({ error: 'Recommendation not found' });
    }

    const recommendationOwner = recommendation.rows[0].user_id;

    const collection = await pool.query(
      'SELECT * FROM collections WHERE id = $1',
      [collectionId]
    );

    if (!collection.rows.length) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    const collectionOwner = collection.rows[0].user_id;

    if (recommendationOwner !== collectionOwner) {
      return res.status(403).json({ error: 'You do not own this recommendation' });
    }

    await pool.query(
      'INSERT INTO collection_recommendations (collection_id, recommendation_id) VALUES ($1, $2)',
      [collectionId, recommendationId]
    );
    res.status(200).json({ message: 'Recommendation added' });
  } catch (err) {
    res.status(500).json({ error: 'Error adding recommendation to collection' });
  }
});

// Remove a recommendation from a collection
app.delete('/api/collections/:collectionId/recommendations/:recommendationId', async (req, res) => {
  const { collectionId, recommendationId } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM collection_recommendations WHERE collection_id = $1 AND recommendation_id = $2 RETURNING *',
      [collectionId, recommendationId]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: 'Recommendation not found in the collection' });
    }

    res.status(200).json({ message : 'Recommendation deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error removing recommendation from collection' });
  }
});

// View recommendations in a collection
app.get('/api/collections/:collectionId', async (req, res) => {
  const { collectionId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const collection = await pool.query(
      'SELECT * FROM collections WHERE id = $1',
      [collectionId]
    );

    if (!collection.rows.length) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    // Fetch paginated recommendations
    const recommendations = await pool.query(
      `SELECT r.* FROM collection_recommendations cr 
       JOIN recommendations r ON cr.recommendation_id = r.id 
       WHERE cr.collection_id = $1 
       LIMIT $2 OFFSET $3`,
      [collectionId, limit, offset]
    );

    res.status(200).json({
      collection: collection.rows[0],
      recommendations: recommendations.rows
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching recommendations for the collection' });
  }
});

// Delete a collection
app.delete('/api/collections/:collectionId', async (req, res) => {
  const { collectionId } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM collections WHERE id = $1 RETURNING *',
      [collectionId]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    res.status(200).json({ message : 'Collection deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error deleting collection' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
