# habit-app

## Description
Habit App website where registered user can add habits and track them; while also picking the preferred frequency and checking for streaks

![Recipe app](./habit.gif)

## Requirements

* Postgres account
## Getting Started
### Backend 
1. open psql shell

CREATE DATABASE habitdb

CREATE DATABASE habitdbtest

2. Create .env file in my-recipe.app folder 
```
DEVELOPMENT_URL=postgres://[your username]:[your password]@[port]/habitdb
TEST_URL=postgres://[your username]:[your password]@[port]/habitdbtest
```

3. On the terminal open root folder
```
npm install
```
4. 
```
knex migrate:latest
```
5. 
```
knex seed:run
```
6. 
```
npm start
```
### Frontend 
1. In another terminal open the habitapp folder, run...: 
```
npm install
```
2. 
```
npm start
```

## User Stories 
* As a user, I can register and login with my details 
* As a user, I can I can add an habit of my choice, by also picking the frequency and description category
* As a user, I can track my habits and tick them as completed for the day
* As a user, I can check my current and highest streak of my habit 
* As a user, I can delete my habit

## Main Technologies
* React js
* Node.js
* Jest & Enzyme
* Express.js
* bcrypt 
* Knex.js with pg 
* Mocha & Chai












