start = 0;

export function timer(){
    start++;
    document.getElementById("gameStatus").innerHTML=start;
  	setTimeout("timer()", 1000);
}

