var body=document.getElementsByTagName('body')[0],
	requestText=document.createTextNode('Введіть точку початку зворотнього відліку:'),
	requestParagraph=body.appendChild(document.createElement('p')),
	minutesField=body.appendChild(document.createElement('input')),
	minutesUnit=body.appendChild(document.createElement('div')),
	secondsField=body.appendChild(document.createElement('input')),
	secondsUnit=body.appendChild(document.createElement('div')),
	minutesUnitText=document.createTextNode('хвилин'),
	secondsUnitText=document.createTextNode('секунд'),

	startButton=body.appendChild(document.createElement('button')),
	stopButton=body.appendChild(document.createElement('button')),
	continueButton=body.appendChild(document.createElement('button')),
	clearButton=body.appendChild(document.createElement('button')),

	startButtonText=document.createTextNode('Старт'),
	stopButtonText=document.createTextNode('Стоп'),
	continueButtonText=document.createTextNode('Продовжити'),
	clearButtonText=document.createTextNode('Cкинути'),

	timerBody=body.appendChild(document.createElement('div')),
	timerDisplay=document.createTextNode('00:00'),
	tick, 
	timerStopped=true, 
	timeMinutes, 
	timeSeconds,
	timerTextInside=document.createTextNode('before explosion'),
	timerText=document.createElement('div');

timerBody.appendChild(timerDisplay);
timerBody.style.height='48vh';
timerBody.style.padding='5vh';
timerBody.style.margin=0;
timerBody.style.textAlign='center';
timerBody.style.backgroundColor='red';
timerBody.style.fontSize='20vh';
timerBody.style.color='white';

requestParagraph.appendChild(requestText);
requestParagraph.style.display='block';
requestParagraph.style.textAlign='center';
requestParagraph.style.height='3vh';
requestParagraph.style.lineHeight='5vh';

minutesUnit.appendChild(minutesField);
minutesUnit.appendChild(minutesUnitText);
minutesUnit.style.display='block';
minutesUnit.style.textAlign='center';
minutesUnit.style.backgroundColor='green';
minutesUnit.style.height='8vh';
minutesUnit.style.padding=0;
minutesUnit.style.margin=0;


minutesField.style.margin='2vh';
minutesField.value='Введіть ціле число';

minutesField.onclick=function (){
	minutesField.value='';
}
minutesField.onblur=function (){
	if (minutesField.value=='')
		minutesField.value='Введіть ціле число';
}

secondsUnit.appendChild(secondsField);
secondsUnit.appendChild(secondsUnitText);
secondsUnit.style.display='block';
secondsUnit.style.textAlign='center';
secondsUnit.style.backgroundColor='yellow';
secondsUnit.style.height='8vh';
secondsUnit.style.padding=0;
secondsUnit.style.margin=0;

secondsField.style.margin='2vh';
secondsField.value='Введіть ціле число';

secondsField.onclick=function (){
	secondsField.value='';
}
secondsField.onblur=function (){
	if (secondsField.value=='')
		secondsField.value='Введіть ціле число';
}

startButton.appendChild(startButtonText);
startButton.style.display='block';
startButton.style.margin='1vh auto';
startButton.style.height='4vh';

stopButton.appendChild(stopButtonText);
stopButton.style.display='none';
stopButton.style.margin='1vh auto';
stopButton.style.height='4vh';

continueButton.appendChild(continueButtonText);
continueButton.style.display='none';
continueButton.style.margin='1vh auto';
continueButton.style.height='4vh';

clearButton.appendChild(clearButtonText);
clearButton.style.display='block';
clearButton.style.margin='1vh auto';
clearButton.style.height='4vh';

timerText.appendChild(timerTextInside);

function time() {
	if(timeMinutes+timeSeconds>=0) {
		timerBody.textContent='';
		if (timeMinutes<10 && timeSeconds<10) {
			timerDisplay=document.createTextNode('0'+timeMinutes+':'+'0'+timeSeconds);
		}
		else if (timeSeconds<10) {
			timerDisplay=document.createTextNode(timeMinutes+':'+'0'+timeSeconds);
		}
		else if (timeMinutes<10) {
			timerDisplay=document.createTextNode('0'+timeMinutes+':'+timeSeconds);
		}
		else {
			timerDisplay=document.createTextNode(timeMinutes+':'+timeSeconds);
		}
		timerBody.appendChild(timerDisplay);
		timerBody.appendChild(timerText);
		timerText.style.display='block';

		if (timeSeconds==0) {
			timeSeconds=59;
			timeMinutes--; 
		}
		else timeSeconds--;
	}
	if(timerDisplay.textContent=='00:00') {
			clearInterval(tick);
			var boom=document.createElement('img'),
				boomSound=new Audio('boomSound.mp3');
			boom.setAttribute('src','boomPicture.gif');
			boom.style.height='60vh';
			setTimeout(function(){
				//body.appendChild(boomSound);
				boomSound.play();
				body.removeChild(timerBody);
				body.appendChild(boom);
				timerBody.removeChild(timerText);
				startButton.style.display='block';
				stopButton.style.display='none';
				continueButton.style.display='none';
				timerStopped=true;
			},1000);

			setTimeout(function(){
				body.removeChild(boom);
				boomSound.pause();
				boomSound.currentTime=0.0;
				body.appendChild(timerBody);
				startButton.style.display='block';
				stopButton.style.display='none';
				continueButton.style.display='none';
				timerStopped=true;
			},5000);
		}

}
function timerRun(){
	
	var minutes=Number(minutesField.value), seconds=Number(secondsField.value);
	if (isNaN(minutes) 					|| 
		isNaN(seconds) 					|| 
		minutes%1!=0 					|| 
		seconds%1!=0					||
		minutesField.value==''			||
		secondsField.value==''			||
		seconds=='Введіть ціле число'  	||
		minutes=='Введіть ціле число'	||
		seconds=='0' && minutes=='0' 		) {
		alert ('Введіть цілі числа!');
	}
	else if  (minutes>3) {
		alert ('Не більше чотирьох хвилин!');
	}
	else if (seconds>59) {
		alert ('Число секунд не може бути быльше 59!');
	}
	else if (timerStopped){
		timeMinutes=minutes;
		timeSeconds=seconds;
		tick=setInterval(time,1000);

		startButton.style.display='none';
		stopButton.style.display='block';
		continueButton.style.display='block';
		timerStopped=false;
	}
}
function timerStop() {
	if (!timerStopped) {
		clearInterval(tick);
		stopButton.style.display='none';
		timerStopped=true;
	}
}
function timerContinue() {
	if (timerStopped) {
		tick=setInterval(time,1000);
		stopButton.style.display='block';
		timerStopped=false;
	}
}
function timerClear() {
	clearInterval(tick);
	timerBody.textContent='00:00';
	timerStopped=true;
	startButton.style.display='block';
	stopButton.style.display='none';
	continueButton.style.display='none';
}
startButton.addEventListener('click', timerRun,false);
stopButton.addEventListener('click', timerStop,false);
continueButton.addEventListener('click', timerContinue,false);
clearButton.addEventListener('click', timerClear,false);

