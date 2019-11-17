const numDivs = 36;
const maxHits = 11;

let hits = 1;
let points = 0;
let firstHitTime = 0;
let succeedHits = 0;
let si = 0; //time setInterval var
let timer = 0;

function round() {
  let divID = randomDivId();
  let divSelector = "#slot-" + divID;
  $(".target").removeClass("target");
  $(divSelector).addClass("target");
  $(divSelector).removeClass("miss");
  $(divSelector).text(hits);
  $(".points").text(points);
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  hits = 1;
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $(".seconds").text(totalPlayedSeconds);
  $("#total-hits").text(succeedHits);
  //$("#win-message").removeClass("d-none");
  $("#win-message").show();
  $("#button-again").show();
  $(".game-field").hide();
  succeedHits = 0;
  clearInterval(si);
  timer = 0;
}

function handleClick(event) {
  $(".target").text("");
  hits = hits + 1;
  let clicked = $(event.target);
  if ( clicked.hasClass("target") ) {
    clicked.removeClass("target");
    clicked.text("");
    succeedHits++;
    points++;
  } else {
    clicked.addClass("miss");
    if (points) points--;
  }
  round();
}

function newGame() {
  hits = 1;
  points = 0;
  firstHitTime = 0;
  succeedHits = 0;
  $(".game-field").show();
  $(".game-field").text("");
  $(".target").removeClass("target");
  $(".miss").removeClass("miss");
  $("#button-start").show();
  $("#button-again").hide();
  $("#win-message").hide();
  $(".seconds").text('0');
  $(".points").text('0');
  $(".game-field").off("click");
}

function startPressed() {
  firstHitTime = getTimestamp();
  si = setInterval( function() {
    $(".seconds").text(timer /10);
    timer++;
  }, 100);
  $("#button-start").hide();
  $(".game-field").click(handleClick);
  round();
}

function init() {
  $(".game-field").off("click");
  $("#button-again").click(newGame);
  $("#button-again").hide();
  $("#win-message").hide();
  $("#button-start").click(startPressed);
}

$(document).ready(init);