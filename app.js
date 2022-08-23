const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const wordle = 'SUPER'
const keys = [ //array que contém as teclas do teclado.
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]

const guessRows = [ //cria a matriz que é o tabuleiro de suposição das palavras
    ['', '', '', '', '',],
    ['', '', '', '', '',],
    ['', '', '', '', '',],
    ['', '', '', '', '',],
    ['', '', '', '', '',],
    ['', '', '', '', '',]
]

let currentRow = 0
let currentTile = 0


guessRows.forEach((guessRow, guessRowIndex) => { // cria a div que contém o tabuleiro do jogo
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement ('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})

keys.forEach(key => { //cria o teclado pegando cada string do array de teclas gerando um botão
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const handleClick = (letter) => { //pega o click das letras do teclado
    console.log('clicked', letter)
    if (letter === '«'){   //se a letra for '«' não adiciona no tabuleiro
        deleteLetter()
        return
    }
    if (letter === 'ENTER'){ //se for a tecla 'ENTER' não adiciona no tabuleiro
        checkRow()
        return 
    }
    addLetter(letter)
}

const addLetter = (letter) => { //adiciona letra no tabuleiro
    if (currentTile < 5 && currentRow < 6){ //adiciona letra ao tabuleiro se tiver 5 letras e menos que 6 letras.
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter //entra na matriz e obtém o índice 0 e os seguintes adicionando a letra do teclado no tabuleiro.
        tile.setAttribute('data', letter)
        currentTile++
    }
}

const deleteLetter = () => { // deletar letra
    if (currentTile > 0){
        currentTile-- 
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    if (currentTile === 5){
        console.log('guess is ' + guess, 'worlde is ' + wordle)
        if (wordle == guess){
            showMessage('Magnífico!')
        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 1700)
}