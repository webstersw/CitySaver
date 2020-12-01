import { Client } from 'discord.js';
import config from './config';
import { getCount, handleCity, getList } from './commandHelpers';

const client = new Client();

client.once('ready', () => {
	console.log('ready at: ' + Date.now);
});

client.login(process.env.DISCORD_TOKEN);

client.on('message', message => {
	if (!message.content.startsWith(config.commandPrefix) || message.author.bot) return;

	const args = message.content.slice(config.commandPrefix.length).trim().split(' ');
	const command = args.shift();

	if (command) {
		switch (command.toLowerCase()) {
			case "save":
				handleCity(args, message, true);
				break;
			case "destroy":
				handleCity(args, message, false);
				break;
			case "count":
				getCount(message);
				break;
			case "list":
				getList(args, message);
				break;
			case "alist":
				getAlphabeticalList(args, message);
				break;
			case "deletexerath":
				message.channel.send('Xerath Has been permanently deleted. Good Riddance.');
				break;
			case "help":
				message.channel.send('Try these commands: save, destroy, count, list, alist, and deletexerath.');
				break;
			default:
				message.channel.send(`I can't do that. Try "!city help"`);
				break;
		}
	}
});
