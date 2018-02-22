
var src = 'https://s3.amazonaws.com/freecodecamp/simonSound';
var strict = false;
var start = false;
var power = false;
var winStep = 8;
var playt;
var reactt;
var got;
var errt;




function reset(){
  
  initial();
  readyGo();
}

function initial(){
  if(playt) clearTimeout(playt);
  if(reactt) clearTimeout(reactt);
  if(got) clearTimeout(got);
  if(errt) clearTimeout(errt);

  step = 0;
  setArr=[];
  resArr=[];
  correct =false;
}

function readyGo(){
  play();
  react();
  got = setTimeout(function(){
    if(correct){
      if(step == winStep) {
        confirm('Amazing! You win the game!');
        reset();
      }
      else readyGo();
    }
    else{
      if(strict) {reset();}
      else errOccur();
   }
  },4100+3000*(step-1));
}

function errOccur(){
  playSetTunes(setArr,0);
  react();
  errt = setTimeout(function(){
    if(!correct){
      
      errOccur();
    }
    else readyGo();
  },4100+3000*(step-1));
}

function play(){
  step++;
  genTune();
  playSetTunes(setArr,0); 
}

function react(){
 
  resArr = [];
  
  
   reactt = setTimeout(function(){
     
    if(setArr.toString()==resArr.slice(-setArr.length).toString()){
     correct = true; 
      
    }
    else{
     correct = false;
    } 
  },4000+3000*(step-1));
}



function genTune(){
    var item = Math.ceil(Math.random()*4);
    setArr.push(item);
}


function togglePwr(){
  initial();
  $('.count').text('--');
  power = !power;
  $(".switch-slot").toggleClass('left'); 
  $(".count").toggleClass('led-on');
  $('.start').toggleClass('clickable');
  if(!power) {
    if(strict) toggleStrict();
   }
}

function toggleStrict(){
  strict = !strict;
  $(".indic").toggleClass('bright');
}


function playSetTunes(arr,i){

 $('.count').text(step);
  playTune(arr[i]);
  var len = arr.length;
  i++;
  if(i < len){
    playt = setTimeout(function(){playSetTunes(arr,i)},1000);
  }
}
    
function playTune(id){
  $('#'+id).addClass("light");
  var audio = new Audio(src+id+'.mp3');
  
  audio.play();
  setTimeout(function(){
   $('#'+id).removeClass("light"); 
  },300);
  
 resArr.push(id);
}