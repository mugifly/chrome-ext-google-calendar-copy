(function() {
	var timer = window.setInterval(function() {
		var o = document.getElementById(':1nfooterleft');
		if (o != null) {
			window.alert(o);
			window.clearInterval(timer);
		} else {
			console.log("Not...");
		}
	}, 1000);
})();