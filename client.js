/**
 * Copyright © 2022 Mekal Covic
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWAR
 */

const parameters = {
  method: 'GET' ,
  mode : 'no-cors',
  headers: {
      'Content-Type': 'application/json',
      'Origin': ''
  }
};

let lastServer = undefined;
let lastChannel = undefined;

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

		// probably unnecessary, but this limits network use to only send an update if the server or channel has changed.
		if (server != lastServer || channel != lastChannel) {
			lastServer = server;
			lastChannel = channel;
			fetch(`http://127.0.0.1:6969/update?server=${server}&channel=${channel}`, parameters).catch(console.error);
		}
	},
	1000 * 1
);