const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment-timezone");

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
        .setDescription("Enter the date (DD-MM-YYY)")
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
          { name: "Moscow Standard Time (MSK)", value: "Europe/Moscow" },
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
      let inputDate = interaction.options.getString("date");
      let inputTime = interaction.options.getString("time");
      let timezone = interaction.options.getString("timezone") || "UTC";

      let format;
      let parsedTime;

      // If both date and time are provided
      if (inputDate && inputTime) {
        parsedTime = moment.tz(
          `${inputDate} ${inputTime}`,
          "DD-MM-YYYY HH:mm",
          timezone
        );
        format = "f"; // Full Date & Time
      }
      // If only date is provided
      else if (inputDate) {
        parsedTime = moment.tz(inputDate, "DD-MM-YYYY", timezone);
        format = "d"; // Short Date
      }
      // If only time is provided
      else if (inputTime) {
        parsedTime = moment.tz(
          `${moment().format("DD-MM-YYYY")} ${inputTime}`,
          "DD-MM-YYYY HH:mm",
          timezone
        );
        format = "t"; // Short Time
      }
      // Default to current date & time
      else {
        parsedTime = moment.tz(
          moment().format("DD-MM-YYYY HH:mm"),
          "DD-MM-YYYY HH:mm",
          timezone
        );
        format = "f"; // Full Date & Time
      }

      // Check if the user selected a format, if yes override the default.
      const userFormat = interaction.options.getString("format");
      if (userFormat) {
        format = userFormat;
      }

      if (!parsedTime.isValid()) {
        return interaction.reply({
          content:
            "❌ Invalid date/time format. Please use `DD-MM-YYYY for the date and HH:mm (24-hour) for the time.",
          ephemeral: true,
        });
      }

      // Convert to Unix timestamp (seconds)
      const unixTimestamp = Math.floor(parsedTime.unix());

      // Generate Discord timestamp format
      const discordTimestamp = `<t:${unixTimestamp}:${format}>`;

      // Reply with the formatted timestamp
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
