// Require .env and the necessary constants
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;

// Node Imports
const fs = require('node:fs');
const path = require('node:path');

// Discord Imports
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// Create a collection to store commands 
client.commands = new Collection();

// Define folder paths
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Loop through commands folder
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // Filter .js files
  // Loop through each file
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Check command has both data and execute properties
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Event listener, triggers once when client (bot) is ready
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Event listener for interaction commands (i.e. slash)
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return; // checks if input is a valid slash command
	const command = interaction.client.commands.get(interaction.commandName); // get the command

  // Check command is valid
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction); // Execute command
	} catch (error) {
		console.error(error);
    // Send error response to user
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

// Log in to Discord with your client's token
client.login(token);