chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({color: '#3aa757'}, function() {
		ajaxRequest(cssUrl, function(result) {
			cssString = result;
		});
		ajaxRequest(infoUrl, function(result) {
			stationsObject = JSON.parse(result);
		});
		ajaxRequest(domUrl, function(result) {
			domString = result;
		});
	});

	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {hostEquals: 'www.baidu.com'},})
			],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});

	chrome.contextMenus.create({
		title: "Please click me!",
		onclick: function() {alert("oh yeah, just like that.")}
	});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request, sender, sendResponse);
	sendResponse('This is background.js, we heared you.');
});

function calculate(var1, var2) {
	return var1 + var2;
}

function getStations() {
	return stationsObject;
}

function getCssString() {
	return cssString;
}

function getDomString() {
	return domString;
}

var stationsObject;
var cssString;
var domString;

var infoUrl = "https://raw.githubusercontent.com/BoboHezi/Util/master/stations.json";
var cssUrl  = "https://raw.githubusercontent.com/BoboHezi/Util/CRX/style.css";
var domUrl  = "https://raw.githubusercontent.com/BoboHezi/Util/master/dom.html";

function ajaxRequest(url, callback) {
	var xmlHttp;
	if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	} else {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			callback(xmlHttp.responseText);
		}		
	}

	xmlHttp.open("GET", url, true);
	xmlHttp.send();
}