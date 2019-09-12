
window.onload = function() {
	console.log('Eli...');
	injectCustomJs('avocado/index.js');
}

function injectCustomJs(jsPath)
{
    if (!jsPath) return;
    
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/avocado/index.js
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function()
    {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
    };
    document.head.appendChild(temp);
}