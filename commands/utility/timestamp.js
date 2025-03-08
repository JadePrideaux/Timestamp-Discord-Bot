const { SlashCommandBuilder } = require("discord.js");
const { DateTime } = require("luxon");
const { TIMEZONES, FORMATS } = require("../../constants");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timestamp")
    .setDescription("Generates a Discord timestamp from a given date and time.")
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("Enter the time (HH:mm)")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("date")
        .setDescription("Enter the date (DD-MM-YYYY)")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("local-timezone")
        .setDescription("Enter your local timezone")
        .setRequired(false)
        .addChoices(...TIMEZONES)
    )
    .addStringOption((option) =>
      option
        .setName("format")
        .setDescription("Select the format")
        .setRequired(false)
        .addChoices(...FORMATS)
    ),
  async execute(interaction) {
    try {
      // Get user input
      let inputDate = interaction.options.getString("date");
      let inputTime = interaction.options.getString("time");
      let timezone =
        interaction.options.getString("local-timezone") || "UTC+00:00";

      let format; // The format value of the timestamp
      let parsedTime; // The datetime in luxon format

      // If both date and time are provided
      if (inputDate && inputTime) {
        parsedTime = DateTime.fromFormat(
          `${inputDate} ${inputTime}`,
          "dd-MM-yyyy HH:mm",
          { zone: timezone }
        );
        format = "f"; // Full Date & Time
      }
      // If only date is provided
      else if (inputDate) {
        parsedTime = DateTime.fromFormat(inputDate, "dd-MM-yyyy", {
          zone: timezone,
        });
        format = "d"; // Short Date
      }
      // If only time is provided
      else if (inputTime) {
        // Get the current date (now, but just the date)
        const currentDate = DateTime.now()
          .setZone(timezone)
          .toFormat("dd-MM-yyyy");
        parsedTime = DateTime.fromFormat(
          `${currentDate} ${inputTime}`,
          "dd-MM-yyyy HH:mm",
          { zone: timezone }
        );
        format = "t"; // Short Time
      }
      // Default to current date
      else {
        parsedTime = DateTime.now().setZone(timezone);
        format = "f"; // Full Date & Time
      }

      // Check if the user selected a format, if yes override the default.
      const userFormat = interaction.options.getString("format");
      if (userFormat) {
        format = userFormat;
      }

      // Check that the pasred time format is invalid and return an error to the user
      if (!parsedTime.isValid) {
        return interaction.reply({
          content:
            "❌ Invalid date/time format. Please use `DD-MM-YYYY` for the date and `HH:mm` (24-hour) for the time.",
          ephemeral: true,
        });
      }

      // Convert the pased time into secconds, then convert to unix
      const unixTimestamp = Math.floor(parsedTime.toSeconds());

      // Generate Discord timestamp format
      const discordTimestamp = `<t:${unixTimestamp}:${format}>`;

      // Reply with the formatted timestamp and a easy to copy code block
      await interaction.reply(
        `Here is your timestamp for ${discordTimestamp}: \n\`\`\`${discordTimestamp}\`\`\``
      );
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "❌ Something went wrong while processing your request.",
        ephemeral: true,
      });
    }
  },
};
