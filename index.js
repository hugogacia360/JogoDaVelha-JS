const cells = document.querySelectorAll(".cell"); //selecione todas as células
const statusText = document.querySelector("#statusText"); //selecione o status
const restartBtn = document.querySelector("#restartBtn"); //selecione o botão de reiniciar
const winConditions = [
    //condições de vitória
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""]; //opções
let currentPlayer = "X"; //jogador atual
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); //adicionar evento de clique
    restartBtn.addEventListener("click", restartGame); //adicionar evento de clique
    statusText.textContent = `É a vez do ${currentPlayer} !`; //atualizar o texto do status
    running = true; //definir o inicio do jogo
}
function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex"); //obter o índice da célula que esta sendo clicada
    if (options[cellIndex] !== "" || !running) { //se a celula não estiver vazia ou se o jogo não estiver em execução
        return;
    }
    updateCell(this, cellIndex); //atualizar a célula
    checkWinner(); //verificar se alguém ganhou apos a atualização da celula
}
function updateCell(cell, index) {
    options[index] = currentPlayer; //atualizar a opção
    cell.textContent = currentPlayer; //atualizar o texto da célula
}
function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X"; //mudar o jogador atual
    statusText.textContent = `É a vez do ${currentPlayer} !`; //atualizar o texto do status
}
function checkWinner() {
    let roundWon = false; //definir se alguém ganhou
    for (let i = 0; i < winConditions.length; i++) { //testar para cada condição de vitória
        const condition = winConditions[i];          // iterando sobre as condições de vitória
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") { //se alguma das células estiver vazia
            continue; //pular para a próxima condição
        }
        if (cellA == cellB && cellB == cellC) { //se as células forem iguais
            roundWon = true; //definir que alguém ganhou
            break; //parar de testar as condições
        }
    }
    if (roundWon) { //se alguém ganhou
        statusText.textContent = `${currentPlayer} ganhou!`; //atualizar o texto do status
        running = false; //definir o fim do jogo
}
    else if (!options.includes("")) { //se não houver mais espaços vazios
        statusText.textContent = "Empate!"; //atualizar o texto do status
        running = false; //definir o fim do jogo
    }
    else { //se ninguém ganhou e ainda há espaços vazios
        changePlayer(); //mudar o jogador atual
    }
}

function restartGame() {

}