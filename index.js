/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
const playerSign = 'X';
const computerSign  = 'O';


const winningPatternX3 = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = `<span class="cross">${playerSign}</span>`;
        }
        else if (gridValue === 2) {
            content = `<span class="cross">${computerSign}</span>`;
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    
    //	Changing the player 'X' or 'O' based on previous turn;
    
  	let newValue = 1;
  	grid[colIdx][rowIdx] = newValue;

		let computerPlayed = false;
		for (let colIndex = 0; colIndex < GRID_LENGTH; colIndex += 1) {
        for (let rowIndex = 0; rowIndex < GRID_LENGTH; rowIndex += 1) {
            if (colIdx !== colIndex && rowIdx !== rowIndex && grid[colIndex][rowIndex] === 0) {
            	grid[colIndex][rowIndex] = 2;
            	computerPlayed = true;
            	break;
            }
        }
        if (computerPlayed) {
        	break;
        }
    }

    renderMainGrid();
    //	call checkForWin() here;
    if (checkForWin(winningPatternX3)) {

			// If the match has ended then reset the grid;
    	grid.splice(0, grid.length)
	    initializeGrid();
	    //	console.log(grid);
    	renderMainGrid();
    	addClickHandlers();

    } else {

    	addClickHandlers();

    }

}

function addClickHandlers() {
    let boxes = document.getElementsByClassName("box");
    //	console.log(`boxes[0] -> ${boxes[0].innerText}`);
    for (let idx = 0; idx < boxes.length; idx++) {
    	//	check to see if the box already holds anything other than '' then don't add the click event;
    	if (boxes[idx].innerText === '') {
				boxes[idx].addEventListener('click', onBoxClick, false);
			}
    }
}


const checkForWin = (winningPatternInput) => {
	let boxes = document.getElementsByClassName("box");
	for (let index = 0; index < winningPatternInput.length; index += 1) {
		
		let boxesToCheck = getBoxesToCheckForWin(boxes, winningPatternInput[index]);
	
		if(doAllInTheListHaveSign(boxesToCheck, playerSign)) {
			
			alert(`Player (${playerSign}) won`);
			return true
			
		} else if (doAllInTheListHaveSign(boxesToCheck, computerSign)) {
		
			alert(`Computer (${computerSign}) won`);
			return true
			
		}
	}
	
	let usedBoxes = 0;
		
	for (let index = 0; index < boxes.length; index += 1) {
		if (boxes[index].innerText !== '') {
			usedBoxes += 1;
		}
	}
		
	if (usedBoxes === GRID_LENGTH * GRID_LENGTH) {
		alert('Match draw');
		return true;
	}
	return false;	
}


const getBoxesToCheckForWin = (boxes, winningPattern) => {
	return winningPattern.map((digit) => {
		
		return boxes[digit];
	});
}

const doAllInTheListHaveSign = (list, sign) => {

	for (let index = 0; index < list.length; index += 1) {
		if (!(list[index].innerText == sign)) {
			return false;
		} 
	}
	return true;
}


initializeGrid();
renderMainGrid();
addClickHandlers();
