# Dogspedia - SPA

![Logo](https://raw.githubusercontent.com/NachoHotz/Dogspedia/main/dog.png)

Single Page application for the all dog lovers out there.

Build using the PERN stack, and the [dogs api](https://thedogapi.com)

## Features

- See up to 8 dog breeds in a single page as cards with their name, image, and temperament
- Pagination
- See the detail of a certain breed by clicking the image, where you can see the image, name, height and weight (in cm), life span, and temperaments
- Filter the breeds by temperament and if they were created or not.
- Sort them by name ascendent and descendent, and by weight from lightest no heaviest and vice versa
- Search for breeds that contain the searched term
- Create your own breed.

### Tech Stack

**Front-end**: React, Redux

**Back-end**: Node, Express, and PostgreSQL for the database

## How to Run Locally

To run this project, first you will need to add the following environment variables to your .env file

`API_KEY` - which you will get by creating an account on the [dogs api](https://thedogapi.com)

Then, follow the steps below

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

Then, execute `npm start` on both folders to initialize the database, and the client to run the app

### Screenshots (work is still in progress in terms of CSS style)

#### Landing Page

![landing](https://user-images.githubusercontent.com/72778896/130497918-0bd147cf-2c6a-41f1-b2eb-e78f70cf7496.jpg)

#### Home Page

![home2](https://user-images.githubusercontent.com/72778896/130499340-b3e89b7d-b3a0-4b02-94b2-cb7fd97727bf.jpg)

#### Detail Page

![detail](https://user-images.githubusercontent.com/72778896/130498004-b3cc7baa-1bb9-428b-b882-426eeb3676e3.jpg)

#### Create page

![create](https://user-images.githubusercontent.com/72778896/130498042-2c12f68f-41da-423b-b8c0-96eacbfe61b1.jpg)
