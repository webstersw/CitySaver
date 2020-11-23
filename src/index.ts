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
			case "help":		
			default:
				message.channel.send(`I can't do that. Try 'save' or 'destroy', followed by a city name`);
				break;
		}
	}
});