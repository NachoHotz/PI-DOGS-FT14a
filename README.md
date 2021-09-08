# Dogspedia - SPA

![Logo](https://raw.githubusercontent.com/NachoHotz/Dogspedia/main/dog.png)

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

### Screenshots (work is still in progress in terms of CSS style)

#### Landing Page

![Landing](https://user-images.githubusercontent.com/72778896/132437674-45b0dd69-d5b8-436f-9b2f-3761f49c549e.jpg)

#### Home Page

![Home](https://user-images.githubusercontent.com/72778896/132437689-275649f2-250c-4abb-9caf-5c5987bca08e.jpg)

#### Detail Page

![Detail](https://user-images.githubusercontent.com/72778896/132437708-c86c8b62-caf0-4867-8a60-85e655b5786e.jpg)

#### Create page

![Create form](https://user-images.githubusercontent.com/72778896/132437721-da688eb4-c627-4d07-bba2-d73aae4e1e67.jpg)
