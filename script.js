
function openTab(statsName) {
  var i;
  var x = document.getElementsByClassName("stats");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(statsName).style.display = "block";  
}
