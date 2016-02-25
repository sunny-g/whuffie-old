Meteor.methods({
  createNewUser: function(opts) {
    console.log('input params:', opts);

    var id = Accounts.createUser(opts);
    // TODO: set Meteor.server.sessions[this session].userId to id

    console.log('id:', id);

    var user = Meteor.users.find({_id: id}).fetch()[0];
    console.log('user:', user);
    return user;
  }
});

//Accounts.onCreateUser(testnetRegistrationHook);

/*
 This function will:
 - create the stellar key and address
 - save them alongside their username and password in the db
 - create a vertex in neo4j for the user

 For demo purposes:
 - we are allowing the key to stored in plaintext on the server
 - we are not putting it in a blob encrypted by a user password

 In the future, this function (or others like it) will also
 register the user on the Stellar network through a special
 memo in a transaction sent immediately on signup.
 */

function getTestStellar(stellarAccount) {
  if (getFreeStellar) {
    return HTTP.get('https://api-stg.stellar.org/friendbot?address=' + stellarAccount.account_id);
  } else {
    return null;
  }
}

function testnetRegistrationHook(options, user) {
  console.log('running registration hook');

  // have stellard create us a wallet full of stellar keys and seeds
  //var res = HTTP.post('https://api-stg.stellar.org/friendbot?address=' + stellarAccount.account_id, {
  //  data: {'method': 'create_keys'}
  //});

  var stellarAccount = JSON.parse(res.body).result;
  delete stellarAccount.status;
  stellarAccount.address = stellarAccount.account_id;
  delete stellarAccount.account_id;

  // get free testnet stellar from SDF
  var getRes = getTestStellar(stellarAccount);

  user.profile = options.profile || {};
  // TODO: encrypt stellar data before storage
  user.profile.stellar = stellarAccount;

  neoOperations.createUser(user, function(){});
  return user;
}
