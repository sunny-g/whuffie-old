/*
stored in "credential" array in the user's Identity JSON-LD

notes:
  - creating the gist is proof of github ownership
  - signing it with the stellar key is
    - proof of that stellar key ownership
    - proof of association between the two

questions/attacks
  ** ask what services/attacks you want to provide/prevent, not what are all possible **

  - machine pulls JSON-LD, wants to verify credentials
    - pull the gist, pull the json-ld
    - check that the claims are identical
    - check that the signature (from jsonld) against the claim and pubKey

  √ user's Github gets hacked, hacker changes the gist
    - the hacker can't forge your signature
    - the gist and JSON-LD credential become invalid

  - you want to verify a user's identity from the gist
    * you can't, you still need to go back to the id of the user, then verify the claim

 */

// this entire object gets published to Github
claimSavedOnGithub = {
  "@context": "<IPFS hash of the @context for this claim>",
  "claim": {
    // currently, the whuffie.io URL of the user
    // e.g. https://whuffie.io/user/<username>.json
    // TODO: get IPNS set up so that id is the hash of the user's IPFS pubkey
    "id": "...",

    // the user's name
    "name": "Sunny Gonnabathula",

    // stellar address
    "address": "s2123123...",
    // stellar public key
    "pubKey": "",

    // [OPTIONAL] identityProvider's JSON-LD
    "identityProvider": "",

    // the Identity Provider's username for this person (Github username)
    "username": "sunny-g",

    // the whuffie username (should be a different key)
    "whuffieUsername": "sunny-g"
  },

  "signature": {
    "type": "???",  // GraphSignature2012 by default

    // what should this be?
    "creator": "",  // "https://ssa.us.gov/keys/27"
    "signature": "fhhfiq3q9f8ahfh3q029rhaishsidfhf3780ey"

    // if we use the Stellar master key, this isn't necessary (right?)
      // as the signature is the proof of address ownership
    //"pubKey": ""
    //"txnHash": "<hash of the Stellar txn "
  }
};

// what gets stored in the identity JSONLD
JSONLDGithubClaim = {
  "@context": "<IPFS hash of the @context for this claim>",
  "type": "GithubWhuffieCredential",
  
  // stored only in the JSON-LD, points to the gist URL
  "gistURL": "https://gist.github.com/<username>/<gist id>",
  
  "claim": {/**/},
  "signature": {/**/}
};
