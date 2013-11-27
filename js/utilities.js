var ppFramework = ppFramework || {};

ppFramework.Utilities = {
	
    vars:{},
    	
	init: function () {
		var o = ppFramework.Utilities,  
            v = o.vars;
            
		o.RouteHashbang.init(); 	
		
    }
    
}; 

/* 
*	Utility for getting and setting hashbang urls internally
*/ 

ppFramework.Utilities.RouteHashbang = {
	
    vars:{
	    toggleMode:true
    },
    	
	init: function () {
		var o = ppFramework.Utilities.RouteHashbang,  
            v = o.vars;
		
		// check for initial hash onLoad
		var params = o.getHashbang(); 
		
		if(params.length > 0) {
			o.hashbangChanged(params); 
		}
		
		$("body").on("click", "a", o.onLinkClick); 
					  	
    },
	
	onLinkClick: function(e){
		var o = ppFramework.Utilities.RouteHashbang;
		
		var $trigger = $(o.findParentLink(e.target)); 
		var params = o.getLinkHash($trigger); 
		
		if (params.length > 0){
			e.preventDefault(); 
			
			o.setHashbang(params); 
		}
		
		return true; 		
	}, 
	
	hashbangChanged: function (params){
		var o = ppFramework.Utilities.RouteHashbang;  
		
		params = params || o.getHashbang();
		
		var e = $.Event("HashbangChange");
		e.params = params; 

		$(window).trigger(e);	
	},
	        
    getHashbang: function() {

        var params = window.location.hash ? window.location.hash.substr(2).split("/") : [],
            response = [];

        for(var i = 0; i < params.length; i++) {
            if (params[i]) { 
	        	response.push(decodeURIComponent(params[i]));    
            }
        }
        
        return response; 
    }, 
        
    setHashbang: function(params) {		
		
		var o = ppFramework.Utilities.RouteHashbang,
			v = o.vars; 
		
		var str = [];
        for(var i = 0; i < params.length; i++) {
            str.push(encodeURIComponent(params[i]));
        }
        
		var hash = "#!/" + str.join("/");

        // if hash is actually the same- don't update history 
        if (window.location.hash != hash){
        	window.location.hash = hash;
        } else {
        	// TODO: vet this- I wonder if there is a better way
        	// toggle mode will remove the hash if it is active
	        if (v.toggleMode) {
		    	window.location.hash = "";
	        }
        }
        
        o.hashbangChanged(params);
               
    },         
                 
    getLinkHash: function($trigger) {
        
        var response = []; 
        
        if($trigger.attr("href") && $trigger.attr("href").length > 0){ 
        	
        	var params = $trigger.attr("href").substr(2).split("/")
	        for(var i = 0; i < params.length; i++) {
	            if (params[i]) { 
		        	response.push(params[i]);    
	            }
	        }
		}
        
        return response; 
    },
    
	findParentLink: function (element){
        var o = ppFramework.Utilities.RouteHashbang; 
        
        if(element.tagName === 'A') {
                return element;
        }
        
        if(element === document) {
                return false;
        }
        
        return o.findParentLink(element.parentNode);
    }
   
}; 
