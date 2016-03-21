(function (){
	// show icon
	chrome.runtime.sendMessage({action: "showIcon"}, function(response) {});

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

	function getConfig () {

	}
	
	function updateConfig (key, value) {
		// body...
	}

})();