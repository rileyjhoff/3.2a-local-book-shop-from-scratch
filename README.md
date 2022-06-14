# Template for Backend Express

The Golden Rule:
🦸 🦸‍♂️ Stop starting and start finishing. 🏁

If you work on more than one feature at a time, you are guaranteed to multiply your bugs and your anxiety.

## Scripts

| command                | description                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `npm start`            | starts the app - should only be used in production as changes will not get reloaded |
| `npm run start:watch`  | runs the app using `nodemon` which watches for changes and reloads the app          |
| `npm test`             | runs the tests once                                                                 |
| `npm run test:watch`   | continually watches and runs the tests when files are updated                       |
| `npm run setup-db`     | sets up the database locally                                                        |
| `npm run setup-heroku` | sets up the database on heroku                                                      |

# Local Book Shoppe

## Demo

[Book Shoppe Demo](https://alchemy-book-shoppe.herokuapp.com/)

### Learning Objectives

- Use a GET route in Express to retrieve a list of related resources from a Postgres database using a JOIN
- Use a POST route in Express to add new resources to a Postgres database

### Description

You’ve been hired by Bilbo’s Books, a local bookstore that’s in dire need of a better website. You’ve been assigned the task of building the store’s backend, which includes a database & API. The database will contain books and authors.

The relationship between books and authors should be `many-to-many` meaning each book can have many authors and each author can have written many books.

### Approach

1. Work vertically. That means build the tests, route and model for one entity/resource at a time. Horizontal would be building all the models first, then all the routes, then adding tests as an after-thought. Do **not** do that — go vertical!
2. Start with the entities/resources that don’t depend on other resources: `Book`, and `Author` and then add the join table

### Models (Entities/Resources)

- Author
- Book

## Database Schema Overview

The term “schema” refers to the organization of data as a blueprint of how the database is constructed (divided into database tables in the case of relational databases). [Source](https://en.wikipedia.org/wiki/Database_schema)

A schema is what defines the structure of a database and its tables. For this database, the schema has been defined below, using the following syntax:

- `<...>` is a placeholder for actual data.
- `S` = string, `D` = date, `N` = number, `I` = BIGINT
- Properties marked with `R` are required.
- `id` property omitted for clarity.

### Author (Many-to-Many with Book)

```js
{
  name: <name RS>,
  dob: <date-of-birth D>,
  pob: <place-of-birth S>
}
```

### Book (Many-to-Many with Author)

```js
{
  title: <title of book RS>,
  released: <4-digit year RN>
}
```

## Routes

Pick the set of routes that fit with your vertical slice.

#### GET

While the schemas should look like the data definitions above, these are descriptions of the data that should be returned from the various `GET` methods.

`GET /books`

```js
[{
    id, title, released
}]
```

`GET /books/:id`

```js
{
    title,
    released,
    authors: [{ id, name }], // author id and name
}
```

`GET /authors`

```js
[{ id, name }]
```

`GET /authors/:id`

```js
{
    name,
    dob,
    pob,
    books: [{
      id,
      title,
      released
    }]
}
```

#### POST

- POST: Books, Authors can be added.

### Acceptance Criteria

- User can get a list of Books
- User can get a list of Authors
- User can get a single Book
- User can get a single Author
- User can add a Book, and Author
- Jest tests exist for all the supported routes
- API is deployed to Heroku

### Rubric

| Task                                                        | Points |
| ----------------------------------------------------------- | ------ |
| GET `/books` route returns list of books                    | 2      |
| GET `/books/:id` route returns book detail with authors     | 2      |
| POST `/books` route adds a new book                         | 2      |
| Book routes properly delegate database work to the model    | 2      |
| All book routes tested                                      | 1      |
| Book routes built vertically                                | 1      |
| GET `/authors` route returns list of authors                | 2      |
| GET `/authors/:id` route returns author detail with books   | 2      |
| POST `/authors` route adds a new author                     | 2      |
| Authors routes properly delegate database work to the model | 2      |
| All author routes tested                                    | 1      |
| Authors routes built vertically                             | 1      |
