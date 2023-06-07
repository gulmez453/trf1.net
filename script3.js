var xhr = new XMLHttpRequest();
xhr.open("GET", "http://ergast.com/api/f1/2023.json", true);

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
  