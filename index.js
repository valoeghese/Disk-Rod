/**
 * Copyright © 2022 Mekal Covic
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWAR
 */

// ======================
//	 Imports & Constants
// ======================
const internets = require('fastify')();
console.log("Required Fastify");

const DiscordRPC = require('discord-rpc');
console.log("Required Discord RPC");

const startTimestamp = new Date();
const clientId = "1024181708632895588";

DiscordRPC.register(clientId);
console.log("Registered Client ID");

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
console.log("Created DiscordRPC Client");

const scopes = ['rpc', 'rpc.api'];

// ==========================
//	 Variables and Functions
// ==========================

let channel = "#missingno";
let server = "No Server";

function or(value, or) {
	return value ? value : or;
}

// ===============
//	 Fastify API
// ===============

// declare a route
internets.get('/update', function (req, reply) {
	try {
		server = or(req.query.server, "No Server");
		channel = or(req.query.channel, "#missingno");
		reply.send({ success: true });
	}
	catch (e) {
		reply.send({ success: false, error: e.message });
	}
});

// Run the server! To be run locally, ofc.
internets.listen(6969, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	internets.log.info(`server listening on ${address}`);
});

// ================
//	 Rich Presence
// ================

async function setActivity() {
	if (!rpc) {
		return;
	}
	
	// update activity
	rpc.setActivity({
		details: `Viewing ${channel}`,
		state: `In ${server}`,
		startTimestamp,
		largeImageKey: 'discord-logo',
		largeImageText: 'test',
		smallImageKey: 'discord-logo',
		smallImageText: 'yea im playing discord',
		instance: false,
	});
}

rpc.on('ready', async () => {
	console.log("I am an async function.");
	setActivity();
	
	// activity can only be set every 15 seconds
	setInterval(() => {
		setActivity();
	}, 15 * 1000);
});

console.log("Logging in RPC");
rpc.login({ clientId: clientId }).catch(console.error);