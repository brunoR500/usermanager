# User-manager webapp

## General

A simple web-based interface for managing users. Users have are saved in a relational database.

Used technologies:

- For front-end:
  - HTML, CSS, SCSS
  - React
  - MobX
  - Cypress (Testing)

- For back-end:
  - Node.js
  - PostgreSQL
  - Docker-compose
  - Jest (Testing)

Communication between front-end and back-end uses a REST-based API. The application contains several pages, described in the next sections.

## Pages

### Page: Index – List of users

The index page contain a list of users with the following columns:

- Customer number
- User name
- First name
- Last name
- Last login (format DD.MM.YYYY HH:MM:SS)
- Option to go to edit form
- Option to delete the user

A search form is integrated for finding users by a certain keyword in fields: customer number, user name, first name, last name and email address

The columns `customer number`, `user name`, `first name`, `last name` and `last login` are sortable (asc/desc).

The add-option to create a new user is integrated.

### Page: Add

This page have a form with following elements:

- Customer number (five digits)
- User name (value must be unique in the db, 3 - 30 chars, format: A-Za-z0-9)
- First name (2 - 150 chars)
- Last name (2 - 150 chars)
- Email address (valid email address, max. 300 chars)
- Date of birth (format: DD.MM.YYYY)
- Password (8 - 150 chars)
- Repeat Password

Only a valid form can be submitted. A success message is displayed after a form submission.

### Page: Edit

This page have a form with the following elements:

- Customer number (five digits)
- User name (read only)
- First name (2 - 150 chars)
- Last name (2 - 150 chars)
- Email address (valid email address, max. 300 chars)
- Date of birth (format: DD.MM.YYYY)
- Last login (read only, format: DD.MM.YYYY HH:MM:SS)
- Password (8 - 150 chars, field is optional)
- Repeat Password

Only a valid form can be submitted. A success message is displayed after a form submission.

