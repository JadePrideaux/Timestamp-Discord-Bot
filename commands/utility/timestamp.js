const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment-timezone");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timestamp")
    .setDescription("Generates a Discord timestamp from a given date and time.")
    .addStringOption((option) =>
      option
        .setName("date")
        .setDescription("Enter the date (YYYY-MM-DD)")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("Enter the time (HH:mm)")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("timezone")
        .setDescription('Enter your timezone (e.g., "America/New_York")')
        .setRequired(false) // Make timezone optional.
        .addChoices(
          { name: "Greenwich Mean Time (GMT)", value: "Europe/London" },
          { name: "Central European Time (CET)", value: "Europe/Paris" },
          { name: "Pacific Standard Time (PST)", value: "America/Los_Angeles" },
          { name: "Eastern Standard Time (EST)", value: "America/New_York" },
          { name: "Indian Standard Time (IST)", value: "Asia/Kolkata" },
          { name: "Japan Standard Time (JST)", value: "Asia/Tokyo" },
          {
            name: "Australian Eastern Standard Time (AEST)",
            value: "Australia/Sydney",
          },
          { name: "Coordinated Universal Time (UTC)", value: "UTC" },
          { name: "Central Standard Time (CST)", value: "America/Chicago" },
          { name: "Mountain Standard Time (MST)", value: "America/Denver" },
          { name: "Brazilian Standard Time (BRT)", value: "America/Sao_Paulo" },
          {
            name: "New Zealand Standard Time (NZST)",
            value: "Pacific/Auckland",
          },
          { name: "Singapore Standard Time (SGT)", value: "Asia/Singapore" },
          { name: "Eastern European Time (EET)", value: "Europe/Helsinki" },
          { name: "Western European Time (WET)", value: "Europe/Dublin" },
          { name: "Alaska Standard Time (AKST)", value: "America/Anchorage" },
          {
            name: "Hawaii-Aleutian Standard Time (HST)",
            value: "Pacific/Honolulu",
          }
        )
    )
    .addStringOption((option) =>
      option
        .setName("format")
        .setDescription("Select the format")
        .setRequired(false)
        .addChoices(
          { name: "Short Time (12:34 PM)", value: "t" },
          { name: "Long Time (12:34:56 PM)", value: "T" },
          { name: "Short Date (01/01/2023)", value: "d" },
          { name: "Long Date (January 1, 2023)", value: "D" },
          { name: "Full Date & Time (January 1, 2023, 12:34 PM)", value: "f" },
          {
            name: "Day of Week (Sunday, January 1, 2023, 12:34 PM)",
            value: "F",
          },
          { name: "Relative (5 minutes ago)", value: "R" }
        )
    ),
  async execute(interaction) {
    try {
      // Get user input
      let inputDate =
        interaction.options.getString("date") || moment().format("YYYY-MM-DD");
      let inputTime =
        interaction.options.getString("time") || moment().format("HH:mm");
      let timezone = interaction.options.getString("timezone") || "UTC";

      let format;
      let inputDateTime;
      // If both date and time are provided
      if (inputDate && inputTime) {
        inputDateTime = `${inputDate} ${inputTime}`;
        format = "f"; // Full Date & Time
      }
      // If only date is provided
      else if (inputDate) {
        inputDateTime = `${inputDate} ${moment().format("HH:mm")}`;
        format = "d"; // Short Date
      }
      // If only time is provided
      else if (inputTime) {
        inputDateTime = `${moment().format("YYYY-MM-DD")} ${inputTime}`;
        format = "t"; // Short Time
      }
      // Default to current date & time
      else {
        inputDateTime = moment().format("YYYY-MM-DD HH:mm");
        format = "f"; // Full Date & Time
      }

      // Check if the user selected a format, if yes override the default.
      const userFormat = interaction.options.getString("format");
      if (userFormat) {
        format = userFormat;
      }

      // Convert to a timestamp
      const parsedTime = moment.tz(inputDateTime, "YYYY-MM-DD HH:mm", timezone);

      if (!parsedTime.isValid()) {
        return interaction.reply({
          content:
            "❌ Invalid date/time format. Please use `YYYY-MM-DD HH:mm` in 24-hour format.",
          ephemeral: true,
        });
      }

      // Convert to Unix timestamp (seconds)
      const unixTimestamp = Math.floor(parsedTime.unix());

      // Generate Discord timestamp format
      const discordTimestamp = `<t:${unixTimestamp}:${format}>`;

      // Reply with the formatted timestamp
      await interaction.reply(`Here is your timestamp: ${discordTimestamp}`);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "❌ Something went wrong while processing your request.",
        ephemeral: true,
      });
    }
  },
};
