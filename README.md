# Real-time Twitter hashtag tracker

## Overview
Know what’s trending, what’s going viral, and which post could use a boost with our real-time hashtag performance tracker. Map how your social media campaign is doing, right now, with full visibility over tweets, retweets, active hours, and active regions. We offer a simplified GUI with mobile support, for at-a-glance insights.

## Features
* Keep an eye on hourly activity, from the start of the day to ‘right now’.
* Know exactly which area is displaying most activity and change your ad campaigns accordingly.
* Leverage real-time insights to create accurate reports on performance.
* Benchmark how your competitors are doing with universal search for any hashtag.

## Technologies used
* PHP
* JavaScript
* Bootstrap
* Twitter Standard Search API Twitter Standard Search API returns a collection of relevant Twitts   matching a specific query For reference please visit
  https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.
* TwitterOAuth Library: It is the most popular PHP library for Twitter's OAuth REST API. For
  further information please visit https://twitteroauth.com/


## Products from FusionCharts used:
* FusionCharts XT
* FusionMaps XT

## Installation
Please follow the given below steps to install this dashboard:

* Clone the repository : 
 `git clone https://Soumya_Dutta@bitbucket.org/Soumya_Dutta/tweitter-hashgrabber.git`
* Run the application via any local server

## Usage 

* Getting the OAuth authentication access for the owner of the application for reference visit
  https://developer.twitter.com/en/docs/basics/authentication/guides/access-tokens
* Create a PHP file and provide the authentication  token for the particular user credential
  there.
* Mention the Search query as shown below.
  $data = json_encode((array)$twitter->get('https://api.twitter.com/1.1/search/tweets.json?q=%23'.$val.'&result_type=recent&count=100&include_entities=true'), true);
* Perform the AJAX call from the dashboard.js for fetching the resultant twitter JSON data.
* Fetch the values from the twitter JSON data source and convert it into FusionCharts prescribed    JSON structure for rendering different charts.

## Contribution

If you are interested in contributing to this dashboard, please follow the steps mentioned below:


* Clone the repository : 
 `git clone git@bitbucket.org:ayanbhadury/technology-dashboard.git`
* Fork out a separate branch.
* Make changes.
* Send PR.

## Support 

For any queries or reporting issues please write to us at [FusionCharts Support](support@fusioncharts.com>).
You can also chat with our technical specialists on our website [https://www.fusioncharts.com](https://www.fusioncharts.com).