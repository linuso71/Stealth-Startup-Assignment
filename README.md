# **Collections API**

This project implements a backend API for managing collections and their associated recommendations. The API allows users to create, manage, and retrieve collections of recommendations (e.g., movies, TV shows, songs). It is built with **Node.js**, **Express**, and uses **PostgreSQL** as the database.

---

## **Features**

1. **Create a New Collection**
   - Allows users to create a new collection with a name and description.

2. **Add a Recommendation to a Collection**
   - Adds a recommendation to a specific collection, ensuring the recommendation belongs to the user.

3. **Remove a Recommendation from a Collection**
   - Removes a recommendation from a specific collection.

4. **View Recommendations in a Collection**
   - Retrieves all recommendations in a specific collection, with support for pagination.

5. **Delete a Collection**
   - Deletes a specific collection and all its associated recommendations.

6. **Error Handling**
   - Graceful error handling for invalid input, missing data, and unauthorized access.

---

# **Installation**

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_directory>

# **Setup Instructions**

## **Install Dependencies**

Run the following command to install the required dependencies:

```bash
npm install
```

## **Run the Application**

```bash
node index.js


