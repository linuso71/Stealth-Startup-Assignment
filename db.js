const { Pool } = require('pg');

// PostgreSQL connection setup
const pool = new Pool({
  connectionString: 'write-yourdatabase-string'
});


const createCollectionsTable = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS public.collections (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT collections_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users(id)
);
  
   CREATE TABLE IF NOT EXISTS public.collection_recommendations (
    id BIGSERIAL PRIMARY KEY,
    collection_id BIGINT NOT NULL,
    recommendation_id BIGINT NOT NULL,
    CONSTRAINT collection_recommendations_collection_id_fkey FOREIGN KEY (collection_id)
        REFERENCES public.collections(id),
    CONSTRAINT collection_recommendations_recommendation_id_fkey FOREIGN KEY (recommendation_id)
        REFERENCES public.recommendations(id)
);
    `;
    try {
        await pool.query(createTableQuery);
        console.log('Collections tables created successfully');
      } catch (err) {
        console.error('Error creating tables:', err);
        throw err;
      }
};

createCollectionsTable();
module.exports = pool;
