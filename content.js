(function() {
	var setLinkToElement = function(obj){
		if (obj.getAttribute("extGoogleCalendaCopyOnSet") == null) {
			obj.setAttribute("extGoogleCalendaCopyOnSet", 1);

			var sep = document.createTextNode(' | ');
			obj.appendChild(sep);

			var link = document.createElement('a');
			link.href = "javascript:void(0);";
			link.appendChild( document.createTextNode("Copy") );
			link.onclick = function(){/* Event - OnClick a link */
				/* .eb-footer > * */
				var parent_childs = link.parentNode.parentNode.childNodes;
				for(var i = 0, m = parent_childs.length; i < m; i++){
					if(hasClass( parent_childs[i], 'eb-actions-right')){
						var childs = parent_childs[i].childNodes;
						for(var i = 0, m = childs.length; i < m; i++){
							if(childs[i].id.match(/.*details/)){
								/* Open event detail */
								childs[i].click();
								var timer_ = window.setInterval(function(){
									if(isLoadedEventDetail){
										window.clearInterval(timer_);
										window.setTimeout(copyItemOnEventDetail, 500);
									}
								}, 200);
							}
						}
						break;
					}
				}
			};
			obj.appendChild(link);
		}
	};

	var isLoadedEventDetail = function(){
		var load_ind = document.getElementsById('lo-c');
		if(load_ind != null  && load_ind.style.display == "none"){
			return true;
		}
		return false;
	};

	var copyItemOnEventDetail = function(){
		console.log("copyItemOnEventDetail");
		/* .prefselect */
		var objs = document.getElementsByClassName('prefselect');
		for(var i = 0, m = objs.length; i < m; i++){
			var dropdown = objs[i];
			if(typeof dropdown == 'undefined' || typeof dropdown.length == 'undefined'){
				continue;
			}
			for(var i = 0, m = dropdown.length; i < m; i++){
				var item = dropdown[i];
				if(item.value.match(/\:.+\.kc/)){
					/* Select "copy a item" from dropdown */
					dropdown.value = item.value;
					window.setTimeout(saveItemOnEventDetail, 500);
					var evt = document.createEvent("HTMLEvents");
					evt.initEvent('change', true, true );
					dropdown.dispatchEvent(evt);
					break;
				}
			}
		}
	};

	var saveItemOnEventDetail = function(){
		console.log("saveItemOnEventDetail");
		var objs = document.getElementsByClassName('action-btn-wrapper');
		for(var i = 0, m = objs.length; i < m; i++){
			var button = objs[i];
			if(typeof button != 'undefined' && button.id != null && button.id.match(/\:.+\.save_top/)){
				/* #**.save_top > div */
				button = button.childNodes[0];
				/* Click save button */
				console.log("Click save button");
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				button.dispatchEvent(evt);
				break;
			}
		}
	};

	var timer = window.setInterval(function() {
		/* .bubblecontent */
		var objs = document.getElementsByClassName('bubblecontent');
		for(var i = 0, m = objs.length; i < m; i++){
			if(typeof objs[i] == 'undefined' || typeof objs[i].childNodes == 'undefined'){
				continue;
			}
			if(objs[i].childNodes != null && objs[i].childNodes[0] != null){
				/* .bubblecontent > div > * */
				var childs = objs[i].childNodes[0].childNodes;
				for(var i = 0, m = childs.length; i < m; i++){
					if(hasClass(childs[i], 'eb-root')){
						/* .bubblecontent > div > .eb-root */
						var childs = childs[i].childNodes;
						for(var i = 0, m = childs.length; i < m; i++){
							if(hasClass(childs[i], 'eb-footer')){
								/* .bubblecontent > div > .eb-root > eb-footer */
								var childs = childs[i].childNodes;
								for(var i = 0, m = childs.length; i < m; i++){
									if(hasClass(childs[i], 'eb-actions-left')){
										/* .bubblecontent > div > .eb-root > .eb-footer > .eb-actions-left */
										setLinkToElement(childs[i]);
										break;
									}
								}
								break;
							}
						}
						break;
					}
				}
			}
		}
	}, 500);

	var hasClass = function( elem, klass ) {
		return (" " + elem.className + " " ).indexOf( " "+klass+" " ) > -1;
	};
})();
