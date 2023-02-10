---
title: Key Authentication
slug: /getting-started/key-authentication
---

API gateway's primary role is to connect API consumers and providers, for security reasons, it should authenticate, identity, and constrain on the consumers, such as access restriction, blocking, etc.

![Key Authentication](https://static.apiseven.com/uploads/2023/02/08/8mRaK3v1_consumer.png)

APISIX provides flexible plugin extension capabilities and rich plugins for user authentication and authorization, for example:

- [Key Authentication](https://apisix.apache.org/docs/apisix/plugins/key-auth/)
- [Basic Authentication](https://apisix.apache.org/docs/apisix/plugins/basic-auth/)
- [JSON Web Token (JWT) Authentication](https://apisix.apache.org/docs/apisix/plugins/jwt-auth/)
- [Keycloak](https://apisix.apache.org/docs/apisix/plugins/authz-keycloak/)
- [Casdoor](https://apisix.apache.org/docs/apisix/plugins/authz-casdoor/)
- [Wolf RBAC](https://apisix.apache.org/docs/apisix/plugins/wolf-rbac/)
- [OpenID Connect](https://apisix.apache.org/docs/apisix/plugins/openid-connect/)
- [Central Authentication Service (CAS)](https://apisix.apache.org/docs/apisix/plugins/cas-auth/)
- [HMAC](https://apisix.apache.org/docs/apisix/plugins/hmac-auth/)
- [Casbin](https://apisix.apache.org/docs/apisix/plugins/authz-casbin/)
- [LDAP](https://apisix.apache.org/docs/apisix/plugins/ldap-auth/)
- [Open Policy Agent (OPA)](https://apisix.apache.org/docs/apisix/plugins/opa/)
- [Forward Authentication](https://apisix.apache.org/docs/apisix/plugins/forward-auth/)

In this tutorial, you will create one _Consumer_ with _Key Authentication_, and learn how to enable and disable key authentication.

## What is a Consumer

A Consumer is an application or a developer who consumes the API.

One Consumer should have unique _username_ and the corresponding authentication _plugins_ mentioned above at least.

## What is the Key Authentication

Key authentication is a relatively simple but widely used authentication approach.

1. Administrator adds an authentication key (API key) to the Route. 
2. API consumers add the key to the query string or headers to authenticate their requests.

## Enable Key Authentication

### Prerequisites

1. Complete the [Get APISIX](./) step to install APISIX first.
2. Complete the [Configure Routes](./configure-routes#whats-a-route) step.
### Create a Consumer

Let's create a consumer named `tom`, and enable the `key-auth` plugin with the key `secret-key`, which means all requests with the key `secret-key` are considered from `tom`.

:::caution

Please use a complex key in the Production environment.

:::

```sh
curl -i "http://127.0.0.1:9180/apisix/admin/consumers" -X PUT -d '
{
  "username": "tom",
  "plugins": {
    "key-auth": {
      "key": "secret-key"
    }
  }
}'
```

You will receive an `HTTP/1.1 200 OK` response if the consumer was created successfully.

### Enable Authentication

The following route inherits from [Configure Routes](./configure-routes), and we only need to use the `PATCH` method to add the `key-auth` plugin to the route.

```sh
curl -i "http://127.0.0.1:9180/apisix/admin/routes/getting-started-ip" -X PATCH -d '
{
  "plugins": {
    "key-auth": {}
  }
}'
```

You will receive an `HTTP/1.1 201 Created` response if the plugin was added successfully.

### Validate

Here are three kinds of validation:

#### 1. Send a request without key

Send a request without the `apikey` header.

```sh
curl -i "http://127.0.0.1:9080/ip"
```

Since you enabled the key authentication, you will receive an unauthorized response with `HTTP/1.1 401 Unauthorized`.

```text
HTTP/1.1 401 Unauthorized
Date: Wed, 08 Feb 2023 09:38:36 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/3.1.0
```

#### 2. Send a request with a wrong key

Send a request with a wrong key (e.g., `wrong-key`) in the `apikey` header.

```sh
curl -i "http://127.0.0.1:9080/ip" -H 'apikey: wrong-key'
```

Since the key is not equal to `secret-key`, you will receive an unauthorized response with `HTTP/1.1 401 Unauthorized`.

```text
HTTP/1.1 401 Unauthorized
Date: Wed, 08 Feb 2023 09:38:27 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/3.1.0
```

#### 3. Send a request with the correct key

Send a request with the correct key (`secret-key`) in the `apikey` header.

```sh
curl -i "http://127.0.0.1:9080/ip" -H 'apikey: secret-key'
```

You will receive an `HTTP/1.1 200 OK` response.

```text
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 44
Connection: keep-alive
Date: Thu, 09 Feb 2023 03:27:57 GMT
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Server: APISIX/3.1.0
```

### Disable Authentication

Disable the authentication by setting the `_meta.disable` parameter to `true`.

```sh
curl "http://127.0.0.1:9180/apisix/admin/routes/getting-started-ip" -X PATCH -d '
{
  "plugins": {
    "key-auth": {
      "_meta": {
        "disable": true
      }
    }
  }
}'
```

And then, you can send an unauthenticated request (e.g., without the `apikey` header) to validate if the authentication was disabled.

```sh
curl -i "http://127.0.0.1:9080/ip"
```

Because you have disabled the key authentication, you will receive an `HTTP/1.1 200 OK` response.

## What's Next

You have learned how to configure authentication for a specific route. In the next tutorial, you will learn how to configure the rate limiting.
