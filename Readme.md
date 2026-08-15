# Blog API

A RESTful Blog API built with Node.js, Express, MongoDB, and Mongoose. The project demonstrates practical backend development including RESTful routing, data modeling, validation, middleware, full-text search, and automated slug generation.

## Features

- Full CRUD operations for blog articles
- MongoDB integration with Mongoose
- Schema validation and timestamps
- Automatic slug generation from article titles
- MongoDB `$text` index for full-text search
- Search endpoint: `GET /articles/search?q=keyword`
- Request logging with method, URL, IP, status code, and response time
- Centralized error handling

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/articles` | Get all articles |
| GET | `/articles/:id` | Get an article |
| POST | `/articles` | Create an article |
| PATCH | `/articles/:id` | Update an article |
| DELETE | `/articles/:id` | Delete an article |
| GET | `/articles/search?q=keyword` | Search articles |

## Article Model

Articles support:

`title`, `slug`, `content`, `excerpt`, `author`, `category`, `tags`, `published`, `publishedAt`, `views`, `createdAt`, and `updatedAt`.

Slugs are automatically generated from article titles when not provided.

Example:

`Getting Started With Node.js`

becomes:

`getting-started-with-nodejs`

## Full-Text Search

MongoDB `$text` indexes enable keyword-based searches across fields such as title, content, excerpt, and tags.

```http
GET /articles/search?q=javascript