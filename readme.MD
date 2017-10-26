# Star Wars Chronological

# Overview
Application built to make tracking what episodes of Clone Wars in Chronological order you've watched.

# Needed to work
variables.env
```
NODE_ENV=development
FACEBOOK_APP_ID=123459
FACEBOOK_APP_SECRET=1234598
```

## Todo 
* Add login authentication
* add login/logout page
* add /login /logout route
* add mongo database
* add mongoose schemas

User schema
  email
  name
  facebook user id


Episode Schema (120 entries per user)
  user_id: int
  chron_num: int,
  watched: boolean

## Mad Props to
https://www.reddit.com/r/StarWars/comments/31ij0p/the_clone_wars_in_chronological_order_w_links_to/

http://www.csvjson.com/csv2json