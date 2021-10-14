let player1Name='';
let player2Name='';
let total = [0, 0];
let limit =0;

let globalDetails={};
window.onload = getData;

function onSubmitForm(e) {
  let p1 = document.querySelector('#player1-name')
  let p2 = document.querySelector('#player2-name')
  let lim = document.querySelector('#limit')
  let Player1 = p1.value
  let Player2 = p2.value
  let limitHtml = lim.value
  let obj = { Player1, Player2, limitHtml }
  localStorage.setItem('obj', JSON.stringify(obj))

  p1.value = ''
  p2.value = ''
  lim.value = ''
}

function getData() {

  globalDetails = JSON.parse(localStorage.getItem('obj'))

  let player1Heading = document.querySelector('.player-1-heading')
  let player2Heading = document.querySelector('.player-2-heading')

  if (player1Heading) {
    player1Heading.innerHTML = globalDetails.Player1
    player2Heading.innerHTML = globalDetails.Player2
    limit = +globalDetails.limitHtml
  }
}

function handleClick() {
  document.querySelector('.container').classList.add('active')
}

function getRandom() {
  return Math.floor(Math.random() * 6) + 1
}

function rolldice(index) {
  let players = document.querySelectorAll('.player')
  let buttons = document.querySelectorAll('.roll-dice')
  let images = document.querySelectorAll('img');

  let random = getRandom()

  total[index - 1] += random
  players[index - 1].querySelector('.score').innerHTML = total[index - 1]

  images[index - 1].src = `./images/dice${random}.png`

  if (total[index - 1] >= limit) {

    for (let i = 0; i < 2; i++) {
      buttons[i].disabled = true
      players[i].classList.add('next-turn')
    }

    let str = "<div class='gif-container'><img src='./images/winner.gif'></div>"

    players[index - 1].innerHTML += str
  }
   else {

    for (let i = 0; i < 2; i++) {

      if (players[i].classList.contains('next-turn')) {
        buttons[i].disabled = false
        players[i].classList.remove('next-turn')
      }

      buttons[index - 1].disabled = true
      players[index - 1].classList.add('next-turn')
      
    }
  }
}
