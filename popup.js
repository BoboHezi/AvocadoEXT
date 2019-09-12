
/*let changeColor = document.getElementById('changeColor');

changeColor.onclick = function(element) {
	var bg = chrome.extension.getBackgroundPage();
	console.log("12 + 8394 = " + bg.calculate(12, 8394));
	let color = element.target.value;
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'document.body.style.backgroundColor = "' + color + '";'});
	});
};*/

chrome.storage.sync.get('color', function(data) {
	/*console.log("get color.");
	changeColor.style.backgroundColor = data.color;
	changeColor.setAttribute('value', data.color);*/

	var bg = chrome.extension.getBackgroundPage();
	var dom = document.createElement('div');
	dom.innerHTML = bg.getDomString();
	document.body.appendChild(dom);

	var style = document.createElement('style');
	style.innerHTML = bg.getCssString();
	document.head.appendChild(style);
});