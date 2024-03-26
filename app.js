const body = document.querySelector('body');
const keyButtons = [...document.querySelectorAll('.key')];
// console.log(keyButtons);
const keys = keyButtons.map((keyButton) => keyButton.dataset.key)
// console.log(keys);

const keyToButtonsMap = keyButtons.reduce((accumulator, keyButton) => {
    const currentKey = keyButton.dataset.key
    // console.log(currentKey);
    accumulator[currentKey] = keyButton

    return accumulator
}, {})

let currentKeyJiggle;
let correctAnswer = 0;
let times = 0;
const score = document.querySelector('#score');
const firstPartOfTheScore = document.querySelector('.first__part')
const tryAgainButton = document.querySelector('.try__again');

console.log(keyToButtonsMap);

const setRandomKeys = () => {
    if(currentKeyJiggle) {
        keyToButtonsMap[currentKeyJiggle].classList.remove('jiggle')
    }

    const randomIndex = Math.floor(Math.random() * keys.length)
    currentKeyJiggle = keys[randomIndex]
    // console.log(currentKeyJiggle);

    keyToButtonsMap[currentKeyJiggle].classList.add('jiggle')
}

setRandomKeys()

const checkKey = (inputKey) => {
    // console.log(inputKey);
    if(inputKey.toUpperCase() === currentKeyJiggle) {
        // console.log(inputKey.toUpperCase())
        setRandomKeys()
        correctAnswer++

        score.textContent = correctAnswer
        // console.log(correctAnswer);
    }

    if(times >= 10) {
        for(let key = 0; key < keyButtons.length; key++) {
            keyButtons[key].disabled = true;
            keyButtons[key].classList.remove('jiggle')
            firstPartOfTheScore.textContent = 'Your final score '
            tryAgainButton.classList.add('out__of__ten-times')
        }
    }
}

keyButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const clickedKey = e.target.dataset.key
        times++
        console.log(times);
        checkKey(clickedKey)
    })
})


body.addEventListener('keyup', (e) => {
    // console.log(e)
    const typedKey = e.key
    times++
    console.log(times);
    checkKey(typedKey)
})

tryAgainButton.addEventListener('click', () => {
    for(let key = 0; key < keyButtons.length; key++) {
        keyButtons[key].disabled = false;
    }

    times = 0;
    correctAnswer = 0;
    score.textContent = correctAnswer
    firstPartOfTheScore.textContent = 'Your score '

    tryAgainButton.classList.remove('out__of__ten-times')

    setRandomKeys() 
})
