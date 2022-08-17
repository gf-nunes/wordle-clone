const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const wordle = 'SUPER'
const keys = [
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

const guessRows = [
    ['', '', '', '', '',],
    ['', '', '', '', '',],
    ['', '', '', '', '',],
    ['', '', '', '', '',],
    ['', '', '', '', '',],
    ['', '', '', '', '',]
]

let curreontRow = 0
let curreontTile = 0


guessRows.forEach((guessRow, guessRowIndex) => {
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

keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const handleClick = (letter) => {
    console.log('clicked', letter)
    if (letter === '«'){   //se a letra for '«' não adiciona no tabuleiro
        deleteLetter()
        console.log('guessRows', guessRows)
        return
    }
    if (letter === 'ENTER'){ //se for a tecla 'ENTER' não adiciona no tabuleiro
        checkRow()
        return 
    }
    addLetter(letter)
}

const addLetter = (letter) => { //adiciona letra no tabuleiro
    if (curreontTile < 5 && curreontRow < 6){ //adiciona letra ao tabuleiro se tiver 5 letras e menos que 6 letras.
        const tile = document.getElementById('guessRow-' + curreontRow + '-tile-' + curreontTile)
        tile.textContent = letter
        guessRows[curreontRow][curreontRow] = letter //entra na matriz e obtém o índice 0 e os seguintes.
        tile.setAttribute('data', letter)
        curreontTile++
    }
}

const deleteLetter = () => { // deletar letra
    if (curreontTile > 0){
        curreontTile-- 
        const tile = document.getElementById('guessRow-' + curreontRow + '-tile-' + curreontTile)
        tile.textContent = ''
        guessRows[curreontRow][curreontRow] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[curreontRow].join('')

    if (curreontTile === 5){
        console.log('guess is' + guess, 'worlde is' + wordle)
        if (wordle == guess){
            showMessage('Magnífico!')
        }
    }
}

const showMessage = (message) => { // função que mostra a mensagem se acertar 
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}