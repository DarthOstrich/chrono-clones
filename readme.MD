# Star Wars Chronological

## Overview
Application built to make tracking what episodes of Clone Wars in Chronological order you've watched.

### Needed to work
variables.env file, see variables.env.sample file

### Backend
#### The Main bits
* Node
* Express
* Pug
* Tons of packages - See the package.json

### Frontend
* I was lazy and built it in bootstrap 💩
* Sass (For the bits I did build)
* Webpack

### Deployment
Deployed to AWS Elastic Beanstalk but could probably work with heroku

## Todo 
* Forgot username/password stuff
* FB integration
* Okta Integration?
* add in 404

## Mad Props to

[Reddit](https://www.reddit.com/r/StarWars/comments/31ij0p/the_clone_wars_in_chronological_order_w_links_to/)

[CSV 2 JSON](http://www.csvjson.com/csv2json)

[learn node by Wes Bos](http://learnnode.com)

# Notes
To get rid of dev dependencies in production:
```
npm prune --production
```