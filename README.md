# README #

Twitter #tag Grabber Responsive Dashboard Technical Documentation

Introduction : Twitter #tag Grabber Responsive Dashboard has been created in conjunction with Twitter Standard Search API and Bootstrap 3 & 4,TwitterOAuth Library and FusionCharts. 

Tweeter Standard Search API: Twitter Standard Search API returns a collection of relevant Twitts matching a specific query For reference please visit https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.

TwitterOAuth Library: It is the most popular PHP library for Twitter's OAuth REST API. For further information please visit https://twitteroauth.com/


Stepwise documentation for creating Twitter #tag Grabber



Step 1 - Getting the OAuth authentication access for the owner of the application for reference visit https://developer.twitter.com/en/docs/basics/authentication/guides/access-tokens
Step 2 - Create a PHP file and provide the authentication  token for the particular user credential there.
Step 3 -  Mention the Search query as shown below.
$data = json_encode((array)$twitter->get('https://api.twitter.com/1.1/search/tweets.json?q=%23'.$val.'&result_type=recent&count=100&include_entities=true'), true);
Step 4 - Perform the AJAX call from the dashboard.js for fetching the resultant twitter JSON data.
Step 5 - Fetch the values from the twitter JSON data source and convert it into FusionCharts prescribed JSON structure for rendering different charts.


### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)
 Twitter #tag Grabber Responsive Dashboard has been created in conjunction with Twitter Standard Search API and Bootstrap 3 & 4,TwitterOAuth Library and FusionCharts. 

version 1.0

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact