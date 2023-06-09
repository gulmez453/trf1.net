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