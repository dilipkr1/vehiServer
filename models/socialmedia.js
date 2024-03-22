// models/SocialMediaSettings.js
const mongoose = require('mongoose');

const socialMediaSettingsSchema = new mongoose.Schema({
  twitter: String,
  linkedin: String,
  instagram: String,
  facebook: String,
  android: String,
  ios: String,
});

const SocialMediaSettings = mongoose.model('SocialMediaSettings', socialMediaSettingsSchema);

module.exports = SocialMediaSettings;
