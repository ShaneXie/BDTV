(function (){
	// show icon
	chrome.runtime.sendMessage({action: "showIcon"}, function(response) {});

	// document ready
	$(function() {
		alert("run on index???");
		var trigger = '<li class="fl bdtv-trigger">'+
			'<a href="#">鱼刺</a>'+
			'</li>';
		if ($(".header_nav").length) 
			$(".header_nav").append(trigger);
		else 
			$(".head-nav").append(trigger);
	});

})();