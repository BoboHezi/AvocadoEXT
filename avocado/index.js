/*标记变量*/
var ctrlKey = false;
var alttKey = false;
var BKey = false;
var EKey = false;
var fighting = false;
/*DOM对象*/
var popArea;
var body;
var box;
var popdiv;
/*使用变量（信息）*/
var stationsObject;
var stationsLength;
var infoUrl = "https://raw.githubusercontent.com/BoboHezi/Util/master/stations.json";
var cssUrl  = "https://raw.githubusercontent.com/BoboHezi/Util/master/style.css";
var domUrl  = "https://raw.githubusercontent.com/BoboHezi/Util/master/dom.html";
var cssString;
var domString;
window.onload = function() {
	console.log("eli...");
	body = document.getElementsByTagName('body')[0];
	popdiv = document.getElementById("popdiv");
	ajaxRequest(infoUrl);
	ajaxRequest(cssUrl);
	ajaxRequest(domUrl);
	/*box = document.getElementById("box");
	document.getElementById("close-btn").onclick = function() {
		end();
	}

	document.getElementById("start").onclick = function() {
		box.style.animation    = "box-moveSide 1s ease-out forwards";
		popdiv.style.animation = "box-alpha 1s ease-out forwards";
		fightingFor();
	}*/
}

function begin() {
	fighting = true;
	var size = getWindowSize();
	loadHtml(domString);
	loadCss(cssString);
	popArea.style.height =  size[1] + "px";
	resetPosition(size[0]);
}

function end() {
	fighting = false;
	//unLoadHtml();
}

function fightingFor() {
	var fromStaName = document.getElementById("input-from").value;
	var toStaName   = document.getElementById("input-to").value;
	var time        = document.getElementById("input-time").value;
	console.log("form " + fromStaName + " to " + toStaName + ", at " + time);
	
	var fromCode;
	var toCode;

	for (var index in stationsObject) {
		var name = stationsObject[index].name;
		if (name == fromStaName) {
			fromCode = stationsObject[index].code;
		} else if (name == toStaName) {
			toCode = stationsObject[index].code;
		}
	}

	console.log("form " + fromCode + " to " + toCode + ", at " + time);
}

function ajaxRequest(url) {
	var xmlHttp;
	if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	} else {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			switch (url) {
				case infoUrl:
					stationsObject = eval("(" + xmlHttp.responseText + ")");
					break;

				case cssUrl:
					cssString = xmlHttp.responseText;
					break;

				case domUrl:
					domString = xmlHttp.responseText;
				break;

				default:
				break;
			}
		}
	}

	xmlHttp.open("GET", url, true);
	xmlHttp.send();
}

function getWindowSize() {
	var windowWidth;
	var windowHeight;

	if (window.innerWidth) {
		windowWidth = window.innerWidth;
	} else if ((document.body) && (document.body.clientWidth)) {
		windowWidth = document.body.clientWidth;
	}

	if (window.innerHeight) {
		windowHeight = window.innerHeight;
	} else if ((document.body) && (document.body.clientHeight)) {
		windowHeight = document.body.clientHeight;
	}

	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	}

	var arr = new Array();
	arr[0] = windowWidth;
	arr[1] = windowHeight;

	return arr;
}

function loadHtml(html) {
	var eliDom = document.createElement("div");
	eliDom.setAttribute("id", "pop");
	eliDom.innerHTML = html;
	body.appendChild(eliDom);
	popArea = document.getElementById("popdiv");
	box     = document.getElementById("box");
	popdiv  = document.getElementById("popdiv");
}

function unLoadHtml() {
	var eliDom = document.getElementById("pop");
	body.removeChild(eliDom);
}

function loadCss(css) {
	var style = document.createElement("style");
	style.innerHTML = css;
	body.appendChild(style);
}

function resetPosition(windowWidth) {
	box.style.width = (windowWidth - 980) / 2 + "px";
}