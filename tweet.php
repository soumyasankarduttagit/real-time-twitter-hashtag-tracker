<?php
require 'lib/twitteroauth.php';

$consumer = "1r556HjZ7fQ6mUYbpCWcVrcST";
$consumersecret = "Tpjv02wJt8yy1ExCgwmXUk6kWDU3gAcdKWDlK9Ji8ialSz2NuT";
$accesstoken = "635591553-kVTaKh2G1hNPzFNdNsQSkTSenUx4m7xjWNH2MTYO";
$acesstokensecret = "9NzYsCUkCPD3xOc6EiFTErjF0lX6NeJK163av1Zef4XZD";

$twitter = new TwitterOAuth($consumer, $consumersecret, $accesstoken, $acesstokensecret);

$content = $twitter->get("account/verify_credentials");

$val = $_POST['Hashtag'];

if($val!=null) {
$data = json_encode((array) $twitter->get('https://api.twitter.com/1.1/search/tweets.json?q=%23' . $val . '&result_type=recent&count=100&include_entities=true'), true);
echo $data; 
} else { echo "No Input Received"; }

?>
