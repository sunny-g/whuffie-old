var HTTPPostAsync = Meteor.wrapPromise(HTTP.post);
var requestGithubCredential = Meteor.wrapPromise(modifiedRequestCredential);

// TODO: DO NOT TOUCH, USE NATIVE APP AS A MODEL FOR THIS

function createGist(accessToken) {
  // var user = Meteor.user.find(this.userId);
  // var username = user.username;
  // var address = user.address ??

  // TODO: use template whuffieid.md JSON
  return HTTPPostAsync('https://api.github.com/gists', {
    headers: {
      'Authorization': 'Bearer ' + accessToken
      //'User-Agent': 'whuffie' // gives "refuse to set unsafe header" error
    },
    data: {
      description: 'example whuffie identity verification gist',
      public: true,
      files: {
        'whuffie.md': {
          content: 'my name on whuffie is +sunny and my address is 1234'
        }
      }
    }
  });
}

function modifiedRequestCredential(params, callback) {
  var err = null;
  return Github.requestCredential(params, function(tokenOrError) {
    if (!tokenOrError) {
      err = tokenOrError;
      tokenOrError = null;
    }
    callback(err, tokenOrError);
  });
}