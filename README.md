<div align="center">
    <img src="./assets/RawblockLogo.png" width="200" />
    <h1>Rawblock API Proxy</h1>
    <p>An API Proxy for a certain app.</p>
</div>

## Why
The app in question doesn't let you make requests to their API from the "experiences" themselves for whatever reason. This is a proxy that lets the scripts in the experience interact with the app's API without restrictions.

## Current features
### Detailed User Info
Gets detailed user info by user id.
#### Parameters:
1.  [`userId`]:
    - *Required
    - [`Type`] Integer
    - [`Description`] The user id of the player.

#### Example
```
https://rawblock-api-proxy.vercel.app/api/users/detailed-user-info?userId=1
```

#### Schema
```
{
  "body": {
    "description": "string",
    "created": "2014-08-14T15:41:32.713Z",
    "isBanned": false,
    "externalAppDisplayName": null,
    "hasVerifiedBadge": true,
    "id": 0,
    "name": "string",
    "displayName": "string"
  },
  "query": {
    "userId": "string"
  }
}
```

### Username History
Retrieves the username history fora particular user by user id

#### Parameters:
1.  [`userId`]:
    - *Required
    - [`Type`] Integer
    - [`Description`] The user id of the player.
2. [`limit`]:
    - [`Type`] Integer, ONLY 10 |25 | 50 | 100
    - [`Description`] The number of results per request
    - [`Default Value`] 10
3. [`cursor`]:
    - [`Type`] String
    - [`Description`] The paging cursor for the previous or next page.
4. [`sortOrder`]:
    - [`Type`] String, "Asc" | "Desc"
    - [`Description`] The order the results are sorted in.
    - [`Default Value`] Asc

#### Example
```
https://rawblock-api-proxy.vercel.app/api/users/username-history?userId=140258990&limit=10&sortOrder=Asc
```

#### Schema
```
{
  "body": {
    "usernames": [
      "string"
      ...
    ],
    "previousPageCursor": "string" | null,
    "nextPageCursor": "string" | null
  },
  "query": {
    "userId": "string",
    "limit": "string",
    "sortOrder": "string"
  }
}
```