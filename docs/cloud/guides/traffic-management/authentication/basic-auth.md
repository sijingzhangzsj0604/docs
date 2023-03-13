---
title: Use Basic Auth to Protect Your APIs
reading_time: auto
show_feedback: true
---

You may want to protect your [APIs](../../../concepts/api.md)  or [Service](../../../concepts/service.md) by using API authentication.
With the authentication requirement, API7 Cloud will only forward API requests with valid authentication credentials. Other requests (without
credentials or with a wrong one) will be rejected and get a `401 Unauthorized` response.

Basic Auth is an API authentication method that asks the API clients to provide a valid
username and password pair.

This guide will introduce using Basic Auth to protect your APIs when using API7 Cloud. You can also safeguard Service as long as you configure the Service's authentication plugin (instead of a specific API).

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

1. The Service name is `basic-auth-app`.
2. The path prefix is `/v1`.
3. The HTTP Host is `auth.httpbin.org`.
4. The upstream URL is `https://httpbin.org`.

Besides, we'll create an API inside the `basic-auth-app` Service.

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
2. Click on **Add Plugin** and select the Authentication plugin.
3. Choose Basic Auth as the authentication method and fill out the form.

![Authentication Plugin Basic Auth](https://static.apiseven.com/2022/12/30/add-authentication-plugin-basic-auth.png)

:::tip
The checkbox `StripCredentials` controls if Apache APISIX should remove the authentication credentials before forwarding
the requests to the backend. By default, it will be reserved.
:::

Now let's try to access this API.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: auth.httpbin.org' -i
```

```shell
HTTP/1.1 401 Unauthorized
Date: Thu, 09 Jun 2022 01:37:17 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
WWW-Authenticate: Basic realm='.'
Server: APISIX/2.15.0

{"message":"Missing authorization in request"}
```

Since we don't take any credentials, Apache APISIX will reject the request.

Configure Basic Auth Plugin on Consumer
--------------------------------------

Now let's create a Consumer and enable the Authentication plugin.

1. The Consumer's name is `alex`.
2. Enable the Authentication plugin and choose Basic Auth as the authentication method.
3. Fill in `alex` as the username and `123456` as the password.

:::warning

Use the strong password in actual cases.

:::

Test the Authentication
-----------------------

Let's send a request with the username and password.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: auth.httpbin.org' -i -u alex:123456
```

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 429
Connection: keep-alive
Date: Mon, 13 Jun 2022 07:28:33 GMT
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

After taking the correct username and password, Apache APISIX will forward the request to the backend.

If we take the wrong username and password pair, the API request will also be rejected by Apache APISIX.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: auth.httpbin.org' -i -u wrong-user:wrong-password
```

```shell
HTTP/1.1 401 Unauthorized
Date: Mon, 13 Jun 2022 07:36:47 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/2.15.0

{"message":"Invalid user key in authorization"}
```

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: auth.httpbin.org' -i -u alex:wrong-password
```

```shell
HTTP/1.1 401 Unauthorized
Date: Mon, 13 Jun 2022 07:36:28 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/2.15.0

{"message":"Password is error"}
```

What's Next
-----------

* [Authentication Plugin Reference](../../../references/plugins/traffic-management/authentication.md)
* [Apache APISIX Basic Auth Plugin](https://apisix.apache.org/docs/apisix/next/plugins/basic-auth/)
