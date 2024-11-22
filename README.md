Collections API
This project implements a backend API for managing collections and their associated recommendations. The API allows users to create, manage, and retrieve collections of recommendations (e.g., movies, TV shows, songs). It is built with Node.js, Express, and uses PostgreSQL as the database.

Features
Create a New Collection

Endpoint: POST /api/collections
Allows users to create a new collection with a name and description.
Add a Recommendation to a Collection

Endpoint: POST /api/collections/:collectionId/recommendations
Adds a recommendation to a specific collection, ensuring the recommendation belongs to the user.
Remove a Recommendation from a Collection

Endpoint: DELETE /api/collections/:collectionId/recommendations/:recommendationId
Removes a recommendation from a specific collection.
View Recommendations in a Collection

Endpoint: GET /api/collections/:collectionId
Retrieves all recommendations in a specific collection, with support for pagination.
Delete a Collection

Endpoint: DELETE /api/collections/:collectionId
Deletes a specific collection and all its associated recommendations.
Error Handling

Graceful error handling for invalid input, missing data, and unauthorized access.
