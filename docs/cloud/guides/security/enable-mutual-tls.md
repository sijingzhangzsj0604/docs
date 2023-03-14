---
title: Enable Mutual TLS
reading_time: auto
show_feedback: true
---

Mutual TLS (aka mTLS) asks the client to provide a certificate as its
identifier so that the server can verify it in a TLS handshake.

This guide will show you how to enable the mTLS to protect your [Service](../../concepts/service.md).

:::important

Please read [What is SSL](../../concepts/ssl.md) before you go ahead.

:::

Prepare Certificates
--------------------

To show the mTLS feature, we use `openssl` to generate three key pairs:

```shell
# Generate the CA certificate and private key
openssl req  -x509 -nodes -new -keyout ca.key -out ca.crt -days 3650 -subj "/C=/ST=/L=/O=/OU=web/CN=private_ca"

# Generate the server certificate sign request and its private key
openssl req -newkey rsa:2048 -nodes -days 3650 -keyout server.key -out server.req

# Generate the server certificate
openssl x509 -req -days 3650 -set_serial 01 -in server.req -out server.crt -CA ca.crt -CAkey ca.key

# Generate the client certificate sign request and its private key
openssl req -newkey rsa:2048 -nodes -days 3650 -keyout client.key -out client.req -subj "/C=/ST=/L=/O=/OU=web/CN=mtls.httpbin.org"

# Generate the client certificate
openssl x509 -req -days 3650 -set_serial 01 -in client.req -out client.crt -CA ca.crt -CAkey ca.key
```

You can skip the above steps if you already have these certificates.

Create SSL Object
-----------------

Follow the tips in [How to Create SSL Object](../../concepts/ssl.md#how-to-create-ssl-object) and upload the server certificate, private key, CA certificate, API7 Cloud
creates an SSL object.

Create Service and Route
------------------------

We'll create a service with the following details in this guide.

* The service name is `mtls-auth-app`.
* The path prefix is `/v1`.
* The protocol is `HTTPS`.
* The HTTP Host is `mtls.httpbin.org`.
* The upstream URL is `https://httpbin.org`.

Besides, we'll create a route inside the mtls-auth-app Service.

* The route name is `json`.
* The path is `/json` (exact match).
* Accepted HTTP method is `GET`.

:::tip

If you don't know how to configure a service and route, please refer to the [Getting Started](../../getting-started)
guides first

:::

Test mTLS
---------

Now let's try to access the JSON route without a client certificate.

```shell
curl https://mtls.httpbin.org:9443/v1/json --resolve 'mtls.httpbin.org:9443:127.0.0.1' --cacert ca.crt -i
```

```shell
HTTP/2 400
date: Thu, 09 Jun 2022 02:29:01 GMT
content-type: text/html; charset=utf-8
content-length: 154
server: APISIX/2.15.0

<html>
<head><title>400 Bad Request</title></head>
<body>
<center><h1>400 Bad Request</h1></center>
<hr><center>openresty</center>
</body>
</html>
```

You will get a `400 Bad Request` response instead of a TLS error to report something like
"missing client certificate". This is due to the mTLS mechanism in [Apache APISIX](https://apisix.apache.org/).

Now let's take the client certificate and reaccess it.

```shell
curl https://mtls.httpbin.org:9443/v1/json --resolve 'mtls.httpbin.org:9443:127.0.0.1' --cert client.crt --key client.key --cacert ca.crt
```

```shell
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

After we take the correct client certificate, the TLS handshake is successful, and the API request returns
the correct response.

See Also
--------

* [Enable Upstream Mutual TLS](./enable-upstream-mutual-tls.md)
