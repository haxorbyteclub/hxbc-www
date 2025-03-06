let zIndex = 100; // Start with an arbitrary value for z-index


window.setupDragElement = function (id) {
	var elmnt = document.getElementById(id);
	var startX = 0, startY = 0, initialX = 0, initialY = 0;
	var header = elmnt.querySelector('.title-bar');
	header.onmousedown = dragMouseDown;

	const maxX = window.innerWidth - 400; // Assuming the width of the window is 300px
	const maxY = window.innerHeight - 400; // Assuming a rough height for the window
	const randomX = Math.floor(Math.random() * Math.max(1, maxX));
	const randomY = Math.floor(Math.random() * Math.max(1, maxY));

	elmnt.style.transform = `translate(${randomX}px, ${randomY}px)`;

	header.addEventListener('touchstart', dragMouseDown);
	header.addEventListener('touchmove', elementDrag);
	header.addEventListener('touchend', closeDragElement);

	function dragMouseDown(e) {
		e.preventDefault();
		// Bring the current window to the front
		elmnt.style.zIndex = zIndex++;

		if (e.type === 'touchstart') {
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
		} else {
			startX = e.clientX;
			startY = e.clientY;
		}

		let transform = getComputedStyle(elmnt).transform;
		if (transform !== 'none') {
			let matrix = new DOMMatrixReadOnly(transform);
			initialX = matrix.m41;
			initialY = matrix.m42;
		}

		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e.preventDefault();
		let clientX, clientY;
		if (e.type === 'touchmove') {
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
		} else {
			clientX = e.clientX;
			clientY = e.clientY;
		}

		let deltaX = clientX - startX;
		let deltaY = clientY - startY;

		let newX = initialX + deltaX;
		let newY = initialY + deltaY;

		newX = Math.max(0, Math.min(newX, window.innerWidth - elmnt.offsetWidth));
		newY = Math.max(0, Math.min(newY, window.innerHeight - elmnt.offsetHeight));

		elmnt.style.transform = `translate(${newX}px, ${newY}px)`;
	}

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
		document.ontouchend = null;
		document.ontouchmove = null;
	}
}

window.bringToFront = function (id) {
	const elmnt = document.getElementById(id);
	elmnt.style.zIndex = zIndex++;
}

// Additionally, to bring a window to front when clicked, not just when dragged
document.addEventListener('click', function (e) {
	if (e.target.classList.contains('draggable') || e.target.closest('.draggable')) {
		let targetEl = e.target.closest('.draggable');
		targetEl.style.zIndex = zIndex++;
	}
}, true);


function updateTimeAndDate() {
	const dateElement = document.getElementById('currentDate');
	const timeElement = document.getElementById('currentTime');
	const now = new Date();
	dateElement.textContent = now.toLocaleDateString();
	timeElement.textContent = now.toLocaleTimeString();
}

window.setupClock = function () {

	setInterval(updateTimeAndDate, 1000); // Update the date and time every second
	updateTimeAndDate(); // Initial call to display the date and time
}

window.playAudio = function (url) {
	stopEqualizer();
	if (document.querySelector('audio')) {
		document.querySelector('audio').remove();
	}
	var audio = document.createElement('audio');
	audio.src = url;
	audio.autoplay = true;
	audio.loop = true;
	audio.style.display = 'none';
	document.body.appendChild(audio);

	audio.addEventListener('timeupdate', function () {
		//update .progress width
		var progress = document.querySelector('.progress');
		var value = 0;
		if (audio.currentTime > 0) {
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		var currentTimeSpan = document.querySelector('.audio-current-time');
		if (currentTimeSpan) {
			currentTimeSpan.textContent = ('0' + Math.floor(audio.currentTime / 60)).slice(-2) + ':' + ('0' + Math.floor(audio.currentTime % 60)).slice(-2);
		}
		progress.style.width = value + '%';
	});
	//start with delay
	setTimeout(function () {
		animateEqualizer();
	}, 500);

}

window.stopAudio = function () {
	stopEqualizer();
	if (document.querySelector('audio')) {
		document.querySelector('audio').remove();
	}
}

window.playPauseAudio = function () {
	var audio = document.querySelector('audio');
	if (audio.paused) {
		audio.play();
		animateEqualizer();

	} else {
		audio.pause();
		stopEqualizer();
	}
}

var intervalIds = [];

function animateEqualizer() {
	// Clear existing intervals
	intervalIds.forEach(clearInterval);
	intervalIds = [];

	var bars = document.querySelectorAll('.bar');
	bars.forEach(function (bar) {
		var intervalId = setInterval(function () {
			bar.style.height = Math.floor(Math.random() * 100) + '%';
		}, Math.floor(Math.random() * 800));
		intervalIds.push(intervalId);
	});
}

function stopEqualizer() {
	console.log('Stopping equalizer');
	intervalIds.forEach(clearInterval);
	intervalIds = [];
	var bars = document.querySelectorAll('.bar');
	bars.forEach(function (bar) {
		bar.style.height = '0%';
	});
}


// Handle window resize
window.addEventListener('resize', function () {
	const draggableElements = document.querySelectorAll('.draggable');
	draggableElements.forEach(elmnt => {
		let transform = getComputedStyle(elmnt).transform;
		if (transform !== 'none') {
			let matrix = new DOMMatrixReadOnly(transform);
			let currentX = matrix.m41;
			let currentY = matrix.m42;

			let newX = Math.min(currentX, window.innerWidth - elmnt.offsetWidth);
			let newY = Math.min(currentY, window.innerHeight - elmnt.offsetHeight);

			elmnt.style.transform = `translate(${newX}px, ${newY}px)`;
		}
	});
});


window.changeBackground = function (cssClass) {
	var wallpaper = document.getElementById('wallpaper');
	wallpaper.classList = '';
	wallpaper.classList.add(cssClass);
}

window.triggerDownload = function (url) {
	const link = document.createElement('a');
	link.href = url;
	link.download = url.substring(url.lastIndexOf('/') + 1);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

