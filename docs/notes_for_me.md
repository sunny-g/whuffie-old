LONG-TERM TODO:
- keep an eye out for:
	- IPFS keychain progress
		- could change:
			- how we publish JSON-LD
			- how we save and publish signatures (for saved claims, etc)
	- IPLD progress
		- not much should change as a result of this being made part of IPFS
- refactor server to use blockchain-auth-js

===================================================
notes for installation:

- gl-react
- stellar-lib
	- remove the dependencies on `url` and `querystring` in stellar-lib/src/js/ripple/crypt.js
- logging dependency tree
	- rn/packager/react-packager/src/Bundler/index.js#L143
	
- if RN Packager is giving the error "Error validating module options: child "platform" fails because ["platform" is required]
"
	- https://github.com/facebook/react-native/commit/44af0d3dec53b6e01af9e8bc9b0254a5d03846a0

===================================================

[OLD] Cards collection
- gifts or nixes
- cards must be "confirmed" by Stellar network

Sample Neo4j Cypher Queries:
======
returns the entire graph:
```
MATCH (user:User) RETURN user
```
deletes entire graph:
```
MATCH (user:User) OPTIONAL MATCH ()-[limit:TRUST]-() DELETE user, limit
```
changes limits and balances from trustSets:
```
MATCH (s:User {username: "test3"}), (t:User {username: "test2"}) 
MERGE (s)-[limit:TRUST]->(t) 
ON MATCH SET limit.prevSourceLimit = limit.currSourceLimit, 
limit.currSourceLimit = 15, 
limit.prevTargetBalance = limit.currTargetBalance, 
limit.currTargetBalance = limit.prevTargetBalance + (15 - limit.prevSourceLimit) 
ON CREATE SET limit.source = s.address, 
limit.target = t.address, 
limit.prevSourceLimit = 0, 
limit.currSourceLimit = 15, 
limit.prevTargetBalance = 0, 
limit.currTargetBalance = 15
RETURN limit;
```
changes balances from payments:
```
MATCH (s:User {username: "test"}), (t:User {username: "test2"}) 
MERGE (s)-[limit:TRUST]->(t) 
ON MATCH SET 
limit.prevTargetBalance = limit.currTargetBalance, 
limit.currTargetBalance = limit.prevTargetBalance + (5) 
ON CREATE SET limit.source = s.address, 
limit.target = t.address, 
limit.prevSourceLimit = 0, 
limit.currSourceLimit = 0, 
limit.prevTargetBalance = 0, 
limit.currTargetBalance = 0
RETURN limit;
```
