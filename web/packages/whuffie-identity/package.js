Package.describe({
  name: "whuffie:whuffie-identity",
  summary: "Generates third-party credentials, associated linked-data, and stores it in IPFS and/or Mongo",
  version: "0.0.1",
  git: "https://github.com/sunny-g/whuffie"
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'oauth',
    'oauth2',
    'github',
    'http',
    'okgrow:promise'

    // 'whuffie:whuffie-stellar'
  ], [/* 'client', */ 'server']);

  api.imply([
    'service-configuration',

    'sunnyg:meteor-ipfs',
    //'whuffie:whuffie-jsonld'
  ], [/* 'client', */ 'server']);

  // TODO: add
  //api.addFiles([
  //  'github/client.js'
  //], 'client');

  // TODO: require the common/json-ld package on client and server
  api.addFiles([
    'github/server.js',
    'github/services.js'
  ], 'server');

  api.export([
    'Whuffie'
  ], [/* 'client', */ 'server']);
});