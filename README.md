# Smart Brain API

This is the backend server for the Smart Brain application, which provides face detection functionality.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

- Node.js
- PostgreSQL

### Installing

1. Clone the repository:
```
git clone https://github.com/your-username/smart-brain-api.git
```

2. Install the dependencies:
```
cd smart-brain-api
npm install
```


3. Configure the database connection:

Update the `db` object in `server.js` with your PostgreSQL connection details.

4. Run the server:

```
npm start
```


The server should now be running on `http://localhost:10533`.

## API Endpoints

- `POST /signin`: User sign-in.
- `POST /register`: User registration.
- `GET /profile/:id`: Get user profile by ID.
- `PUT /image`: Update user image and increment entries count.

## Built With

- Node.js
- Express.js
- PostgreSQL
- Knex.js
- Bcrypt.js
- Cors

## Authors

- [Sanskar Sehgal](https://github.com/sans-sehgal)

## License

This project is licensed under the [MIT License](LICENSE).

