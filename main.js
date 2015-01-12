/* 3D Tic Tac Toe Script */
/* by Brian Cottrell     */
/* 10-07-2014            */

/*VARIABLES*/
var columns = 3;								//Specifies starting number of columns
var rows = 3;									//Specifies starting number of rows
var stacks = 3;									//Specifies starting number of stacks
var zOffset = 0.2;								//Provides depth of field for 3D view
var selectedColor = '#FF4400';					//Color applied when mouse moves over a point
var storedColor = '#000000';					//Saves original color for temporary changing
var winMessage1 = 'Player 1 Wins';				//Message displayed if player 1 wins
var winMessage2 = 'Player 2 Wins';				//Message displayed if player 2 wins
var tieMessage = 'Tie Game';					//Message displayed during a tie
var turnCount = 0;								//Counts how many turns have been played
var checkCount = [0,0,0,0];						//Stores the number of points in eacch win path
var structure = [];								//Create an array to store points
var pointSize = 14-2*columns;					//Specifies the diameter of each point
var pointSpacing = (60-pointSize)/(columns-1);	//Specifies the spacing between points
/*FUNCTIONS*/
//Set up the game board with the specified number of rows and columns
function setBoard(){
	pointSize = 14-2*columns;
	pointSpacing = (60-pointSize)/(columns-1);
	checkCount = [0,0,0,0];
	structure = [];
	turnCount = 0;
	structure.length = stacks;
	for(var i = 0; i < structure.length; i++){
		structure[i] = [];
		structure[i].length = rows;
		for(var j = 0; j < structure[i].length; j++){
			structure[i][j] = [];
			structure[i][j].length = columns;
		}
	}
	//Fill game structure with points
	for(var i = 0; i < stacks; i++){
		for(var j = 0; j < rows; j++){
			for(var k = 0; k < columns; k++){
				structure[i][j][k] = document.createElement('div');
				structure[i][j][k].classList.add('point');
				structure[i][j][k].id = k.toString()+j.toString()+i.toString()+'2';
				structure[i][j][k].style.width = (pointSize*(1+zOffset*i))+'%';
				structure[i][j][k].style.padding = ((pointSize/2)*(1+zOffset*i))+'% 0%';
				structure[i][j][k].style.left = (pointSpacing*(1+zOffset*i)*k+i*i+i*2)+'%';
				structure[i][j][k].style.top = (50+pointSpacing*(1+zOffset*i)*j+i*i+i*2)+'%';
				structure[i][j][k].style.backgroundColor = '#'+(3+3*i)+'F'+(k)+'0'+(j)+'0';
				structure[i][j][k].addEventListener('mouseover', addFocus, false);
				structure[i][j][k].addEventListener('mouseleave', removeFocus, false);
				structure[i][j][k].addEventListener('click', selectPoint, false);
				document.getElementsByClassName('container')[0].appendChild(structure[i][j][k]);				
			}
		}
	}
	document.getElementsByTagName('button')[0].addEventListener('click', resetGame, false);
	document.getElementsByTagName('button')[1].addEventListener('click', resetGame3, false);
	document.getElementsByTagName('button')[2].addEventListener('click', resetGame4, false);
	document.getElementsByTagName('button')[3].addEventListener('click', resetGame5, false);
}
//Change the color of a point to the specified color
function addFocus(){
	if(this.id[3] == 2){
		storedColor = this.style.backgroundColor;
		this.style.backgroundColor = selectedColor;
	}
}
//Restore the original color
function removeFocus(){
	if(this.id[3] == 2){
		this.style.backgroundColor = storedColor;
	}
}
//resets the game using the previous settings
function resetGame(){
	var containerDiv = document.getElementsByClassName('container')[0];
	while (containerDiv.hasChildNodes()) {
	    containerDiv.removeChild(containerDiv.lastChild);
	}
	document.getElementsByClassName('alert')[0].style.visibility = 'hidden';
	setBoard();
}
//Resets the game with a 3x3x3 structure
function resetGame3(){
	columns = 3;
	rows = 3;
	stacks = 3;
	resetGame();
}
//Resets the game with a 4x4x4 structure
function resetGame4(){
	columns = 4;
	rows = 4;
	stacks = 4;
	resetGame();
}
//Resets the game with a 5x5x5 structure
function resetGame5(){
	columns = 5;
	rows = 5;
	stacks = 5;
	resetGame();
}
//Gets called when a win condition has been met
function playerWins(player){
	if(player == 1){
		document.getElementsByTagName('p')[0].innerHTML = winMessage1;
	}else if(player == 2){
		document.getElementsByTagName('p')[0].innerHTML = winMessage2;
	}else{
		document.getElementsByTagName('p')[0].innerHTML = tieMessage;
	}
	document.getElementsByClassName('alert')[0].style.visibility = 'visible';
}
//Change the color of the point based on whose turn it is and check if any win conditions are met
function selectPoint(){
	if(this.id[3] == 2){
		if(turnCount%2){
			this.id = this.id[0]+this.id[1]+this.id[2]+1;
			this.style.backgroundColor = 'rgb(0,'+this.id[1]*10+','+(50+50*this.id[2])+')';
		}else{
			this.id = this.id[0]+this.id[1]+this.id[2]+3;
			this.style.backgroundColor = 'rgb('+(150+40*this.id[2])+','+(150+40*this.id[2])+',0)';
		}
		storedColor = this.style.backgroundColor;
		//Checks for win conditions within each stack
		for(var i = 0; i < stacks; i++){
			for(var j = 0; j < rows; j++){
				for(var k = 0; k < columns; k++){
					//Check across each row
					checkCount[0]+=(structure[i][j][k].id[3]-2)
					if(checkCount[0] >= columns){
						playerWins(1);
					}else if(checkCount[0] <= -1*columns){
						playerWins(2);
					}
				}
				checkCount[0] = 0;
				if(columns == rows){
					//Check across each forward diagonal
					checkCount[1]+=(structure[i][j][j].id[3]-2)
					if(checkCount[1] >= columns){
						playerWins(1);
					}else if(checkCount[1] <= -1*columns){
						playerWins(2);
					}
					//Check across each reverse diagonal
					checkCount[2]+=(structure[i][j][columns-1-j].id[3]-2)
					if(checkCount[2] >= columns){
						playerWins(1);
					}else if(checkCount[2] <= -1*columns){
						playerWins(2);
					}
				}
			}
			checkCount = [0,0,0,0];
		}
		//Checks for win conditions within each column
		for(var i = 0; i < columns; i++){
			for(var j = 0; j < stacks; j++){
				for(var k = 0; k < rows; k++){
					//Check across each column
					checkCount[0]+=(structure[j][k][i].id[3]-2)
					if(checkCount[0] >= rows){
						playerWins(1);
					}else if(checkCount[0] <= -1*rows){
						playerWins(2);
					}
				}
				checkCount[0] = 0;
				if(rows == stacks){
					//Check across each forward diagonal
					checkCount[1]+=(structure[j][j][i].id[3]-2)
					if(checkCount[1] >= rows){
						playerWins(1);
					}else if(checkCount[1] <= -1*rows){
						playerWins(2);
					}
					//Check across each reverse diagonal
					checkCount[2]+=(structure[j][rows-1-j][i].id[3]-2)
					if(checkCount[2] >= rows){
						playerWins(1);
					}else if(checkCount[2] <= -1*rows){
						playerWins(2);
					}
				}
			}
			checkCount = [0,0,0,0];
		}
		//Checks for win conditions within each row
		for(var i = 0; i < rows; i++){
			for(var j = 0; j < columns; j++){
				for(var k = 0; k < stacks; k++){
					//Check across each stack
					checkCount[0]+=(structure[k][i][j].id[3]-2)
					if(checkCount[0] >= stacks){
						playerWins(1);
					}else if(checkCount[0] <= -1*stacks){
						playerWins(2);
					}
				}
				checkCount[0] = 0;
				if(stacks == columns){
					//Check across each forward diagonal
					checkCount[1]+=(structure[j][i][j].id[3]-2)
					if(checkCount[1] >= stacks){
						playerWins(1);
					}else if(checkCount[1] <= -1*stacks){
						playerWins(2);
					}
					//Check across each reverse diagonal
					checkCount[2]+=(structure[stacks-1-j][i][j].id[3]-2)
					if(checkCount[2] >= stacks){
						playerWins(1);
					}else if(checkCount[2] <= -1*stacks){
						playerWins(2);
					}
				}
			}
			checkCount = [0,0,0,0];
		}
		//Check for win conditions that span all three dimensions
		if(columns == rows && rows == stacks){
			for(var i = 0; i < columns; i++){
				checkCount[0]+=(structure[i][i][i].id[3]-2)
				if(checkCount[0] >= columns){
					playerWins(1);
				}else if(checkCount[0] <= -1*columns){
					playerWins(2);
				}
				checkCount[1]+=(structure[i][i][columns-1-i].id[3]-2)
				if(checkCount[1] >= columns){
					playerWins(1);
				}else if(checkCount[1] <= -1*columns){
					playerWins(2);
				}
				checkCount[2]+=(structure[i][columns-1-i][i].id[3]-2)
				if(checkCount[2] >= columns){
					playerWins(1);
				}else if(checkCount[2] <= -1*columns){
					playerWins(2);
				}	
				checkCount[3]+=(structure[i][columns-1-i][columns-1-i].id[3]-2)
				if(checkCount[3] >= columns){
					playerWins(1);
				}else if(checkCount[3] <= -1*columns){
					playerWins(2);
				}					
			}
			checkCount = [0,0,0,0];
		}	
		turnCount++;
		if(turnCount >= columns*rows*stacks){
			playerWins(2);
		}
	}
}
/*PROGRAM*/
setBoard();