// Ensure app namespace
var ppFramework = ppFramework || {};

(function ($) {

ppFramework.Main = {
    
    vars:{},

    init: function () {
		var o = ppFramework.Main,  
            v = o.vars;	
		
		// listen for hashbang change event 
		$(window).on("HashbangChange", o.onHashbangChange); 

		ppFramework.Utilities.init(); 
	},
	
	// handle hashbang change event
	onHashbangChange: function(e) {    
		var o = ppFramework.Main,  
            v = o.vars;	
		
		$(".grid-container").find(".active").removeClass("active"); 
		var $gridItem = $("#" + e.params[0]);
		$gridItem.addClass("active"); 		
	}
};

$(ppFramework.Main.init);

})(jQuery);