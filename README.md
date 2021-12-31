## Getting Started

```
npm install
npm run start:dev
```

## Prerequisite

To able to do this course, you must have knowledge on the following:

- NestJS
- Knowledge to create Model and store to MongoDB using Typegoose
- Hash Passwords (Argon2)
- NestJS Passport (Jwt) and Guards
- NestJS Cookies and Middleware
- MongoDB
- Postman

## Goal

Fix the following endpoints

```
# User
POST /api/user/register
POST /api/user/login
GET /api/user/logout

# Movie
POST /api/movie/create
GET /api/movie
DELETE /api/movie/delete/:id
```

## Objectives

1. Create Register endpoint to add User into the database
2. Hash the passwords that you will store in the database (see: [Hash Passwords](#hash-passwords))
3. Register JWT when password verification is successful
4. Store it in Cookies (Use middleware to store and retrieve 'user' data or decoded jwt from cookies)
5. Build Movie API endpoints to create, read and delete data in database
6. Create and implement Jwt Guard to restrict unregistered users from reading Movie data
7. Use Guards authorize a specific role (admin) to only delete the data
8. Add logout and delete the cookie

## Keep in mind the Dependencies

Assume you already run `npm install` then all of these dependencies are already installed

- [Typegoose Installation](#typegoose-installation)
- [Hash Passwords](#hash-passwords)
- [NestJs Passport](#nestjs-passport)
- [Cookies](#cookies)

### Typegoose Installation

Use to connect to MongoDB

```
npm i @nestjs/mongoose mongoose nestjs-typegoose @typegoose/typegoose
```

### Hash Passwords

Hide user's password before storing in database via hashing

```
npm install argon2
npm install -D @types/argon2 @types/node
```

### NestJS Passport

Use to create tokens

```
npm install @nestjs/passport passport
npm install @nestjs/jwt
npm install passport-jwt // your choice of strategy (e.g. passport-local, etc)
npm install -D @types/passport-jwt
```

### Cookies

Store tokens in Cookies and access middleware

```
npm install cookie-parser
npm install -D @types/cookie-parser
```

#### Misc

(UI) Angular template:

- https://github.com/lightzane/ui-nestjs-auth
