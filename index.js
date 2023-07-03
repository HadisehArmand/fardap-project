const reload = document.getElementById('reload');
var image = document.getElementById('myImage');
const filter = document.getElementById('filter');
const rsetfilter = document.getElementById('rsetfilter');
var zoomInButton = document.getElementById('zoomInBtn');
var zoomOutButton = document.getElementById('zoomOutBtn');

var scale = 1;
var originalScale = 1;

reload.addEventListener('click', () => {
    var xhr = new XMLHttpRequest();
    var names = ['Microsoft', 'Tesla', 'Samsung', 'Asus', 'Apple']
    var randomIndex = Math.floor(Math.random() * names.length);
    xhr.open('GET', 'https://api.api-ninjas.com/v1/logo?name=' + names[randomIndex], true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Api-Key', 'gEe44anVOHCsOxSog4cW8w==Di2fldfejCd7R3WF');
    xhr.responseType = 'json';
    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = xhr.response;
            var imageUrl = data[0]['image']
            image.src = imageUrl;
        } else {
            console.error('Request failed. Status: ' + xhr.status);
        }
    };
    xhr.onerror = function () {
        console.error('Request failed');
    };
    xhr.send();

});

filter.addEventListener('click', () => {
    image.style.filter = 'grayscale(100%)';
});


rsetfilter.addEventListener('click', () => {
    image.style.filter = 'grayscale(0%)';
});

zoomInButton.addEventListener('click', function () {
    scale += 0.1;
    image.style.transform = 'scale(' + scale + ')';
});

zoomOutButton.addEventListener('click', function () {
    scale -= 0.1;
    image.style.transform = 'scale(' + scale + ')';
});


image.addEventListener('mouseenter', function () {
    originalScale = getCurrentScale(image);
    image.style.transform = 'scale(1.7)';
});

image.addEventListener('mouseleave', function () {
    image.style.transform = 'scale(' + originalScale + ')';
});

function getCurrentScale(element) {
    var transform = window.getComputedStyle(element).getPropertyValue('transform');
    var matrix = transform.match(/^matrix\((.+)\)$/);

    if (matrix) {
        var matrixValues = matrix[1].split(', ');
        return parseFloat(matrixValues[0]);
    }

    return 1;
}

var overlayText = document.querySelector('.overlay-text');
var textInput = document.getElementById('watermarkText');
var setTextButton = document.getElementById('watermarkButton');

setTextButton.addEventListener('click', function() {
  overlayText.textContent = textInput.value;
});