(function (){
	// show icon
	chrome.runtime.sendMessage({action: "showIcon"}, function(response) {});
	chrome.runtime.sendMessage({action: "queryConfig"}, function(response) {});

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.action === "initConfig") {
			console.log("reciving config");
			console.log(request.config);
			initConfig(request.config);
		}	
	});

	var userConfig;

	// document ready
	$(function() {
		initComponent.then(function () {
			$("#test").on('click',function () {
				$("#wrap").css("background-color","grey");
			});
		});
	});

	var initComponent = new Promise (
		function (resolve, reject) {
			var modal = '<div id="modalWrap" style="display:none;"></div>';
			var modalURL = chrome.extension.getURL('../html/modal.html');

			$("body").append(modal);
			$( "#modalWrap" ).load( modalURL );

			var trigger = '<li class="fl bdtv-trigger">'+
				'<a href="#modal" rel="modal:open">鱼刺</a>'+
				'</li>';

			if ($(".header_nav").length) 
				$(".header_nav").append(trigger);
			else 
				$(".head-nav").append(trigger);

			resolve("Component initialized");
		}
	); 

	function initConfig (cfg) {
		userConfig = cfg;
		//update ui
		console.log(userConfig);
		$("#yc-ad-switch").prop( "checked", userConfig.ADBlock );
		$("#yc-dark-switch").prop( "checked", userConfig.darkMode );
		$("#yc-chat-switch").prop( "checked", userConfig.hideChat );
	}

	function updateConfig (key, value) {
		// body...
	}

})();