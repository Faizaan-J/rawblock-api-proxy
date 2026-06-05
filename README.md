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

##### cURL
```bash
curl -X GET "https://rawblock-api-proxy.vercel.app/api/users/detailed-user-info?userId=1" \
  -H "Authorization: Bearer {API_KEY_HERE}"
```

##### Javascript (fetch)
```javascript
const response = fetch("https://rawblock-api-proxy.vercel.app/api/users/detailed-user-info?userId=1", {
    headers: {
        "Authorization": "Bearer {API_KEY_HERE}"
    }
});
```

##### Rawblock
```lua
local RawblockHelpers = require("./RawblockHelpers") -- replace with the path you put RawblockHelpers in

local Response = RawblockHelpers.GetDetailedUserInfo({
	UserId = 1
})

if (Response.success) then
	local Data = Response.data
else
	warn(Response.error)
end
```

#### Schema
```json
{
  "body": {
    "description": "string",
    "created": "2014-08-14T15:41:32.713Z",
    "isBanned": false,
    "externalAppDisplayName": "string" | null,
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
Retrieves the username history for a particular user by user id

#### Parameters:
1.  [`userId`]:
    - *Required
    - [`Type`] Integer
    - [`Description`] The user id of the player.
2. [`limit`]:
    - [`Type`] Integer, ONLY 10 | 25 | 50 | 100
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

##### cURL
```bash
curl -X GET "https://rawblock-api-proxy.vercel.app/api/users/username-history?userId=140258990&limit=10&sortOrder=Asc" \
  -H "Authorization: Bearer {API_KEY_HERE}"
```

##### Javascript (fetch)
```javascript
const response = fetch("https://rawblock-api-proxy.vercel.app/api/users/username-history?userId=140258990&limit=10&sortOrder=Asc", {
    headers: {
        "Authorization": "Bearer {API_KEY_HERE}"
    }
});
```

##### Rawblock
```lua
local RawblockHelpers = require("./RawblockHelpers") -- replace with the path you put RawblockHelpers in

local Response = RawblockHelpers.GetUsernameHistory({
	UserId = 140258990,
	SortOrder = "Asc",
	Limit = 50
})

if (Response.success) then
	local Data = Response.data
else
	warn(Response.error)
end
```

#### Schema
```json
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
## How to setup Rawblock API Proxy & RawblockHelpers
### Rawblock API Proxy
1. Clone the repository
2. Download [`Vercel CLI`](https://vercel.com/docs/cli).
3. Run ```vercel``` to link the repository to a Vercel project.
4. Open the Vercel project that was made and go the `Environment Variables` section.
5. Press `Add Environment Variable` and set the key to `AUTH`.
6. For the value, I recommend using [randomkeygen.com](https://randomkeygen.com/api-key). Just take a key from there and paste it in. Make sure to save it so that you can also put the key for your Rawblock experience.
7. Redeploy the app. There should be a dialog in the bottom right of the screen.

From there, the Vercel app should be setup but now to use it in Rawblock, you need to also setup the API key there.

### RawblockHelpers
1. Open your experience in the website
2. Go to `Configure > Secrets` for the Secrets tab.
3. Press `Create Secret` and name it `RawblockKey`. Set the secret to the same value you put for the Vercel app's `AUTH` key.
4. Now, to use in your Rawblock experience, go to [Releases](https://github.com/Faizaan-J/rawblock-api-proxy/releases/) and download `RawblockHelpers.rbxmx`.
5. Open Rawblock Studio
6. Import `RawblockHelpers.rbxmx` into your experience and put it wherever you want.
7. To use, refer to the previous sections.

RawblockHelpers should be ready to use then.
