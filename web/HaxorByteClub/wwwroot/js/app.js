let zIndex = 100; // Start with an arbitrary value for z-index


window.setupDragElement = function (id) {
	var elmnt = document.getElementById(id);
	var startX = 0, startY = 0, initialX = 0, initialY = 0;
	var header = elmnt.querySelector('.header');
	header.onmousedown = dragMouseDown;

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
	var audio = new Audio(url);
	audio.play();
}

window.playPauseAudio = function () {
	var audio = document.querySelector('audio');
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}
}