# Getting Started With Ticket Management System Project

## Project Overview

The repository consist of backend and frontend, in backend which is build in python Django and frontend is build in ReactJs. The project is fully completed with the requirements mentioned. You can use existing data in the database or create from start. For that I'am attaching the credentials below.

Ticket Management System is a project where users can raise support ticket and initially the status will be open and they can see the list of tickets
they created in the dashboard. By clicking on individual ticket there will be options to update and delete the ticket. Also the options for sorting
the list of tickets based on Status and Priority. It is made sure that displaying the user's own tickets in User Dashboard.
In the Admin section, admin can list all tickets that all users created, delete ticket and update the status and assign it to any of the Users.
Custom User Permission is added for admin so, the api cannot be assessible for normal users.

### Credentials

Admin credentials
```username: "admin" password: "1111"```

User credentials
```username: "laserlad" password: "1111"```

If you face any issues with these credentials migrate the db and create new user from `/signup ` route

## In the project directory, backend set-up:

### `cd backend`

if environment setup is needed, run:

### `python -m venv env`

for activating virtual environment, run:

### `env/Scripts/activate`

install requirements.txt for required dependencies

### `pip install -r requirements.txt`

if migration not applied run:

### `python manage.py migrate`

After run backend application:

### `python manage.py runserver`

The project will run in "http://127.0.0.1:8000"
Use this to run frontend application and use as BASE_URL


## To set up the frontend project:

Navigate into the frontend project directory:
   
### `cd .\frontend\hatiotodo`

Install the required dependencies:

### `npm install`

Run application

## `npm start`

Navigate /login and sign in as user to create new ticket
sign in as admin to list all Tickets and other features.