(function (){
	// show icon
	chrome.runtime.sendMessage({action: "showIcon"}, function(response) {});
	
	var userConfig;

	// document ready
	$(function() {
		console.info("bdtv is running");
		initComponent.then(function () {
			initConfig();
			initPage();



			$("#yc-dark-switch-label").on('click',function () {
				toggleDark();
			});
		});
	});

	var initComponent = new Promise (
		function (resolve, reject) {
			chrome.runtime.sendMessage(
				{action: "queryConfig"},
				function(response) {
					userConfig = response.config;
					var modal = '<div id="modalWrap" style="display:none;"></div>';
					var modalURL = chrome.extension.getURL('../html/modal.html');

					$("body").append(modal);
					$( "#modalWrap" ).load( modalURL, function () {
						var trigger = '<li class="fl bdtv-trigger">'+
							'<a href="#modal" rel="modal:open">鱼刺</a>'+
							'</li>';

						if ($(".header_nav").length) 
							$(".header_nav").append(trigger);
						else 
							$(".head-nav").append(trigger);

						resolve("Component initialized");
					} );

				}
			);

		}
	); 

	function toggleDark () {
		userConfig.darkMode = !userConfig.darkMode;
		if (userConfig.darkMode) {
			console.info("applyDarkCSS");
			applyDarkCSS();
		} else {
			//removeDarkCSS();
		}
		updateConfig();
	}

	function initPage () {
		console.info("initPage()");
		console.info(userConfig);
		removeAD();
		if (userConfig.darkMode) 
			applyDarkCSS();
	}

	function removeAD () {
		$("#chat-top-ad").remove();
		$("#main_col_box").addClass('yc-fix-top-margin');
		$("#right_col").addClass('yc-fix-top-margin');
		$("#main_col").addClass('yc-fix-main_col-top-margin');
		//$("#sign_p_15").remove();
		//$("#sign_p_18").remove();
		$(".sign_posid").remove();
		$("#dy_bottom_shadow").remove();
		$(".chat-right-ad").remove();
	}

	function applyDarkCSS () {
		console.info("in applyDarkCSS");
		$("#room_container").addClass('yc-dark-5');
		$("#live_userinfo").addClass('yc-dark-4');
		$("#live_userinfo").attr('style', 'background-color: #424242 !important');
		$(".headline h1").addClass('yc-dark-font-color');
		$(".r_else li").attr('style', 'color: #9E9E9E !important');
		$(".redcolor").addClass('yc-dark-font-color');
		$("#room_tags").addClass('yc-dark-font-color');
		$(".room_mes .r_else_tips dd a").addClass('yc-dark-font-color');
		$("#live_videobar").addClass('yc-dark-4');
		$("#header").addClass('yc-dark-4');
		$("#header a").addClass('yc-dark-font-color-lighter');
		$("#chat_lines").attr('style', 'background-color: black !important');
		$(".text_cont").addClass('yc-dark-font-color-lighter');
		$("#js_chat_mem").addClass('yc-dark-4');
		$(".chat_mem_t").addClass('yc-dark-4');
		$(".m_cnt").attr('style', 'background-color: #757575 !important');
		$(".m_cnt a").addClass('yc-dark-font-color');
		$("#broadcast_div").addClass('yc-dark-4');
		$(".c_speak").attr('style', 'background-color: #212121 !important');
		$(".chat-n-tit h3").addClass('yc-dark-font-color');
		$(".chat-live-rec .title h3").addClass('yc-dark-font-color');
		$(".chat-live-rec .cont ul li a .txt h4").addClass('yc-dark-font-color');

	}

	function initConfig () {
		console.info("initConfig()");
		console.info(userConfig);
		//update ui
		$("#yc-ad-switch").prop( "checked", userConfig.ADBlock );
		$("#yc-dark-switch").prop( "checked", userConfig.darkMode );
		$("#yc-chat-switch").prop( "checked", userConfig.hideChat );
	}

	function updateConfig () {
		console.info("updating...");
		chrome.runtime.sendMessage(
			{ action: "updateConfig", config: userConfig },
			function(response) {}
		);
	}

})();