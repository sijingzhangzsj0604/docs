---
title: Use Key Auth to Protect Your APIs
reading_time: auto
show_feedback: true
---

You may want to protect your [APIs](../../../concepts/api.md)  or [Services](../../../concepts/service.md) by using API authentication.
With the requirement of authentication, API7 Cloud will only forward API requests with valid authentication credentials. Other requests (without
credentials or with a wrong one) will be rejected and get a `401 Unauthorized` response.

Key Auth is an API authentication method that asks the API clients to provide a valid
key or token as the identifier. The key (or the token) will be shared by the API clients and the API provider or the API Gateway.

This guide will introduce using Key Auth to protect your APIs on API7 Cloud. You can also safeguard Services as long as you configure the Authentication plugin on the Service (instead of a specific API).

:::important

API7 Cloud uses the [Consumer](../../../concepts/consumer.md) concept to implement fine-grained API authentication, so please
learn what is Consumer before you go ahead.

:::

Prepare the Environment
-----------------------

### Deploy Apache APISIX

Please refer to [How to Deploy Apache APISIX](../../product/how-to-deploy-apache-apisix.md) to learn how to deploy
Apache APISIX and connect it to API7 Cloud. In this guide, we'll deploy an Apache APISIX instance on Docker.

### Create Service and API

We'll create a Service with the following details in this guide.

1. The Service name is `key-auth-app`.
2. The path prefix is `/v1`.
3. The HTTP Host is `auth.httpbin.org`.
4. The upstream URL is `https://httpbin.org`.

Besides, we'll create an API inside the `key-auth-app` Service.

1. The API name is `json`.
2. The path is `/json` (exact match).
3. Accepted HTTP method is `GET`.

:::tip

If you don't know how to configure a Service and API, please refer to the [Getting Started](../../../getting-started) guides first

:::

Configure Authentication Plugin on the API
------------------------------------------

You need to enable the Authentication plugin on the `json` API as per the steps below:

1. Enter the `json` API details page.
3. Click on **Add Plugin** and select the Authentication plugin.
4. Choose Key Auth as the authentication method and fill out the form.

![Authentication Plugin Key Auth](https://static.apiseven.com/2022/12/30/add-authentication-plugin-key-auth.png)

You can customize the HTTP request header name to carry the key. The default value is `apikey`.
In this case, we set the header name to `Authorization`.

:::tip
The checkbox `Strip Credentials` controls if Apache APISIX should remove the authentication credentials before forwarding
the requests to the backend. By default, it will be reserved.
:::

Now let's try to access this API.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: key-auth.httpbin.org' -i
```

```shell
HTTP/1.1 401 Unauthorized
Date: Wed, 08 Jun 2022 08:38:07 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/2.15.0

{"message":"Missing API key found in request"}
```

Since we don't take any credentials, Apache APISIX will reject the request.

Configure Key Auth Plugin on Consumer
-------------------------------------

Now let's create a Consumer and enable the Authentication plugin.

1. The Consumer's name is `alex`.
2. Enable the Authentication plugin and choose Key Auth as the authentication method.
3. Fill in the string `ec8e8fa78d4e271b368d` as the API key.

Test the Authentication
-----------------------

Let's send a request with the API key.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: auth.httpbin.org' -i -H 'Authorization: ec8e8fa78d4e271b368d'
```

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 429
Connection: keep-alive
Date: Wed, 08 Jun 2022 08:47:22 GMT
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Server: APISIX/2.15.0

{
  "slideshow": {
    "author": "Yours Truly",
    "date": "date of publication",
    "slides": [
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "items": [
          "Why <em>WonderWidgets</em> are great",
          "Who <em>buys</em> WonderWidgets"
        ],
        "title": "Overview",
        "type": "all"
      }
    ],
    "title": "Sample Slide Show"
  }
}
```

After taking the correct API key, the request is forwarded to the backend.

If we take the wrong API key, the API request will also be rejected by Apache APISIX.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: auth.httpbin.org' -i -H 'Authorization: bad-api-key'
```

```shell
HTTP/1.1 401 Unauthorized
Date: Wed, 08 Jun 2022 08:49:36 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/2.15.0

{"message":"Invalid API key in request"}
```

What's Next
-----------

* [Authentication Plugin Reference](../../../references/plugins/traffic-management/authentication.md)
* [Apache APISIX Key Auth Plugin](https://apisix.apache.org/docs/apisix/next/plugins/key-auth/)
