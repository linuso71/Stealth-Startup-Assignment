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

## **How to Import the Sample Data**

### **1. Access PostgreSQL**
Use a database client such as `psql`, `pgAdmin`, or any other preferred tool to connect to your PostgreSQL database.

### **2. Connect with Your db in db.js file**
In your database configuration, you'll use the Pool object from the pg library. Replace 'write-your-database-string' with your actual PostgreSQL connection string.

---

### **2. Import CSV Files**
Use the `\copy` command in `psql` or the import feature in a GUI-based client like `pgAdmin` to import the data.

#### **Command for Importing Data Using `psql`:**

```sql
\copy users(id, fname, sname, profile_picture, bio, created_at) FROM 'path/to/users.csv' DELIMITER ',' CSV HEADER;
\copy recommendations(id, user_id, title, caption, category, created_at) FROM 'path/to/recommendations.csv' DELIMITER ',' CSV HEADER;
```
Replace 'path/to/users.csv' and 'path/to/recommendations.csv' with the actual paths to the CSV files on your system.

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


