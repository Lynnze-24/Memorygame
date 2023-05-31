

// *********************game**********************


let pics;
let mistakes = 0;
let n ;
let firstCard,secondCard,firstIndex,secondIndex;
let lockCards = false;
let isFlipped = false;
const loading = document.querySelector('.loading');
const diff = document.querySelector('#level');
const cardList = document.querySelector('.cardList')
const checkBox = document.querySelector('input[name="theme"]');
const playButton = document.querySelector('.menu-container button');
const quit = document.querySelector('.quit');
const menu = document.querySelector('.menu');
let htmlElement = document.documentElement;


diff.addEventListener('change',checkDifficulty)
checkDifficulty();
darkMode();





checkBox.addEventListener("click",darkMode);


playButton.addEventListener('click', function(){
  mistakes= 0;
  menu.classList.add('play-game');
  loading.classList.add('game-start');
  resetBoard();
  gameReset();
  positioning();
  startGame();
 
 
})

quit.addEventListener('click', function(){
  menu.classList.remove('play-game');
  setTimeout(function(){
    loading.classList.remove('game-start');
  },500)
  resetBoard();
  removeCards(n);
  
  checkDifficulty();
})


function openModal(){
  document.querySelector('#resDialog').showModal()
  document.querySelector('#resDialog').classList.add('dialOpen')
}

function closeModal(e){
   document.querySelector('#resDialog').classList.remove('dialOpen')
   setTimeout(()=>{
    document.querySelector('#resDialog').close()
   },300)
}

function darkMode(){
  if (checkBox.checked) {
    htmlElement.classList.toggle("transition");
    htmlElement.setAttribute("data-theme", "dark");
  } else {
    htmlElement.classList.toggle("transition");
    htmlElement.setAttribute("data-theme", "light");
  }
}

function checkDifficulty(){
  if(diff.value=='easy'){
    n=8;
    cardList.classList.remove("pro")
  }
  else if(diff.value=='normal'){
    n=12;
    cardList.classList.remove("pro")
  }else if(diff.value=='pro'){
    n=16;
    cardList.classList.add("pro")
  }
}

function resetBoard(){
  [firstCard,secondCard,firstIndex,secondIndex] = [null,null,null,null];

  [lockCards,isFlipped]=[false,false];
}

function gameReset(){
  let allcards = document.querySelectorAll('.clicked-card');
  if(allcards.length){
    allcards.forEach(function(cardC){
      cardC.classList.remove('clicked-card');
    });
  }
    
}

function positioning(){
  cloneCard(n);
  let backs = document.querySelectorAll('.back');
  pics = randomArr(n);
    backs.forEach(function(back,i){
      back.style.backgroundImage=`url(img/${pics[i]}.jpg)`
      
    }
    )
}

function cloneCard(n){
  let card = document.querySelector('.cardList-card');
  for (i = 0; i < n; i++) { 
  
  let cardClone= card.cloneNode(true);
  
  card.parentNode.append(cardClone);
}

card.parentNode.removeChild(card);

}

function randomArr(n){
  const arr = [];
  let count=0;
  while(count < n){
    let a =Math.floor( Math.random() * (n/2)) + 1;
   
    let b = arr.filter(x=>!(x!=a));
  
    if (b.length < 2) {
      arr.push(a);
      count ++;
    }
    
  }
 
  return arr;
}

function startGame(){
  allFlip();
  let cards = document.querySelectorAll('.cardList-card');
  cards.forEach((card,index)=>{
    card.addEventListener('click',function (){
      if(lockCards) return;
      if(this==firstCard) return;
      
      
      if (!isFlipped){
        firstCard = this;
       
        isFlipped = true;
        firstIndex= index;
        firstCard.classList.add('clicked-card')
      }else{
       
        secondCard = this;
        secondIndex = index;
        lockCards=true;
        
        secondCard.classList.add('clicked-card')
      }
    
      flipCheck();
    
    
    });
  
  });
}


function allFlip(){
  let cards = document.querySelectorAll('.cardList-card');
 
  cards.forEach(function(card){
    card.classList.add('clicked-card');
  })

  setTimeout(function(){
    cards.forEach(function(card){
      card.classList.remove('clicked-card');
    });
   
  },1500);

}


function flipCheck(){
  if(secondCard){
     if(pics[firstIndex] != pics[secondIndex]){
       mistakes++;
       loseGame();
        setTimeout(function(){
          firstCard.classList.remove('clicked-card');
          secondCard.classList.remove('clicked-card');
        },500);
     } else{
      setTimeout(removeClicks,500);
      setTimeout(gameOver,500);
      
     }
     setTimeout(resetBoard,500);
  }

  

}

function removeClicks(){
  fClone = firstCard.cloneNode(true);
  
       firstCard.parentNode.replaceChild(fClone, firstCard);
       sClone = secondCard.cloneNode(true);
  
       secondCard.parentNode.replaceChild(sClone, secondCard);
}



function removeCards(n){
  let cards = document.querySelectorAll('.cardList-card');
  setTimeout(function(){
    for (i = 0; i < (n-1); i++) { 
  
      cards[i].parentNode.removeChild(cards[i]);
     
    }
  },500);
  
  
}

function loseGame(){
  if(mistakes > (n/2)){
   document.querySelector('#resDialog').classList.add('loser')
   document.querySelector('#resDialog h5').innerText =  "Sorry, you lose!";
   openModal()
  }
}

function gameOver(){
  let correctCards = document.querySelectorAll('.clicked-card');
  if (correctCards.length == n){
    document.querySelector('#resDialog h5').innerText = "Congratulations, you won!";
    document.querySelector('#resDialog').classList.remove('loser')
    openModal()
  }
}

function playAgain(){
    closeModal()
    setTimeout(()=>{
      menu.classList.remove('play-game');
      setTimeout(function(){
        loading.classList.remove('game-start');
      },500)
      removeCards(n);
    },500)
}


