# Dogspedia - SPA

![Logo](https://raw.githubusercontent.com/NachoHotz/Dogspedia/main/client/public/assets/dog.png)

Single Page application for the all dog lovers out there.

Builded using the PERN stack, and the [dogs api](https://thedogapi.com).

## Features

- See up to 8 dog breeds in a single page as cards with their name, image, and temperament.
- Pagination
- See the detail of a certain breed by clicking the image, where you can see the image, name, height and weight (in cm), life span, and temperaments.
- Filter the breeds by temperament and if they were created or not.
- Sort them by name ascendent and descendent, and by weight from lightest no heaviest and vice versa.
- Search for breeds that contain the searched term.
- Create your own breed.

### Tech Stack

**Front-end**: React, Redux.

**Back-end**: Node, Express, and PostgreSQL for the database.

## How to Run Locally

To run this project, first you will need to add the following environment variables to your .env file.

`API_KEY` - which you will get by creating an account on the [dogs api](https://thedogapi.com).

`DB_USER` - your database username.

`DB_PASSWORD` - your database password.

`DB_HOST`- the host where your database is located.

`DB_NAME`- the name of your database.

`DB_PORT` - the port from where your database is listening.

`API_PORT` - the port from where your api is listening

`NODE_ENV` - the Server current environment for good connection with the client

**NOTE**: You can also check the `.env.example` file to see envs example values.

#### The import and use of these environment variables is already done by the app

Then, follow the steps below:

---
Clone the project

```bash
git clone https://github.com/NachoHotz/Dogspedia.git
```

Go to the project directory

```bash
cd Dogspedia
```

Head to the api folder

```bash
cd api
```

Install dependencies

```bash
npm install
```

Do the same but with the client folder

```bash
cd client
npm install
```

Then, execute `npm start` on both folders to initialize the database, and the client to run the app.

## Screenshots

# This project is being updated

