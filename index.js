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
let needsUpdate = false;

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
		needsUpdate = true;
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
	
	// You'll need to have snek_large and snek_small assets uploaded to
	// https://discord.com/developers/applications/<application_id>/rich-presence/assets
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

async function waitForActivity() {
	while (!needsUpdate) {
		// no-op
	}

	console.log(`Found update. Updating to ${channel} in ${server}`);

	// is running an update. immediately set this back to false to prep for next
	needsUpdate = false;

	// set activity
	setActivity();

	// activity can only be set every 15 seconds. Wait 15 seconds.
	setTimeout(waitForActivity, 15 * 1000);
}

rpc.on('ready', async () => {
	console.log("I am an async function.");
	waitForActivity();
});

console.log("Logging in RPC");
rpc.login({ clientId: clientId }).catch(console.error);