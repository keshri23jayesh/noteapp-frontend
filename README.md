# Note-Taking Application Frontend

This is the frontend application for the Note-Taking Application. It provides a user interface for user registration, login, and managing notes.

## Features

- User registration and login
- Create, read, update, and delete notes
- User authentication with JWT
- Error handling and form validation

## Technologies

- React
- TypeScript
- Axios for HTTP requests
- React Router for navigation

## Getting Started

### Prerequisites

- Node.js
- Backend service

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/keshri23jayesh/noteapp-frontend
    cd noteapp-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```env
    REACT_APP_API_URL=http://localhost:3000
    ```

4. Start the development server:
    ```bash
    npm start
    ```

### Usage

1. Register a new user by filling out the registration form.
2. Log in with the registered user credentials.
3. Create, read, update, and delete notes.
4. Search for notes using the search bar.

### Component Structure

- **App.tsx:** Main component that sets up routes.
- **components:**
  - **Login.tsx:** Component for user login.
  - **Register.tsx:** Component for user registration.
  - **NoteList.tsx:** Component for listing notes.
  - **NoteItem.tsx:** Component for individual note item.

### API Requests

All API requests are made using Axios. The base URL is set in the `.env` file.

### Testing

- Run the tests:
    ```bash
    npm test
    ```

### Example Requests and Responses

#### User Registration

- **URL:** `/register`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "username": "username",
        "email": "user@example.com",
        "password": "password123"
    }
    ```

#### User Login

- **URL:** `/login`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "username": "username",
        "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "token": "jwt_token"
    }
    ```

#### Create Note

- **URL:** `/notes`
- **Method:** `POST`
- **Headers:**
    ```json
    {
        "Authorization": "Bearer jwt_token"
    }
    ```
- **Body:**
    ```json
    {
        "title": "Note Title",
        "body": "Note Body",
        "tags": ["tag1", "tag2"]
    }
    ```
- **Response:**
    ```json
    {
        "id": "note_id",
        "title": "Note Title",
        "body": "Note Body",
        "tags": ["tag1", "tag2"],
        "userId": "user_id"
    }
    ```
