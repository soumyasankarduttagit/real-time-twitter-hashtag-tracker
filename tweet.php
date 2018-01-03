<?php
require_once('lib/twitteroauth.php');
?>
<?php
$consumer         = "gSZfOxGTyEjTcdWckXuwUZbZU";
$consumersecret   = "fFOH5ugRimTRijAkHBnXPI1Mc6TNtLiARldmcyS4kyMlAAn7FC";
$accesstoken      = "347677220-T39w4oRjoNn0XmeWogswjajbCQ5pyecQE6itbFhZ";
$acesstokensecret = "q0fiON6kIPe9WK7gYah28cqOhKbwC8RfyHXfoZIazDb80";
$twitter          = new TwitterOAuth($consumer, $consumersecret, $accesstoken, $acesstokensecret);
?>
<?php
$val = $_POST['Hashtag'];
;
$data = json_encode((array) $twitter->get('https://api.twitter.com/1.1/search/tweets.json?q=%23' . $val . '&result_type=recent&count=100&include_entities=true'), true);
echo $data;
?>