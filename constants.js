const TIMEZONES = [
  {
    name: "UTC-11:00 - Niue Time (NUT), Samoa Standard Time (SST)",
    value: "UTC-11:00",
  },
  {
    name: "UTC-10:00 - Hawaii-Aleutian Standard Time (HST), Tahiti Time (TAHT)",
    value: "UTC-10:00",
  },
  { name: "UTC-09:00 - Alaska Standard Time (AKST)", value: "UTC-09:00" },
  { name: "UTC-08:00 - Pacific Standard Time (PST)", value: "UTC-08:00" },
  { name: "UTC-07:00 - Mountain Standard Time (MST)", value: "UTC-07:00" },
  { name: "UTC-06:00 - Central Standard Time (CST)", value: "UTC-06:00" },
  { name: "UTC-05:00 - Eastern Standard Time (EST)", value: "UTC-05:00" },
  { name: "UTC-04:00 - Atlantic Standard Time (AST)", value: "UTC-04:00" },
  {
    name: "UTC-03:00 - Brasília Standard Time (BRT), Argentina Time (ART)",
    value: "UTC-03:00",
  },
  {
    name: "UTC-02:00 - South Georgia and the South Sandwich Islands Time (GST)",
    value: "UTC-02:00",
  },
  {
    name: "UTC-01:00 - Azores Standard Time (AZOT), Cape Verde Time (CVT)",
    value: "UTC-01:00",
  },
  {
    name: "UTC±00:00 - Greenwich Mean Time (GMT), Western European Time (WET)",
    value: "UTC+00:00",
  },
  {
    name: "UTC+01:00 - Central European Time (CET), Western European Summer Time (WEST)",
    value: "UTC+01:00",
  },
  {
    name: "UTC+02:00 - Central European Summer Time (CEST), Eastern European Time (EET)",
    value: "UTC+02:00",
  },
  {
    name: "UTC+03:00 - Moscow Standard Time (MSK), Turkey Standard Time (TRT)",
    value: "UTC+03:00",
  },
  {
    name: "UTC+04:00 - Azerbaijan Standard Time (AZT), Samara Time (SAMT)",
    value: "UTC+04:00",
  },
  {
    name: "UTC+05:00 - Pakistan Standard Time (PST), Yekaterinburg Time (YEKT)",
    value: "UTC+05:00",
  },
  { name: "UTC+05:30 - Indian Standard Time (IST)", value: "UTC+05:30" },
  {
    name: "UTC+06:00 - Bangladesh Standard Time (BST), Omsk Time (OMST)",
    value: "UTC+06:00",
  },
  {
    name: "UTC+07:00 - Indochina Time (ICT), Krasnoyarsk Time (KRAT)",
    value: "UTC+07:00",
  },
  {
    name: "UTC+08:00 - Singapore Standard Time (SGT), China Standard Time (CST)",
    value: "UTC+08:00",
  },
  {
    name: "UTC+09:00 - Japan Standard Time (JST), Korea Standard Time (KST)",
    value: "UTC+09:00",
  },
  {
    name: "UTC+10:00 - Australian Eastern Standard Time (AEST), Vladivostok Time (VLAT)",
    value: "UTC+10:00",
  },
  {
    name: "UTC+11:00 - Solomon Islands Time (SBT), Magadan Time (MAGT)",
    value: "UTC+11:00",
  },
  {
    name: "UTC+12:00 - New Zealand Standard Time (NZST), Fiji Time (FJT)",
    value: "UTC+12:00",
  },
];

const FORMATS = [
  { name: "Short Time (12:00)", value: "t" },
  { name: "Long Time (12:00:00)", value: "T" },
  { name: "Short Date (01/01/2023)", value: "d" },
  { name: "Long Date (January 1, 2025)", value: "D" },
  { name: "Full Date & Time (January 1, 2025, 12:00 PM)", value: "f" },
  {
    name: "Day of Week (Sunday, January 1, 2025, 12:00 PM)",
    value: "F",
  },
  { name: "Relative (5 minutes ago)", value: "R" },
];

module.exports = { TIMEZONES, FORMATS };
