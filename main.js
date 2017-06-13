var count = 1500;
var tick_tock = true;
var work = false;
var rest = false;
var interval;

$(document).ready(function() {
    start_timer();
    show_time();
});

function start_timer() {
  $("#work").click(function() {
    set_work();
    tick_tock = false;
    show_time();
  });

  $("#rest").click(function() {
    set_rest();
    tick_tock = false;
    show_time();
  });

  $("#subtract").click(function() {
    if (count - 60 >= 0) {
      count -= 60;
      show_time();
    } else if (rest == true) {
      set_work();
      play();
      show_time();
      tick_tock = false;
    } else if (work == true) {
      set_rest();
      play();
      show_time();
      tick_tock = false;
    }
  });

  $("#add").click(function() {
    count += 60;
    show_time();
  });

  $("#stop").click(function() {
    tick_tock = false;
    clearTimeout(interval);
  });

  $("#start").click(function() {
    if (rest == false && work == false) {
      work = true;
    }
    tick_tock = true;
    clearTimeout(interval);
    counter();
  });

}

function show_time() {
        var minutes = Math.floor(count / 60);
        var seconds = count % 60;
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        document.getElementById("timer").innerHTML = minutes + ":" + seconds;
}

function counter() {
  interval = setInterval(timer, 1000);
}

function timer() {
        if (count <= 0) {
          play();
          if (rest == true) {
            set_work();
          } else if(work == true) {
            set_rest();
          }
          tick_tock = false;
          show_time();
          return;
        }
        else if (tick_tock == true) {
          count-=1;
          show_time();
        }
}

function play() {
  document.getElementById("sound").play();
}

function set_work() {
  rest = false;
  work = true;
  count = 1500;
}

function set_rest() {
  work = false;
  rest = true;
  count = 300;
}
