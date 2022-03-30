 //variabls
 let level = document.querySelector('select'),
     start = document.querySelector('.start'),
     player = document.querySelector('.player-name'),

     bigBox = document.querySelector('.game'),
     finish = document.querySelector('.end'),
     score = document.querySelector('.result span'),
     quesNumber = document.querySelector('.ques-num'),
     allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
     customNums = [];
 let scores = [];

 document.addEventListener('change', function chooseLvl(e) {

     if (e.target.classList.contains('select'))
         customNums = Array.from(allNums.slice(0, e.target.value));

 })

 if (start) {

     start.onclick = function createNums() {

         //put random nums 
         if (level.value != '.....' && quesNumber.value != '') {

             this.remove()
                 //  readonlyToggle();

             createBox(quesNumber.value);

             let num1 = document.querySelectorAll('.first');
             let num2 = document.querySelectorAll('.second');




             num1.forEach(function(n) {

                 n.innerHTML = allNums[Math.floor(Math.random() * customNums.length)];

             })
             num2.forEach(function(n) {

                 n.innerHTML = allNums[Math.floor(Math.random() * allNums.length)];

             })
         }

     }
 }


 //  let out = document.querySelectorAll('.out');   
 if (finish) {
     finish.onclick = function(e) {
         e.preventDefault();
         let box = document.querySelectorAll('.box');
         let num1 = document.querySelectorAll('.first');
         let num2 = document.querySelectorAll('.second');

         let out = document.querySelectorAll('.out');
         //make array from node list of input and search on it if any of them is empty
         //if empty field => send message or check the answers 

         if (Array.from(out).some(ele => ele.value == '') == true) {
             let msgOverly = document.createElement('div');
             let fillAll = document.createElement('span');
             fillAll.className = 'fill-all';
             msgOverly.className = 'overlay';
             let text = document.createTextNode('لازم تحل كل المسائل')
             fillAll.appendChild(text);
             let close = document.createElement('span');
             close.className = 'close';
             close.innerHTML = "<i class='fa fa-times'></i>"
             fillAll.appendChild(close);
             msgOverly.appendChild(fillAll)
             bigBox.appendChild(msgOverly);

             close.onclick = function() {
                 document.querySelector('.overlay').remove();

             }
         } else {
             this.remove();
             out.forEach(o => o.setAttribute('readonly', 'readonly'));

             box.forEach(function(quistion, i) {
                 if (parseInt(num1[i].textContent) * parseInt(num2[i].textContent) == parseInt(out[i].value)) {
                     out[i].style.color = 'white';
                     out[i].style.backgroundColor = '#009688';
                     out[i].classList.add('correct');

                 } else {
                     out[i].style.color = 'white';
                     out[i].style.backgroundColor = '#e91e63';
                     out[i].classList.add('wrong');
                 }

             })
             let correct = document.querySelectorAll('.correct');
             let wrong = document.querySelectorAll('.wrong');


             // check if threr is tasks in local storage
             if (window.localStorage.getItem('scores')) {
                 scores = JSON.parse(localStorage.getItem('scores'));
             }
             //add score to local storage
             function addToLocalStorage() {
                 let history = {
                     name: player.value,
                     date: new Date().toISOString(),
                     score: correct.length,
                     all: box.length,
                     level: level.value
                 };
                 scores.push(history);

             }

             function addscoreToLocalSrorage(score) {
                 window.localStorage.setItem('scores', JSON.stringify(score))
             }
             addToLocalStorage();
             addscoreToLocalSrorage(scores);


             let msgOverly = document.createElement('div');
             msgOverly.className = 'overlay';

             let playAgain = document.createElement('div');
             playAgain.className = 'play-again';
             let text2 = document.createTextNode('Play Again!');
             playAgain.appendChild(text2);

             let score = document.createElement('div');
             score.className = 'score';
             let text3 = document.createTextNode('Your Score : ');
             let yourScore = document.createElement('span');
             yourScore.className = 'your-score';
             yourScore.innerHTML = correct.length + ' / ';
             let totalScore = document.createElement('span');
             totalScore.className = 'total-score';
             totalScore.innerHTML = out.length;
             score.appendChild(text3);
             score.appendChild(yourScore);
             score.appendChild(totalScore);

             let congrat = document.createElement('div');
             let congratSon = document.createElement('div');
             congrat.className = 'congrat';
             congratSon.className = 'congrat-son';


             let text1 = '';
             if (correct.length == box.length) {
                 text1 = document.createTextNode("CONGRATULATIOS")
             } else {
                 text1 = document.createTextNode("YOU LOOSE!");

                 //show correct answers for wrong results

                 let parentBox = document.querySelectorAll('.parent-box');

                 let correctionP = document.createElement('p');
                 correctionP.className = 'corretion-p';

                 let x = document.createElement('i');
                 x.classList.add("fa", "fa-times");


                 parentBox.forEach((parentB, i) => {
                     if (parentB.children[0].children[3].classList.contains('wrong')) {
                         correctionP.innerHTML = parseInt(num1[i].textContent) * parseInt(num2[i].textContent);

                         let copy = correctionP.cloneNode(true);
                         let copyx = x.cloneNode(true);

                         parentB.children[0].children[3].after(copyx);

                         parentB.prepend(copy);

                     }
                 })
             }
             congratSon.appendChild(text1);
             congrat.appendChild(congratSon);

             congrat.appendChild(playAgain);
             congrat.appendChild(score);
             msgOverly.appendChild(congrat)
             msgOverly.appendChild(playAgain);
             bigBox.appendChild(msgOverly);

             msgOverly.onclick = function() {
                 this.remove();
             }

         }
     }
 }

 document.addEventListener('click', function(e) {
     if (e.target == document.querySelector('.play-again')) {
         location.reload()
     }

 })

 let scoreArray = JSON.parse(localStorage.getItem('scores'))

 //create history page
 let historyBody = document.querySelector('.history-body');

 if (scoreArray) {
     scoreArray.forEach(function(score, i) {
         let history = document.createElement('div');
         history.className = 'history';


         let hName = document.createElement('p');
         hName.className = 'history-link';
         hName.innerHTML = score.name;

         let hDate = document.createElement('p');
         hDate.className = 'history-link';
         hDate.innerHTML = score.date;

         let hlevel = document.createElement('p');
         hlevel.classList.add('history-link', 'history-level');
         hlevel.innerHTML = score.level;

         let hScore = document.createElement('p');
         hScore.className = 'history-link';
         hScore.innerHTML = score.score + ' / ' + score.all;

         history.appendChild(hName);
         history.appendChild(hDate);
         history.appendChild(hlevel);
         history.appendChild(hScore);
         if (historyBody) {
             historyBody.appendChild(history);

         }

     })
 }

 //remove history from page and local storage
 let clearHistory = document.querySelector('.clear-history');
 if (clearHistory) {
     clearHistory.onclick = function() {
         localStorage.removeItem('scores');
         historyBody.innerHTML = ''
     }
 }

 function createBox(number) {
     for (let i = 0; i < number; i++) {
         let parentBox = document.createElement('div');
         parentBox.classList.add("parent-box");

         let box = document.createElement('div');
         box.classList.add("box", "rtl");


         let firstP = document.createElement('p');
         firstP.className = 'first'

         let secondP = document.createElement('p');
         secondP.className = 'second'

         let answerInput = document.createElement('input');
         answerInput.className = 'out';
         answerInput.setAttribute('min', 1);
         answerInput.setAttribute('type', 'number');

         box.appendChild(firstP);
         let x = document.createElement('i');
         x.classList.add("fa", "fa-times");
         box.append(x);
         box.appendChild(secondP);
         box.appendChild(document.createTextNode(' = '));
         box.appendChild(answerInput);
         parentBox.appendChild(box)
         document.querySelector('.sec').appendChild(parentBox);
     }

 }