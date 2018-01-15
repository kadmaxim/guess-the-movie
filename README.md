# Guess the movie

Test your visual memory with a exciting game "Guess the movie".

Guess as many movies as possible, using only stills from them. <br/>
The game involves thousands of movies and tens of thousands of stills.<br/>
Who guesses more movies – will be the winner!<br/>

Good luck and success in the game!

**See demo:** [here](https://guess-movie.herokuapp.com/)

## How to start

1. $ `git clone <repo>`
2. $ `cd guess-the-movie`
3. $ `npm install`
4. Import `db.sql.zip` into MySQL DB
5. Set db-credentials in `app/config/db-client.js`
6. Start work on app ↓

### Different modes
* $ `npm run gulp` - to work on express part
* $ `npm run webpack` - to make changes in Vue part
* $ `npm start` - to work concurrently in 2 previous modes


## Project plan

### Sprint 1

* Selection of suitable modules
* Designing **DB** schema
* Defining the **APIs** / routes

### Sprint 2

* Setting up DB connection
* Implementation **CRUD** for the users
* Implementation **CRUD** for the movies

### Sprint 3

* Implementation authentication in app
* Making Login page

### Sprint 4

* Implementation the route for fetching all films
* Making Admin Page
* Implementation Main screen app

### Sprint 5

* Implementation the route for fetching top users
* Implementation the route for saving top users
* Implementation **TOP10** screen app

### Sprint 6

* Implementation the **update & delete films** admin page
* Making **Wiki**-documentation 
* Preparing app to deploy