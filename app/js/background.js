chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action === "showIcon") {
			chrome.pageAction.show(sender.tab.id);
		}
	}
);