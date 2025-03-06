const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  // build new slash command
	data: new SlashCommandBuilder()
		.setName('ping') // name used for command, i.e. /ping
		.setDescription('Replies with Pong!'), // description dropdown menu

  // execute interaction
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};