Authentication
==============

See the [OAuth 2 overview](https://developer.box.com/en/guides/authentication/) for a detailed
overview of how the Box API handles authentication.

- [Ways to Authenticate](#ways-to-authenticate)
  - [Developer Token](#developer-token)
  - [Server Auth with JWT](#server-auth-with-jwt)
  - [Server Auth with CCG](#server-auth-with-ccg)
    - [Prerequisites](#prerequisites)
    - [Setting Up CCG Authentication](#setting-up-ccg-authentication)
    - [Authenticate as Service Account](#authenticate-as-service-account)
    - [Authenticate as a User](#authenticate-as-a-user)
    - [Common Errors](#common-errors)
  - [Traditional 3-Legged OAuth2](#traditional-3-legged-oauth2)
     - [Reauthorize OAuth2](#reauthorize-oauth2)


Ways to Authenticate
--------------------

### Developer Token

The fastest way to get started using the API is with developer tokens. A
developer token is simply a short-lived access token that cannot be refreshed
and can only be used with your own account. Therefore, they're only useful for
testing an app and aren't suitable for production. You can obtain a developer
token from your application's
[developer console][dev-console] page.

You can pass dev token to any cli command by using `--token` flag

```bash
box users:get --token myToken
```

[dev-console]: https://app.box.com/developers/console

### Server Auth with JWT

Server auth allows your application to authenticate itself with the Box API
for a given enterprise.  By default, your application has a
[Service Account](https://developer.box.com/en/guides/authentication/user-types/)
that represents it and can perform API calls.  The Service Account is separate
from the Box accounts of the application developer and the enterprise admin of
any enterprise that has authorized the app — files stored in that account are
not accessible in any other account by default, and vice versa.

If you generated your public and private keys automatically through the
[Box Developer Console][dev-console], you can use the JSON file created there
to configure the SDK and create an environment to make calls as the
Service Account:

```bash
box configure:environments:add /path/to/file/config.json 
```

Remember to set your current environment to the proper one

```bash
box configure:environments:set-current
```

### Server Auth with CCG

Server authentication with Client Credentials Grant (CCG) allows your application to authenticate itself with the Box API using a client ID and client secret. This is a simpler alternative to JWT authentication when you don't need public/private key cryptography.

By default, your application has a
[Service Account](https://developer.box.com/en/guides/authentication/user-types/)
that represents it and can perform API calls. The Service Account is separate
from the Box accounts of the application developer and the enterprise admin of
any enterprise that has authorized the app — files stored in that account are
not accessible in any other account by default, and vice versa.

#### Prerequisites

Before setting up CCG authentication in the CLI, ensure you have:

1. A Platform Application using **Server Authentication (with Client Credentials Grant)** in the [Box Developer Console][dev-console]
2. **2FA enabled** on your Box account for viewing and copying the application's client secret from the Configuration tab
3. The application is **authorized in the Box Admin Console**

> **Security Note**: Your client secret is confidential and needs to be protected. Do not distribute your client secret via email, public forums, code repositories, distributed native applications, or client-side code. If you need additional security mechanisms, consider using JWT authentication instead.

#### Setting Up CCG Authentication

Adding a CCG environment requires a configuration file containing your `clientID`, `clientSecret`, and `enterpriseID`. You can find this information in the [Box Developer Console][dev-console].

Example configuration file:

```json
{
  "boxAppSettings": {
    "clientID": "myClientId",
    "clientSecret": "mySecret"
  },
  "enterpriseID": "myEnterpriseId"
}
```

#### Authenticate as Service Account

To authenticate as your application's Service Account, create an environment with the `--ccg-auth` flag:

```bash
box configure:environments:add /path/to/file/config.json --ccg-auth
```

This sets up the CLI to authenticate with `box_subject_type` set to `enterprise` and `box_subject_id` set to your enterprise ID.

Remember to set your current environment to the proper one:

```bash
box configure:environments:set-current
```

#### Authenticate as a User

To authenticate as an admin or managed user, you need to:

1. Enable **App + Enterprise Access** and **Generate User Access Tokens** in the [Box Developer Console][dev-console] (found in the Configuration tab under Advanced Features)
2. Create an environment with both `--ccg-auth` and `--ccg-user` flags:

```bash
box configure:environments:add /path/to/file/config.json --ccg-auth --ccg-user "USER_ID"
```

This sets up the CLI to authenticate with `box_subject_type` set to `user` and `box_subject_id` set to the specified user ID.

To authenticate as any application user (not just admins):

1. Enable **Generate User Access Tokens** in the Box Developer Console (Configuration tab > Advanced Features)
2. Create an environment using the same command as above with the appropriate user ID

#### Common Errors

**Grant credentials are invalid**

During authentication, you may encounter this error:

```
Grant credentials are invalid [400 Bad Request] invalid_grant - Grant credentials are invalid
```

This error indicates one of the following issues:

- The client ID and client secret are incorrect or do not belong to the same application
- The `box_subject_id` (user ID or enterprise ID) cannot be used based on the selected application access:
  - A CCG app with **App Access Only** can authenticate as its service account (`box_subject_type` of `enterprise`), but cannot authenticate as a managed user or admin
  - To use `box_subject_type` of `user`, your application must be configured to generate user access tokens in the Advanced Features section of the Configuration tab
- Your application has not been authorized in the Box Admin Console

> **Note**: After making changes to your app settings in the Developer Console, don't forget to re-authorize the application in the Admin Console.

### Traditional 3-Legged OAuth2

Refer to the [OAuth Guide](https://developer.box.com/guides/cli/quick-start) if you want to use OAuth2.

#### Reauthorize OAuth2

After each successful OAuth2 authorization, a pair of tokens is generated, the Access Token and Refresh Token. 

The first one, the  [Access Token](https://developer.box.com/guides/authentication/tokens/access-tokens/), is used to represent the authenticated user to the Box servers and is valid for 60 minutes.

The second one, the [Refresh Token](https://developer.box.com/guides/authentication/tokens/refresh/), is used to refresh the Access Token when it has expired or is close to expiring. A Refresh Token is valid for 1 use within 60 days.

However, it may happen that both mentioned tokens, `Access Token` and `Refresh Token`, have expired. You may then see following error:

```bash
Your refresh token has expired. 
Please run this command "box login --name <ENVIRONMENT_NAME> --reauthorize" to reauthorize selected environment and then run your command again.
```

In this case, you need to log in again to obtain required tokens by using the following command:

```bash
box login --name "ENVIRONMENT_NAME" --reauthorize
```

where `ENVIRONMENT_NAME` is the name of the environment to be reauthorized.

Thanks to the `--reauthorize` flag, the `clientID` and `clientSecret` parameters will be retrieved from the existing environment instead of asking the user for them.

After a successful login, the `ENVIRONMENT_NAME` environment will be updated and set as the default.
