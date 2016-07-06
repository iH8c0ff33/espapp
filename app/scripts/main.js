if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(() => console.log('sw.js registered'));
}
var button = document.createElement('button');
var textNode = document.createTextNode('Click Me!');
button.appendChild(textNode);
button.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent';
componentHandler.upgradeElement(button);
document.getElementById('container').appendChild(button);
