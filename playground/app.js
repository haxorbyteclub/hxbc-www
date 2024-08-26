let zIndex = 100; // Start with an arbitrary value for z-index

document.getElementById('addButton').addEventListener('click', function () {
	createNewWindow();
});

function createNewWindow() {
	const newWindow = document.createElement('div');
	newWindow.className = 'draggable';
	newWindow.style.zIndex = zIndex++; // Set initial z-index and increment
	newWindow.innerHTML = `
        <div class="header">
            <span>Drag Me</span>
            <button class="close-btn">&times;</button>
        </div>
        <div class="content">
            <p>This is a draggable and closable sub window!</p>
        </div>
    `;
	document.body.appendChild(newWindow);
	dragElement(newWindow);

	const closeButton = newWindow.querySelector('.close-btn');
	closeButton.onclick = function () {
		newWindow.remove();
	};
}

function dragElement(elmnt) {
	var startX = 0, startY = 0, initialX = 0, initialY = 0;
	var header = elmnt.querySelector('.header');
	header.onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		e.preventDefault();
		// Bring the current window to the front
		elmnt.style.zIndex = zIndex++;

		startX = e.clientX;
		startY = e.clientY;

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
		let deltaX = e.clientX - startX;
		let deltaY = e.clientY - startY;

		let newX = initialX + deltaX;
		let newY = initialY + deltaY;

		newX = Math.max(0, Math.min(newX, window.innerWidth - elmnt.offsetWidth));
		newY = Math.max(0, Math.min(newY, window.innerHeight - elmnt.offsetHeight));

		elmnt.style.transform = `translate(${newX}px, ${newY}px)`;
	}

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
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

setInterval(updateTimeAndDate, 1000); // Update the date and time every second