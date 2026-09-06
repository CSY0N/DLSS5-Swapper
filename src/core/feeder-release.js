'use strict';

// One verified release for the shader, both client architectures and helper.
// Never mix host protocol versions. Digest supplied by GitHub's release API.
module.exports = {
  version: '0.14.0-beta.4',
  archive: ['DLSS5-Feeder-0.14.0-beta.4.zip', 'https://github.com/jlrouzies-fr/DLSS5-Feeder/releases/download/v0.14.0-beta.4/DLSS5-Feeder-0.14.0-beta.4.zip', '7ee5d63e0674129e263d991c167466ea38909ff9358c2f07eb02a13cef70933f'],
  hashes: {
    'dlss5-feed.addon32': '0da474f208ce9b38a0bb9025b789f4169bf1a86c72a5c853a77ac816318f0d77',
    'dlss5-feed.addon64': '03545edcca1153f27cecb7ade8cd9a0420370748ae54e55e83119bec0c5075f1',
    'dlss5-feed-host64.exe': '3ed3ab48691ae1120867a4dc21ef6d85a6c8d4fd4d22f20400213f1f918e5e26',
    'reshade-shaders/Shaders/DLSS5_Feed.fx': 'cdac08a721b14b97187dd86c5b5bead157c9063d7ee859a0f131a8ee791695f1'
  }
};
