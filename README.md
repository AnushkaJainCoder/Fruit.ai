
# Fruit.ai

For frontend:
https://github.com/user-attachments/assets/7c8f6250-fef3-446c-ad30-fbe76f2c6928

For backened:
https://github.com/user-attachments/assets/9f768885-4eba-40de-b63c-fe4698f61f07


Fruit.ai is a platform that leverages artificial intelligence to analyze and provide insights on various types of fruit. It includes features such as ripeness estimation, nutritional information, and more. This README provides detailed instructions on setting up and running the project, understanding its structure, and the design decisions behind it.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Documentation](#api-documentation)
6. [Project Structure](#project-structure)
7. [Design Decisions](#design-decisions)
8. [Contributing](#contributing)

## Project Overview

Fruit.ai is a web-based application built using Flask and provides an API for managing FAQs related to the platform. The API supports CRUD operations (Create, Read, Update, Delete) for FAQs.

## Features

- **Get All FAQs:** Retrieve a list of all FAQs.
- **Get FAQ by ID:** Retrieve details of a specific FAQ by its ID.
- **Add FAQ:** Add a new FAQ to the system.
- **Update FAQ:** Update an existing FAQ based on its ID.
- **Delete FAQ:** Delete an FAQ based on its ID.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/AnushkaJainCoder/Fruit.ai-backened-.git
   cd Fruit.ai-backened-
   ```

2. **Set Up a Virtual Environment:**

   ```bash
   python -m venv venv
   ```

3. **Activate the Virtual Environment:**

   - On Windows:
     ```bash
     venv\Scripts\activate
     ```

   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

   Ensure `requirements.txt` includes necessary packages like `Flask`, `flask-cors`, etc.

## Usage

1. **Run the Application:**

   To run the Flask development server, use:

   ```bash
   python app.py
   ```

   For production use, you can run it with `gunicorn`:

   ```bash
   gunicorn app:app
   ```

2. **Access the Application:**

   Open your web browser and go to `http://localhost:5000` to access the API.

## API Documentation

### Get All FAQs

- **Endpoint:** `GET /faqs`
- **Description:** Retrieves a list of all FAQs.
- **Response:**
  ```json
  [
      {"id": 1, "question": "What is Fruit.ai?", "answer": "Fruit.ai is..."},
      ...
  ]
  ```

### Get FAQ by ID

- **Endpoint:** `GET /faqs/<int:faq_id>`
- **Description:** Retrieves a specific FAQ by ID.
- **Response:**
  ```json
  {"id": 1, "question": "What is Fruit.ai?", "answer": "Fruit.ai is..."}
  ```
- **Error Response:**
  ```json
  {"error": "FAQ not found"}
  ```

### Add FAQ

- **Endpoint:** `POST /faqs`
- **Description:** Adds a new FAQ.
- **Request Body:**
  ```json
  {"question": "What is the service?", "answer": "The service is..."}
  ```
- **Response:**
  ```json
  {"id": 9, "question": "What is the service?", "answer": "The service is..."}
  ```

### Update FAQ

- **Endpoint:** `PUT /faqs/<int:faq_id>`
- **Description:** Updates an existing FAQ.
- **Request Body:**
  ```json
  {"question": "Updated question?", "answer": "Updated answer"}
  ```
- **Response:**
  ```json
  {"id": 1, "question": "Updated question?", "answer": "Updated answer"}
  ```

### Delete FAQ

- **Endpoint:** `DELETE /faqs/<int:faq_id>`
- **Description:** Deletes an FAQ by ID.
- **Response:** `204 No Content`

## Project Structure

- `app.py`: The main Flask application file that defines the API endpoints.
- `requirements.txt`: Contains the list of Python packages required for the project.
- `README.md`: This file, which provides documentation and instructions.

## Design Decisions

- **Flask Framework:** Chosen for its simplicity and ease of use for building RESTful APIs.
- **CORS:** Enabled to allow requests from different origins, facilitating cross-origin resource sharing.
- **In-Memory Storage:** Using a list for FAQs for simplicity. For a production environment, consider integrating a database.

## Contributing

If you want to contribute to the project, please fork the repository and create a pull request with your changes. Ensure to include tests and documentation for your contributions.
