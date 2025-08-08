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
		// Prevent drag if the target is a button or inside a button
		if (e.target.closest('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])')) {
			return;
		}

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

let audioPlayerRef;

window.initializeAudioPlayer = function (dotNetRef) {
	audioPlayerRef = dotNetRef;
};

window.playAudio = function (url) {
	stopEqualizer();
	if (document.querySelector('audio')) {
		document.querySelector('audio').remove();
	}
	var audio = document.createElement('audio');
	audio.src = url;
	audio.autoplay = true;
	audio.loop = false;
	audio.style.display = 'none';
	document.body.appendChild(audio);

	audio.addEventListener('timeupdate', function () {
		var progress = document.querySelector('.progress');
		var value = 0;
		if (audio.currentTime > 0) {
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		var currentTimeSpan = document.querySelector('.audio-current-time');
		if (currentTimeSpan) {
			currentTimeSpan.textContent = ('0' + Math.floor(audio.currentTime / 60)).slice(-2) + ':' + ('0' + Math.floor(audio.currentTime % 60)).slice(-2);
		}
		if (progress) {
			progress.style.width = value + '%';
		}
	});

	audio.addEventListener('ended', function () {
		if (audioPlayerRef) {
			audioPlayerRef.invokeMethodAsync('PlayNext');
		}
	});

	setTimeout(function () {
		animateEqualizer();
	}, 500);
};

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




window.setupIconDrag = function () {
	const icons = document.querySelectorAll(".desktop-icon");
	const columns = 2;
	const topPadding = 30;   // safe area at the top
	const edgePadding = 20;  // left/right/bottom padding
	const gutter = 10;       // spacing between rows/columns

	// Determine a consistent cell size so the grid aligns nicely
	const sizes = Array.from(icons).map(icon => ({
		w: icon.offsetWidth,
		h: icon.offsetHeight
	}));
	const cellWidth = Math.max(...sizes.map(s => s.w), 0);
	const cellHeight = Math.max(...sizes.map(s => s.h), 0);

	const shuffledIcons = Array.from(icons);
	for (let i = shuffledIcons.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledIcons[i], shuffledIcons[j]] = [shuffledIcons[j], shuffledIcons[i]];
	}

	shuffledIcons.forEach((icon, i) => {
		let isDragging = false;

		const col = i % columns;
		const row = Math.floor(i / columns);

		// Compute desired grid position
		const desiredLeft = edgePadding + col * (cellWidth + gutter);
		const desiredTop = topPadding + row * (cellHeight + gutter);

		// Keep inside viewport with edge padding
		const maxLeft = Math.max(edgePadding, window.innerWidth - icon.offsetWidth - edgePadding);
		const maxTop = Math.max(topPadding, window.innerHeight - icon.offsetHeight - edgePadding);

		const left = Math.min(desiredLeft, maxLeft);
		const top = Math.min(desiredTop, maxTop);

		icon.style.position = "absolute";
		icon.style.left = `${left}px`;
		icon.style.top = `${top}px`;
		icon.style.cursor = "pointer";

		// Drag-and-drop
		icon.addEventListener("mousedown", (e) => {
			isDragging = false;

			icon.style.cursor = "grab";

			let shiftX = e.clientX - icon.getBoundingClientRect().left;
			let shiftY = e.clientY - icon.getBoundingClientRect().top;

			const moveAt = (pageX, pageY) => {
				isDragging = true;
				const newX = Math.max(edgePadding, Math.min(pageX - shiftX, window.innerWidth - icon.offsetWidth - edgePadding));
				const newY = Math.max(topPadding, Math.min(pageY - shiftY, window.innerHeight - icon.offsetHeight - edgePadding));
				icon.style.left = `${newX}px`;
				icon.style.top = `${newY}px`;
			};

			const onMouseMove = (e) => {
				icon.style.cursor = "grabbing";
				moveAt(e.pageX, e.pageY);
			};

			const onMouseUp = () => {
				document.removeEventListener("mousemove", onMouseMove);
				document.removeEventListener("mouseup", onMouseUp);
				icon.style.cursor = "pointer";
			};

			document.addEventListener("mousemove", onMouseMove);
			document.addEventListener("mouseup", onMouseUp);
		});

		// Prevent click after drag
		icon.addEventListener("click", (e) => {
			if (isDragging) e.stopImmediatePropagation();
		});

		icon.ondragstart = () => false;
	});
};


// Terminal-specific functions
window.focusElement = function (element) {
	if (element) {
		element.focus();
	}
};

window.scrollToBottom = function (element) {
	if (element) {
		element.scrollTop = element.scrollHeight;
	}
};