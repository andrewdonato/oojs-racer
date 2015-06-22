//  model
var Player = function(name){
  var name = name;
  var currentPosition = 0;

  this.move = function(){
    currentPosition++;
  }

  this.getPosition = function(){
    return currentPosition;
  }

  this.getName = function(){
    return name;
  }
}

//  view
var GameBoard = function(){
  this.getBoard = function() {
    return $(document);
  }
  this.updatePlayerPosition = function(player){
    var track = $("#" + player.getName() + "_strip");
    // .find searches its children for the .active cell
    track.find(".active").removeClass("active");
    // .children gives an array of children
    $(track.children()[player.getPosition()]).addClass("active");
  }
  this.getFinishedPosition = function(player){
    return $("#" + player.getName() + "_strip").children().length - 1;
  }

  this.reportWinner = function(player) {
    $("#winner").append("<h1>" + player.getName() + " is the Winner! </h1>")
  }
}

//  controller
var Game = function() {

  var gameBoard = new GameBoard();
  var players = {
    81: new Player("player1"),
    80: new Player("player2")
  }

  function advanceRacer(event){
    var player = players[event.keyCode];
    player.move();
    gameBoard.updatePlayerPosition(player);

    if (gameBoard.getFinishedPosition(player) == player.getPosition(player)) {
      gameBoard.reportWinner(player);
      // as soon as someone gets to the end, show who won, disable keys and gameplay.
      // switching keyup to keydown means the game still continues on even after a winner.
      // unless they are both keydown
      gameBoard.getBoard().off("keydown");
    }
  }


  this.initialize = function() {
    // even using keydown here means the game does not end
    // unless they are both keydown
    gameBoard.getBoard().on("keydown", advanceRacer);
  }
}
































//////////////////////////////////////////////////////////////////////////////////////////////
// var Player = function(name) {
//   var name = name;
//   var currentPosition = 0;

//   this.getCurrentPosition = function() {
//     return currentPosition;
//   }

//   this.getName = function() {
//     return name;
//   }

//   this.move = function() {
//     currentPosition++;
//   }
// }

// var GameView = function() {

//   function clearActivePosition(track) {
//     track.find(".active").removeClass("active");
//   }

//   function getPlayerTrackByName(name) {
//     return $("#" + name + "_strip");
//   }

//   function resetTracks(players) {
//     $.each(players, function(keyCode, player) {
//       var track = getPlayerTrackByName(player.getName());
//       clearActivePosition(track);
//       $(track.children()[0]).addClass("active");
//     });
//   }

//   function clearWinner() {
//     $("#winner").empty();
//   }

//   this.getPage = function() {
//     return $(document);
//   }

//   this.getFinishPosition = function(name) {
//     return getPlayerTrackByName(name).children().length - 1;
//   }

//   this.updatePlayerPosition = function(name, position) {
//     track = getPlayerTrackByName(name);
//     clearActivePosition(track);
//     $(track.children()[position]).addClass("active");
//   }

//   this.reportWinner = function(name) {
//     $("#winner").append("<h1>" + name + " Won!</h1><input type='button' value='Reset Game' name='reset'>");
//   }

//   this.resetGame = function(players) {
//     resetTracks(players);
//     clearWinner();
//   }
// }

// var Game = function() {
//   var gameView = new GameView();

//   var players = {
//     81: new Player("player1"),
//     80:qqq new Player("player2")
//   }

//   function advanceRacer(event) {
//     event.preventDefault();
//     processPlayerTurn(players[event.keyCode]);
//   }

//   function processPlayerTurn(player) {
//     movePlayer(player);
//     determineWinner(player);
//   }

//   function movePlayer(player) {
//     player.move();
//     gameView.updatePlayerPosition(player.getName(), player.getCurrentPosition());
//   }

//   function determineWinner(player) {
//     var finishPosition = gameView.getFinishPosition(player.getName());

//     if(player.getCurrentPosition() == finishPosition) {
//       finishGame(player.getName());
//     }
//   }

//   function finishGame(winner) {
//     gameView.getPage().off("keyup");
//     gameView.reportWinner(winner);
//   }

//   function resetGame() {
//     gameView.resetGame(players);
//     gameView.getPage().on("keyup", advanceRacer);
//   }

//   this.initialize =  function() {
//     gameView.getPage().on("keyup", advanceRacer);
//     gameView.getPage().on("click", "input[name='reset']", resetGame);
//   }
// }
