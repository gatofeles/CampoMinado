start = 0;

function timer(){
    start++;
    document.getElementById("clock").innerHTML=start;
  	setTimeout("timer()", 1000);
}