// for using tab for stantnding table
function openTab(statsName) {
  var i;
  var x = document.getElementsByClassName("stats");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(statsName).style.display = "block";  
}

// for race celander get with ajax from another website

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://ergast.com/api/f1/2023.json", true);

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var response = JSON.parse(xhr.responseText);
    var veriDiv = document.getElementById("veri");
    var yarislar = response.MRData.RaceTable.Races;

    var table = "<table class='r1'><tr><th>Season</th><th>Round</th><th>Race Name</th><th>Date</th><th>Time</th><th>Sprint</th><th>Circuit</th></tr>";
    for (var i = 0; i < yarislar.length; i++) {
      var season = yarislar[i].season;
      var round = yarislar[i].round;
      var raceName = yarislar[i].raceName;
      var date = yarislar[i].date;
      var time = yarislar[i].time;
      var sprint = yarislar[i].Sprint ? "YES" : ""; 
      var circuit = yarislar[i].Circuit.circuitName;


      var rowColor = i % 2 === 0 ? "r0" : "r1";

      table += "<tr class='" + rowColor + "'><td>" + season + "&emsp;</td><td>" + round + "&emsp;</td><td>" + raceName + "&emsp;</td><td>" + date + "&emsp;</td><td>" + time + "&emsp;</td><td>" + sprint + "&emsp;</td><td>" + circuit + "</td></tr>";
    }
    table += "</table>";

    veriDiv.innerHTML = table;
  }
};

xhr.send();

// for article part get with ajax from file 

$(document).ready(function() {
    $('#nav_list a').on('click', function(e) {
      e.preventDefault();
      var author = $(this).attr('title');
  
      $.getJSON('json_files/' + author + '.json', function(data) {
        $('bside').empty();
  
        $.each(data.authors, function(i, author) {
          var authorHTML = '<h1>' + author.title + '</h1>' +
            '<img src="' + author.image + '">' +
            '<h2>' + author.month + '<br>' + author.author + '</h2>' +
            '<p id="json">' + author.text + '</p>';
  
          $('bside').append(authorHTML);
        });
      });
    });
  });
  

  // Get countdown data from local from php file
  function geriSayimiAl() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'gerisayim.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var geriSayimVerisi = JSON.parse(xhr.responseText);
            var kalanSureMetin = " " + geriSayimVerisi.gunler + " Days " + geriSayimVerisi.saatler + " Hours " + geriSayimVerisi.dakikalar + " Mins";
            document.getElementById("kalanSure").innerHTML = kalanSureMetin;
        }
    };
    xhr.send();
}

geriSayimiAl();


//for slider with jquery
$(document).ready(function(){
  $('.slider').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true
  });
});

//Accordion
$(document).ready(function() {
	$("#accordion").accordion({
		collapsible: true,
		active: false,
		heightStyle: "content"
	});
});

// Initialize datepicker with minDate option
$("#date").datepicker({
  minDate: 0
});

  // Increase kg value when clicked on text
  $("#kg-text1").click(function() {
    var kg = $("#kg").val();
    if (kg < 10) {
      kg++;
      $("#kg").val(kg);
    }
  });
      // Decrease kg value when clicked on text
      $("#kg-text2").click(function() {
    var kg = $("#kg").val();
    if (kg > 1) {
      kg--;
      $("#kg").val(kg);
    }
  });

  // Change type value when clicked on label
  $("#type-text").click(function() {
    var types = ["Postal Card", "Mause Pad", "Celander", "Poster", "Race Ticket"];
    var type = $("#type").val();
    var index = types.indexOf(type);
    if (index == -1 || index == types.length - 1) {
      index = 0;
    } else {
      index++;
    }
    $("#type").val(types[index]).trigger("click");
  });

  // Submit form and redirect to new.html
  $("#pasta-form").submit(function(e) {
    e.preventDefault();
    var formData = $(this).serialize(); 
    window.location.href = "new.html?" + formData; 
  });

  // A function to parse the query string and return an object of key-value pairs
  function parseQuery(query) {
    var params = {};
    query = query.substring(1); 
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("="); 
      var key = decodeURIComponent(pair[0]); 
      var value = decodeURIComponent(pair[1]); 
      params[key] = value; 
    }
    return params;
  }

  // A function to display the form data in the HTML page
  function displayFormData() {
    var query = window.location.search; 
    var formData = parseQuery(query); 
    var result = "Thank You "+formData['name']+
    "<br>your "+formData['kg']+" piece "+formData['type']+"<br> will arrive on "+formData['date'];

    document.getElementById("result").innerHTML = result; // Display the result in the HTML element with id="result"
  }


  // get data another website
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://ergast.com/api/f1/2023.json", true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      var veriDiv = document.getElementById("veri");
      
      var yarislar = response.MRData.RaceTable.Races;
      
      // show data with table
      var table = "<table><tr><th>Round</th><th>Date</th><th>Race Name</th></tr>";
      for (var i = 0; i < yarislar.length; i++) {
        var round = yarislar[i].round;
        var date = yarislar[i].date;
        var raceName = yarislar[i].raceName;
        table += "<tr><td>" + round + "</td><td>" + raceName + "</td><td>" + date + "</td></tr>";
      }
      table += "</table>";

      veriDiv.innerHTML = table;
    }
  };

  xhr.send();