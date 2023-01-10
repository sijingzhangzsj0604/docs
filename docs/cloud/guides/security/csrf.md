---
title: Enable CSRF Prevention
reading_time: auto
show_feedback: true
---

[Cross-site request forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery#:~:text=Cross%2Dsite%20request%20forgery%2C%20also,that%20the%20web%20application%20trusts.), aka CSRF, is a web security vulnerability.
An attacker can cause the victim to execute an action unintentionally.

This guide will tell you how to prevent the CSRF attack with the help of the API7 Cloud CSRF plugin.

:::important

Before you go ahead, ensure you know the essentials about CSRF, including its impacts, how it works, and the standard way to prevent it.

:::

The CSRF plugin will generate a CSRF token for API requests and pass it through the `Set-Cookie` header so that the browser will set the
CSRF token to Cookie. The subsequent requests should also take the CSRF token in the request headers. The CSRF plugin will check if the cookie and request header token matches. Invalid requests will be rejected directly by [Apache APISIX](https://apisix.apache.org).

:::important
The CSRF plugin is not available in the Free plan. Please see the [Pricing Page](https://api7.ai/pricing) for details.
:::

Prepare the Environment
-----------------------

### Deploy Apache APISIX

Please refer to [How to Deploy Apache APISIX](../product/how-to-deploy-apache-apisix.md) to learn how to deploy
Apache APISIX and connect it to API7 Cloud. In this guide, we'll deploy an Apache APISIX instance on Docker.

### Create Application and API

We'll create an Application with the following details in this guide.

1. The Application name is `csrf-app`.
2. The path prefix is `/v1`.
3. The HTTP Host is `csrf.httpbin.org`.
4. The upstream URL is `https://httpbin.org`.

Besides, we'll create an API inside the `csrf-app` Application.

1. The API name is `anything`.
2. The path is `/anything` (prefix match), and strip the path prefix.
3. It accepts all HTTP methods.

:::note

If you don't know how to configure an Application and API, please refer to the [Getting Started](../../getting-started) guides first

:::

### Configure CSRF Plugin

Let's create the CSRF plugin on the `csrf-app` Application.

![Add CSRF Plugin](https://static.apiseven.com/2022/12/30/add-csrf-plugin.png)

The token name is `apisix-csrf-token`, it will be the header and Cookie key to pass the CSRF token, and it will expire after two hours (since it was generated).

Test CSRF Plugin
----------------

Let's first send a request to the `anything` API without the CSRF token.

```shell
curl http://127.0.0.1:9080/v1/anything -H 'Host: csrf.httpbin.org' -i
```

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 410
Connection: keep-alive
Date: Thu, 11 Aug 2022 07:19:04 GMT
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Server: APISIX/2.15.0
Set-Cookie: apisix-csrf-token=eyJzaWduIjoiMDM0N2ZkY2EzNTg4ZGE2MjFhM2U0ZjhlN2Y5MjM0ZWUyNzhiOTBjMDg2MzcwYjhhZTkzNDUwNGU4NzdlYjVjNCIsInJhbmRvbSI6MC43MzM0ODQwNTgxMDY3NywiZXhwaXJlcyI6MTY2MDIwMjM0NX0=;path=/;SameSite=Lax;Expires=Thu, 11-Aug-22 09:19:05 GMT

{
  "args": {},
  "data": "",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Host": "csrf.httpbin.org",
    "User-Agent": "curl/7.76.1",
    "X-Amzn-Trace-Id": "Root=1-62f4ad68-151d2b2847fe6a0b0f80ce6c",
    "X-Forwarded-Host": "csrf.httpbin.org"
  },
  "json": null,
  "method": "GET",
  "origin": "172.17.0.1, 61.241.66.251",
  "url": "https://csrf.httpbin.org/anything"
}
```

Since `GET` is a safe method, Apache APISIX won't intercept it even if we don't take the CSRF token.

:::tip

Safe HTTP methods are `GET`, `HEAD`, and `OPTIONS`.

:::

Now let's send a POST request.

```shell
curl http://127.0.0.1:9080/v1/anything -H 'Host: csrf.httpbin.org' -i -XPOST
```

```shell
HTTP/1.1 401 Unauthorized
Date: Thu, 11 Aug 2022 07:20:22 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/2.15.0
Set-Cookie: apisix-csrf-token=eyJzaWduIjoiYjcxZmQzN2U4ZWViNzk4YTg0ZThmYjZlMTNhYWM0ODkxNTViYjQ3ZTg0ZGQ4ODMwNzQ4NDI2NjQ0YzMxMjY3ZSIsInJhbmRvbSI6MC40NjIxMjg0OTI5NDk1NiwiZXhwaXJlcyI6MTY2MDIwMjQyMn0=;path=/;SameSite=Lax;Expires=Thu, 11-Aug-22 09:20:22 GMT
```

Since `POST` is unsafe, and we don't take CSRF tokens, the request is rejected by Apache APISIX.

Let's use the CSRF token returned by Apache APISIX and set it to the Cookie and `apisix-csrf-token` header.

```shell
curl http://127.0.0.1:9080/v1/anything -H 'Host: csrf.httpbin.org' -i -XPOST -H 'apisix-csrf-token: eyJzaWduIjoiYjcxZmQzN2U4ZWViNzk4YTg0ZThmYjZlMTNhYWM0ODkxNTViYjQ3ZTg0ZGQ4ODMwNzQ4NDI2NjQ0YzMxMjY3ZSIsInJhbmRvbSI6MC40NjIxMjg0OTI5NDk1NiwiZXhwaXJlcyI6MTY2MDIwMjQyMn0=' -H 'Cookie: apisix-csrf-token=eyJzaWduIjoiYjcxZmQzN2U4ZWViNzk4YTg0ZThmYjZlMTNhYWM0ODkxNTViYjQ3ZTg0ZGQ4ODMwNzQ4NDI2NjQ0YzMxMjY3ZSIsInJhbmRvbSI6MC40NjIxMjg0OTI5NDk1NiwiZXhwaXJlcyI6MTY2MDIwMjQyMn0='
```

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 806
Connection: keep-alive
Date: Thu, 11 Aug 2022 07:21:19 GMT
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Server: APISIX/2.15.0
Set-Cookie: apisix-csrf-token=eyJzaWduIjoiMjdhMDczM2JjMDhmNDIxYWE0MWI0ODQyNjhkMWMzMTZhODg1NDA4NzY1YmFmYjkwOGVkODMzNjEzMjhhYTFhMiIsInJhbmRvbSI6MC40ODMyNjM0OTI5NjI2MywiZXhwaXJlcyI6MTY2MDIwMjQ3OX0=;path=/;SameSite=Lax;Expires=Thu, 11-Aug-22 09:21:19 GMT

{
  "args": {},
  "data": "",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Apisix-Csrf-Token": "eyJzaWduIjoiYjcxZmQzN2U4ZWViNzk4YTg0ZThmYjZlMTNhYWM0ODkxNTViYjQ3ZTg0ZGQ4ODMwNzQ4NDI2NjQ0YzMxMjY3ZSIsInJhbmRvbSI6MC40NjIxMjg0OTI5NDk1NiwiZXhwaXJlcyI6MTY2MDIwMjQyMn0=",
    "Cookie": "apisix-csrf-token=eyJzaWduIjoiYjcxZmQzN2U4ZWViNzk4YTg0ZThmYjZlMTNhYWM0ODkxNTViYjQ3ZTg0ZGQ4ODMwNzQ4NDI2NjQ0YzMxMjY3ZSIsInJhbmRvbSI6MC40NjIxMjg0OTI5NDk1NiwiZXhwaXJlcyI6MTY2MDIwMjQyMn0=",
    "Host": "csrf.httpbin.org",
    "User-Agent": "curl/7.76.1",
    "X-Amzn-Trace-Id": "Root=1-62f4adef-23fd2d6e4df7a862059ab882",
    "X-Forwarded-Host": "csrf.httpbin.org"
  },
  "json": null,
  "method": "POST",
  "origin": "172.17.0.1, 61.241.66.251",
  "url": "https://csrf.httpbin.org/anything"
}
```

Since this request contains the CSRF token on Cookie and the `apisix-csrf-token` header, it passes the check and reaches the upstream.

See Also
--------

* [CSRF plugin Reference](../../references/plugins/security/csrf.md)
* [Apache APISIX CSRF Plugin](https://apisix.apache.org/docs/apisix/plugins/csrf/)
