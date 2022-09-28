setInterval(
	() =>{
		let server = document.querySelector(".name-3Uvkvr");
		let channel = document.querySelector(".title-17SveM").innerHTML;

		if (server) {
			server = server.innerHTML;
			channel = "%23" + channel;
		}
		else {
			server = "Direct Messages";
		}

		fetch(`http://127.0.0.1:6969/update?server=${server}&channel=${channel}`).catch(console.error);
	},
	1000 * 1
);