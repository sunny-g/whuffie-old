if (Meteor.isServer && process.env.NODE_OPTIONS === '--debug') {
  stellardCxn = Meteor.settings.public.stellarConnections.test;
  // get free test stellar from SDF?
  getFreeStellar = true;
} else {
  stellardCxn = Meteor.settings.public.stellarConnections.live;
  getFreeStellar = false;
}