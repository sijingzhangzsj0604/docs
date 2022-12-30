---
title: Add Request ID for API Requests
reading_time: auto
show_feedback: true
---

You may want to assign an ID for your API requests so that you can identify the request from external systems like
querying the access log or the trace.

This guide will teach you how to add ID for your API requests with the help of the Request ID plugin.

Prepare the Environment
-----------------------

### Deploy Apache APISIX

Please refer to [How to Deploy Apache APISIX](../product/how-to-deploy-apache-apisix.md) to learn how to deploy
Apache APISIX and connect it to API7 Cloud. In this guide, we'll deploy an Apache APISIX instance on Docker.

### Create Application and API

We'll create an Application with the following details in this guide.

1. The Application name is `request-id-app`.
2. The path prefix is `/v1`.
3. The HTTP Host is `request-id.httpbin.org`.
4. The upstream URL is `https://httpbin.org`.

Besides, we'll create an API inside the `request-id-app` Application.

1. The API name is `anything`.
2. The path is `/anything` (prefix match), and strip the path prefix.
3. It accepts all HTTP methods.

:::note

If you don't know how to configure an Application and API, please refer to the [Getting Started](../../getting-started) guides first

:::

### Add Request ID Plugin

Now let's add the Request ID plugin to the `request-id-app` Application.

![Request ID Plugin](https://static.apiseven.com/2022/12/30/request-id.png)

API7 Cloud will add an [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) for each request in this Application.
We also include the ID in the response header.

Test
----

Now let's send a request to the `anything` API.

```shell
curl http://127.0.0.1:9080/v1/anything -H 'Host: request-id.httpbin.org' -i
```

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 490
Connection: keep-alive
Date: Wed, 17 Aug 2022 08:16:10 GMT
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Server: APISIX/2.15.0
My-Request-ID: c93e7c59-7e98-4827-b945-8ef63cb6eb90

{
  "args": {},
  "data": "",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Host": "request-id.httpbin.org",
    "My-Request-Id": "c93e7c59-7e98-4827-b945-8ef63cb6eb90",
    "User-Agent": "curl/7.76.1",
    "X-Amzn-Trace-Id": "Root=1-62fca3ca-69e1fd98029339a257b57276",
    "X-Forwarded-Host": "request-id.httpbin.org"
  },
  "json": null,
  "method": "GET",
  "origin": "172.17.0.1, 61.241.66.251",
  "url": "https://request-id.httpbin.org/anything"
}
```

As you can see from the response body, Apache APISIX takes the `My-Request-ID` header when forwarding the request to the backend.
Also, since we enable the `Include in Response` option, the `My-Request-ID` header is shown in the response header.

:::important
Apache APISIX won't overwrite the request ID header if it already exists. Try to send another request with the header `My-Request-ID: 123456`!
:::

See Also
--------

* [Request ID Plugin Reference](../../references/plugins/product/request-id.md)
* [Apache APISIX Request ID Plugin](https://apisix.apache.org/docs/apisix/plugins/request-id/)
