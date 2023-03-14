---
title: Build HTTPS Only Service
reading_time: auto
show_feedback: true
---

Sometimes you don't want your clients to access the [Service](../../concepts/service.md) over HTTP.
Since some security considerations, in such a case, you may want to build an HTTPS-only Service on API7 Cloud.

Configure SSL Object
--------------------

Follow the tips in [How to Create SSL Object](../../concepts/ssl.md#how-to-create-ssl-object) and upload the server certificate, private key, CA certificate, API7 Cloud
creates an SSL object.

:::tip

In this guide, we use `openssl` to generate a self-signed certificate.

```shell
openssl req  -x509 -nodes -new  -keyout cloud.key -out cloud.crt -days 3650 -subj "/C=/ST=/L=/O=/OU=web/CN=cloud.httpbin.org"
```

:::

Configure HTTPS Protocol for Service
------------------------------------

After you sign in to API7 Cloud, please go ahead according
to the following steps:

1. Go to the Service list page by clicking on the **Service** button under **API Management** (in the left sidebar).
2. Search the target Service that you want to configure HTTPS protocol, clicking on the **edit** button.
3. You'll be redirected to the Service edit page, configuring the `Protocol` field to `HTTPS` and saving the changes.

:::info
In our case, the target Service has the following characteristics:

1. The host is `cloud.httpbin.org`.
2. The upstream target is `https://httpbin.org`.
3. Path prefix is `/v1`.
4. There is a JSON route (the endpoint is `/v1/json`).
:::

Send requests to verify
-----------------------

Since we only enable HTTPS protocol, if we try to access a route in this service,
we should get a `301 Moved Permanently` response asking us to use HTTPS protocol.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: cloud.httpbin.org' -i
HTTP/1.1 301 Moved Permanently
Date: Fri, 15 Apr 2022 03:04:23 GMT
Content-Type: text/html
Content-Length: 166
Connection: keep-alive
Location: https://cloud.httpbin.org/v1/json
Server: APISIX/2.15.0

<html>
<head><title>301 Moved Permanently</title></head>
<body>
<center><h1>301 Moved Permanently</h1></center>
<hr><center>openresty</center>
</body>
</html>
```

As expected, Apache APISIX asks us to access the HTTPS endpoint.

```shell
curl https://cloud.httpbin.org:9443/v1/json --resolve 'cloud.httpbin.org:9443:127.0.0.1' -sk
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

We got a successful response when we accessed the HTTPS endpoint.

:::tip
Since the certificate we use was self-signed, we added the `-k` option in the above curl command.
:::
