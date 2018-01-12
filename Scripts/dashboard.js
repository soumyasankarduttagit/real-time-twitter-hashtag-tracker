$(document).ready(function() {
  var hash = null;
  document.getElementById("Hashtag").focus();
  document.getElementById("Hashtag").addEventListener('keypress', function(e) {
    var regex = new RegExp("^[a-zA-Z0-9]+$"),
      key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (key === '#') {
      e.preventDefault();
      return false;
    }
    if (!regex.test(key) && e.which !== 13 && e.which !== 8) {
      e.preventDefault();
      return false;
    }
    if (this.value.length === 0) {
      this.value = '#';
    }
    if (e.which == 13 || e.keyCode == 13) {
      createDashboard();
      return false;
    } else {
      var temphash = this.value + key;
      //console.log(temphash);
      hash = temphash.slice(1, temphash.length);
    }
  });
  document.getElementById("go").addEventListener("click", createDashboard);

  function createDashboard() {
    getTwitterData();
    document.getElementById("main").style.display = "none";
    $('link[rel=stylesheet][href="styles/landing.css"]').remove();
    var ajaxLoader = document.createElement("div");
    ajaxLoader.setAttribute("id", "loader");
    ajaxLoader.setAttribute("class", "ajax-loader");
    var loader = document.createElement("img");
    loader.setAttribute("src", "assets/preload.gif");
    loader.setAttribute("class", "img-responsive");
    ajaxLoader.appendChild(loader);
    document.body.appendChild(ajaxLoader);
    $('.ajax-loader').css("visibility", "visible");
  }

  function refreshPage() {
    $('head').append('<link rel="stylesheet" type="text/css" href="styles/landing.css" />');
    var ch = document.getElementById("chartcontainer");
    var ch1 = document.getElementById("cont");
    var ch3 = document.getElementById("bDiv");
    var ch4 = document.getElementById("numTweet");
    var ch5 = document.getElementById("loader");
    var ch6 = document.getElementById("cont");
    document.body.removeChild(ch);
    document.body.removeChild(ch1);
    document.body.removeChild(ch3);
    document.body.removeChild(ch4);
    document.body.removeChild(ch5);
    ch6.style.display = "none";
    setTimeout(function() {
      document.getElementById("main").style.display = "block";
      document.getElementById("Hashtag").value = "";
    }, 0);
  }

  function getTwitterData() {
    $.ajax({
      url: 'tweet.php',
      type: 'POST',
      async: 'false',
      cache: 'false',
      data: {
        Hashtag: hash
      },
      success: function(data) {
        var parsedData = JSON.parse(data);
        if (parsedData.statuses.length == 0) {
          $('.ajax-loader').css("visibility", "hidden");
          $('head').append('<link rel="stylesheet" type="text/css" href="styles/landing.css" />');
          document.getElementById("main").style.display = "block";
          document.getElementById("Hashtag").value = "";
          setTimeout(function() {
            document.getElementById("main").style.display = "block";
            document.getElementById("Hashtag").value = "";
          }, 0);
        } else {
          createCountChart(parsedData.statuses);
          hourlyPplReached(parsedData.statuses);
          document.getElementById("back").addEventListener("click", refreshPage);
        }
      },
      error: function() {
        if (data == 0)
          alert("failure");
      },
    });
  }

  function getCountDataSource(data) {
    var timeCountMap = {};
    var timeArr = [];
    var timeCountDataSource = {
      "chart": {
        "id": 'chart1',
        "caption": "#" + hash,
        "subCaption": "Popular Tweets - "+ new Date().toDateString(),
        "theme": "twitterTheme"
      },
      "data": []
    }
    for (var i = 0; i < data.length; i++) {

      timeArr.push(convertTime(data[i].created_at));
    }
    for (var j = 0; j < timeArr.length; j++) {

      if (!timeCountMap[timeArr[j]])
        timeCountMap[timeArr[j]] = 0;
      ++timeCountMap[timeArr[j]];
    }
    for (var k = timeArr.length - 1; k >= 0; k--) {
      var l = timeArr[k].split(":");
      var data = {};
      data.label = l[1] + ":" + l[2];
      data.value = timeCountMap[timeArr[k]];
      data.toolText = l[1] + ":" + l[2] + " , " + timeCountMap[timeArr[k]] +" tweets";
      timeCountDataSource.data.push(data);
    }
    return timeCountDataSource;
  }

  function ieDateConversion(_date) {
    var arr = _date.split(' '),
      newdate = '';
    for (var i = 0, ii = arr.length; i < ii; i++) {
      i !== (ii - 2) && (newdate += arr[i] + ' ');
    }
    return newdate;
  }

  function convertTime(timeData) {

    var isIE = /*@cc_on!@*/ false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
    if (isIE || isEdge) {
      timeData = ieDateConversion(timeData);
    }
    var dateTime = new Date(timeData);
    var hour = dateTime.getHours();
    var min = dateTime.getMinutes();
    var mid = " AM";
    if (hour == 12) {
      hour = hour;
      mid = " PM";
    }
    if (hour > 12) {
      hour = hour % 12;
      mid = " PM"
    }
    var finalTime = dateTime.toDateString() + ":" + hour + ":" + ('0' + dateTime.getMinutes()).slice(-2) + mid;
    return finalTime;
  }

  function createCountChart(data) {
    if (maindiv == undefined) {
      var backDiv = document.createElement("div");
      backDiv.setAttribute("id", "bDiv");
      backDiv.setAttribute("class", "backWrapper");
      var backContainer = document.createElement("div");
      backContainer.setAttribute("class", "backContainer");
      backContainer.setAttribute("id", "back");
      var back = document.createElement("img");
      back.setAttribute("class", "img-responsive");
      back.setAttribute("src", "assets/back.png");
      var backLabel = document.createElement("label");
      backLabel.innerHTML = "Back to Search";
      backContainer.appendChild(back);
      backContainer.appendChild(backLabel);
      backDiv.appendChild(backContainer);
      document.body.appendChild(backDiv);
      var maindiv = document.createElement("div");
      maindiv.setAttribute("class", "countChartWrapper");
      maindiv.setAttribute("id", "chartcontainer");
      var countDatasource = getCountDataSource(data);
      document.body.appendChild(maindiv);
      FusionCharts.ready(function() {
        var CountChart = new FusionCharts({
          type: 'spline',
          renderAt: 'chartcontainer',
          width: '100%',
          height: '100%',
          containerBackgroundOpacity: '0',
          dataFormat: 'json',
          creditLabel: false,
          dataSource: countDatasource,
          events: {
            "renderComplete": function(eventObj, dataObj) {
              $('.ajax-loader').css("visibility", "hidden");
            }

          }
        }).render();
      });
    }
  }

  function hourlyPplReached(data) {
    var totalReachCount = null;
    var totalTweet = data.length;
    for (var i = data.length - 1; i > 0; i--) {
      totalReachCount += data[i].retweet_count;
    }
    var numTweet = document.createElement("div");
    numTweet.setAttribute("class", "numTweetWrapper");
    numTweet.setAttribute("id", "numTweet");
    var title1 = document.createElement("h1");
    title1.setAttribute("class", "card-title");
    title1.setAttribute("id", "total");
    title1.innerHTML = (totalReachCount + totalTweet).toLocaleString();
    var tx1 = document.createElement("h4");
    tx1.setAttribute("class", "card-text");
    tx1.innerHTML = "Number of Users Tweeting";
    numTweet.appendChild(tx1);
    numTweet.appendChild(title1);
    document.body.appendChild(numTweet);
    var sub1 = document.createElement("div");
    sub1.setAttribute("class", "containerflux");
    sub1.setAttribute("id", "cont");
    var sub2 = document.createElement("div");
    sub2.setAttribute("class", "row");
    var sub3 = document.createElement("div");
    sub3.setAttribute("class", "col-sm-6");
    sub3.setAttribute("id", "export");
    var sub4 = document.createElement("div");
    sub4.setAttribute("class", "card card-inverse text-center");
    sub4.setAttribute("id", "map");
    sub3.appendChild(sub4);
    var sub6 = document.createElement("div");
    sub6.setAttribute("class", "col-sm-6");
    sub6.setAttribute("id", "export");
    var sub7 = document.createElement("div");
    sub7.setAttribute("class", "card card-inverse text-left");
    var sub8 = document.createElement("div");
    sub8.setAttribute("class", "card-block");
    sub8.setAttribute("id", "map1");
    sub7.appendChild(sub8);
    sub6.appendChild(sub7);
    sub2.appendChild(sub3);
    sub2.appendChild(sub6);
    sub1.appendChild(sub2);
    document.body.appendChild(sub1);
    FusionCharts.ready(function() {
      var dc1_1 = new FusionCharts({
        type: 'doughnut2d',
        renderAt: 'map1',
        width: '100%',
        height: '100%',
        containerBackgroundOpacity: '0',
        creditLabel: false,
        dataFormat: 'json',
        dataSource: {
          "chart": {
            "caption": "Activity Ratio",
            "theme": "twitterTheme"
          },
          "data": [{
            "label": "Original Tweets",
            "value": totalTweet,
            "borderColor": "#2A729D",
            "color": "#2A729D"
          }, {
            "label": "Re-Tweets",
            "value": totalReachCount,
            "borderColor": "#FFFFFF",
            "color": "#FFFFFF"
          }]
        }
      }).render();
    });
         
   createMap(data);      
  }

  function createMap(data) {
    var maxVal = null;
    var mapCountMap = {};
    var countryData = [];
    var MapData = [];
    var valueArray = [];
    for (var c = 0; c < data.length; c++) {

      var country = data[c].user.location.split(",") || data[c].user.location.split(".");
      countryData.push(country[country.length - 1].trim());
    }

    for (var l = 0; l < countryData.length; l++) {

      if (!mapCountMap[countryData[l]])
        mapCountMap[countryData[l]] = 0;
      ++mapCountMap[countryData[l]];
    }
    $.ajax({
      url: 'scripts/country.json',
      type: 'POST',
      async: 'false',
      cache: 'false',
      success: function(countryData) {

        for (var m = 0; m < Object.keys(mapCountMap).length; m++) {
          for (var o = 0; o < countryData.country.length; o++) {
            if (Object.keys(mapCountMap)[m] == countryData.country[o].name)

            {
              var dataObj = {}
              dataObj.id = countryData.country[o].code;
              dataObj.value = mapCountMap[Object.keys(mapCountMap)[m]];
              dataObj.color = "#044D73";
              MapData.push(dataObj);
              valueArray.push(mapCountMap[Object.keys(mapCountMap)[m]]);
            }
          }
        }
        maxVal = Math.max.apply(null, valueArray);
        FusionCharts.ready(function() {
          var chart = new FusionCharts({
            type: 'maps/worldwithcountries',
            renderAt: 'map',
            width: '100%',
            height: '100%',
            containerBackgroundOpacity: '0',
            dataFormat: 'json',
            creditLabel: false,
            dataSource: {
              "chart": {
                "caption": "Worldwide Activity",
                "theme": "twitterTheme",
                "paletteColors": "#4193C7"
              },
              
              "data": MapData
            }
          }).render();
        });

      },
      error: function() {
        alert("failure");
      }
    });
  }
});
