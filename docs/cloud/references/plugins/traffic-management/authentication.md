---
title: Authentication Plugin Reference
reading_time: auto
show_feedback: true
---

| Field                  | Type   | Default | Optional | Limitations                                                                                    | Description                      |
|------------------------|--------|---------|----------|------------------------------------------------------------------------------------------------|----------------------------------|
| `Type`                 | string | -       | No       | Optional Values: `"Key Auth"`, `"Basic Auth"`, `"HMAC Auth"`, `"JWT Auth"`, `"OpenID Connect"` | Specify the authentication type. |

## Key Auth

| Field               | Type    | Default    | Optional | Limitations | Description                                                                    |
|---------------------|---------|------------|----------|-------------|--------------------------------------------------------------------------------|
| `Header`            | string  | `"apikey"` | Yes      |             | The HTTP request header which takes the credentials.                           |
| `Strip Credentials` | boolean | `false`    | Yes      |             | Whether to strip the credentials before forwarding the request to the backend. |

## Key Auth (Consumer)

| Field | Type    | Default | Optional | Limitations                                                      | Description  |
|-------|---------|---------|----------|------------------------------------------------------------------|--------------|
| `Key` | string  | -       | No       | Keep it unique among [Consumers](../../../concepts/consumer.md). | The API key. |

## HMAC Auth

| Field               | Type    | Default    | Optional | Limitations | Description                                                                    |
|---------------------|---------|------------|----------|-------------|--------------------------------------------------------------------------------|
| `Strip Credentials` | boolean | `false`    | Yes      |             | Whether to strip the credentials before forwarding the request to the backend. |

## HMAC Auth (Consumer)

| Field                   | Type         | Default         | Optional | Limitations                                                      | Description                                                                                                                                                                                                                                                                    |
|-------------------------|--------------|-----------------|----------|------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Access Key`            | string       | -               | No       | Keep it unique among [Consumers](../../../concepts/consumer.md). | Key used to identify Consumers.                                                                                                                                                                                                                                                |
| `Secret Key`            | string       | -               | No       |                                                                  | Key used to generate signature and digest.                                                                                                                                                                                                                                     |
| `Algorithm`             | string       | `"hmac-sha256"` | No       | Optional values: `"hmac-sha1"` `"hmac-sha256"` `"hmac-sha512"`   | Encryption algorithm.                                                                                                                                                                                                                                                          |
| `Clock Skew`            | integer      | `0`             | Yes      |                                                                  | Clock skew allowed by the signature in seconds. Setting it to 0 will skip checking the date.                                                                                                                                                                                   |
| `Max Request Body Size` | integer      | `524288`        | Yes      |                                                                  | Maximum allowed body size.                                                                                                                                                                                                                                                     |
| `Encode URI Params`     | boolean      | `true`          | Yes      |                                                                  | Whether the URI query strings are also encoded for signing the signature.                                                                                                                                                                                                      |
| `Validate Request Body` | boolean      | `true`          | Yes      |                                                                  | Whether the request body will be validated.                                                                                                                                                                                                                                    |
| `Signed Headers`        | string array | -               | Yes      | `1` <= Length <= `128`                                           | Restrict the headers that are added to the encrypted calculation. After the specified, the client request can only specify the headers within this range. When this item is empty, all the headers specified by the client request will be added to the encrypted calculation. |

## Basic Auth

| Field               | Type    | Default    | Optional | Limitations | Description                                                                    |
|---------------------|---------|------------|----------|-------------|--------------------------------------------------------------------------------|
| `Strip Credentials` | boolean | `false`    | Yes      |             | Whether to strip the credentials before forwarding the request to the backend. |

## Basic Auth (Consumer)

| Field      | Type    | Default | Optional | Limitations                                                      | Description           |
|------------|---------|---------|----------|------------------------------------------------------------------|-----------------------|
| `Username` | string  | -       | No       | Keep it unique among [Consumers](../../../concepts/consumer.md). | Username information. |
| `Password` | string  | -       | No       |                                                                  | Password information. |

## JWT Auth

| Field            | Type   | Default         | Optional | Limitations                                        | Description                                   |
|------------------|--------|-----------------|----------|----------------------------------------------------|-----------------------------------------------|
| `Token Position` | string | `Header`        | Yes      | Optional Values: `"Header"`, `"Query"`, `"Cookie"` | The JSON Web Token position int API requests. |
| `Token Name`     | string | `Authorization` | Yes      |                                                    | The JSON Web Token name.                      |

## JWT Auth (Consumer)

| Field            | Type    | Default | Optional | Limitations                           | Description                                                                                 |
|------------------|---------|---------|----------|---------------------------------------|---------------------------------------------------------------------------------------------|
| `Key`            | string  |         | No       |                                       | Key is used to identify the consumer, it will be in the JWT payload and **must be unique**. |
| `Secret`         | string  |         | No       |                                       | The JSON Web Token signing secret.                                                          |
| `Base64 Encoded` | boolean | `false` | Yes      |                                       | Whether the secret is encoded in base64 format.                                             |
| `Algorithm`      | string  | `HS256` | Yes      | Optional Values: `"HS256"`, `"HS512"` | The JSON Web Token signing algorithm.                                                       |

## OpenID Connect

| Field                                     | Type    | Default                  | Optional | Limitations                                                      | Description                                                                    |
|-------------------------------------------|---------|--------------------------|----------|------------------------------------------------------------------|--------------------------------------------------------------------------------|
| `Client ID`                               | string  |                          | No       |                                                                  | The client id assigned by the identity server.                                 |
| `Client Secret`                           | string  |                          | No       |                                                                  | The client secret assigned by the identity server.                             |
| `Identity Server`                         | string  |                          | No       |                                                                  | The URL of the discovery endpoint of the identity server.                      |
| `Scope Claim`                             | string  | `openid`                 | Yes      |                                                                  | Scope for the authentication.                                                  |
| `Bearer Only`                             | boolean | `false`                  | Yes      |                                                                  | Whether check the authorization header in API requests.                        |
| `Introspection Endpoint Auth Method`      | string  | `"client_secret_basic"`  | Yes      | Optional Values: `"client_secret_basic"`, `"client_secret_post"` | Authentication method for token introspection.                                 |
 | `Redirect URI`                            | string  | Same to the API request. | Yes      | Avoid using any meaningful business API endpoint.                | The URI that the identity server will call it back.                            |
| `Logout Path`                             | string  | `"/logout"`              | Yes      |                                                                  | The URI that used to log out.                                                  |
| `Post Logout Redirect URI`                | string  |                          | Yes      |                                                                  | URI (in Location Header) used after logout from the identity server.           |
| `Save User Information to Request Header` | boolean | `true`                   | Yes      |                                                                  | Set the `X-UserInfo` header (which includes the user information) to upstream. |
