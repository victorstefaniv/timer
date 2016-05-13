var body = document.getElementsByTagName('body')[0],
minutesField = document.getElementById('minutesField'),
secondsField = document.getElementById('secondsField'),
startButton=document.getElementById('startButton'),
stopButton=document.getElementById('stopButton'),
continueButton=document.getElementById('continueButton'),
clearButton=document.getElementById('clearButton'),
startButtonText=document.getElementById('startButton'),
stopButtonText=document.getElementById('stopButton'),
continueButtonText=document.getElementById('continueButton'),
clearButtonText=document.getElementById('clearButton'),
timerBody=document.getElementById('timerBody'),
timerText=document.getElementById('timerText'),
boomSound=document.getElementsByTagName('audio')[0],
countdown, timerStopped=true, minutes, seconds;

minutesField.onclick=function() {
	minutesField.value='';
	minutesField.placeholder='';
}
secondsField.onclick=function() {
	secondsField.value='';
	secondsField.placeholder='';
}
minutesField.onblur=function() {
	if (minutesField.value=='')
		minutesField.placeholder='Введіть ціле число';
}
secondsField.onblur=function() {
	if (secondsField.value=='')
		secondsField.placeholder='Введіть ціле число';
}
function validate() {
	if (    isNaN(minutes) || minutes%1!=0 || minutesField.value=='' ||
		isNaN(seconds) || seconds%1!=0 || secondsField.value=='' ||
		(seconds==0 && minutes==0)||seconds<0||minutes<0) {
		alert ('Введіть цілі числа!');
		return false;
	} else if  (minutes>3) {
		alert ('Не більше чотирьох хвилин!');
		return false;
	} else if (seconds>59) {
		alert ('Число секунд не може бути більше 59!');
		return false;
	} else return true;
}
function boom() {
	var boom=document.createElement('img');
	boom.setAttribute('src','boomPicture.gif');
	timerBody.style.display='none';
	timerText.style.display='none';
	body.appendChild(boom);
	boomSound.play();
}
function stopBoom() {
	var boom=document.getElementsByTagName('img')[0];
	startButton.style.display='block';
	stopButton.style.display='none';
	timerBody.style.height='50vh';
	timerBody.style.display='block';
	body.removeChild(boom);
	boomSound.pause();
	boomSound.currentTime=0.0;
}
function count() {
	if(minutes>=0 && seconds>=0) {
		if (minutes<10 && seconds<10) {
			timerBody.textContent='0'+minutes+':'+'0'+seconds;
		}
		else if (seconds<10) {
			timerBody.textContent=minutes+':'+'0'+seconds;
		}
		else if (minutes<10) {
			timerBody.textContent='0'+minutes+':'+seconds;
		}
		else {
			timerBody.textContent=minutes+':'+seconds;
		}
		if (seconds==0) {
			seconds=59;
			minutes--; 
		}
		else seconds--;
	} else {
		timerBody.textContent='00:00';
		clearInterval(countdown);
		setTimeout(boom,1000);
		setTimeout(stopBoom,5000);
		timerStopped=true;
	}
}
function startCountdown() {
	if (timerStopped) {
		minutes=Number(minutesField.value);
		seconds=Number(secondsField.value);
		if (validate()) {
			startButton.style.display='none';
			stopButton.style.display='block';
			continueButton.style.display='none';
			clearButton.style.display='none';
			timerStopped=false;
			countdown=setInterval(count,1000);
			timerText.style.display='block';
			timerBody.style.height='25vh';
		}
	}
}
function stopCountdown() {
	if (!timerStopped) {
		continueButton.style.display='block';
		stopButton.style.display='none';
		clearButton.style.display='block';
		clearInterval(countdown);
		timerStopped=true;
	}
}
function continueCountdown() {
	if (timerStopped) {
		startButton.style.display='none';
		stopButton.style.display='block';
		clearButton.style.display='none';
		continueButton.style.display='none';
		countdown=setInterval(count,1000);
		timerStopped=false;
	}
}
function clearCountdown() {
	if (timerStopped) {
		startButton.style.display='block';
		stopButton.style.display='none';
		clearButton.style.display='none';
		continueButton.style.display='none';
		clearInterval(countdown);
		timerBody.textContent='00:00';
		timerText.style.display='none';
		timerBody.style.height='50vh';
		timerStopped=true;
	}
}
startButton.addEventListener('click', startCountdown,false);
stopButton.addEventListener('click', stopCountdown,false);
continueButton.addEventListener('click', continueCountdown,false);
clearButton.addEventListener('click', clearCountdown,false);
