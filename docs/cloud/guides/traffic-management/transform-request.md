---
title: Request Transforming
reading_time: auto
show_feedback: true
---

Sometimes you may need to transform the API requests before forwarding them to the backend services, such as adding/replacing some
request headers, modify the request URI, and change the HTTP method.

This guide tells you how to use the Request Rewrite plugin to do the request transforming.

Prepare the Environment
-----------------------

### Deploy Apache APISIX

Please refer to [How to Deploy Apache APISIX](../product/how-to-deploy-apache-apisix.md) to learn how to deploy
Apache APISIX and connect it to API7 Cloud. In this guide, we'll deploy an Apache APISIX instance on Docker.

### Create Application and API

We'll create an Application with the following details in this guide.

1. The Application name is `transform-app`.
2. The path prefix is `/v1`.
3. The HTTP Host is `rewrite.httpbin.org`.
4. The upstream URL is `https://httpbin.org`.

Besides, we'll create an API inside the `transform-app` Application.

1. The API name is `anything`.
2. The path is `/anything` (prefix match), and strip the path prefix.
3. It accepts all HTTP methods.

:::note

If you don't know how to configure an Application and API, please refer to the [Getting Started](../../getting-started) guides first

:::

Test Request Transforming
-------------------------

Now let's test the request transforming. We'll show you the following transforming scenarios.

* Rewrite HTTP Method
* Rewrite Request URI
* Modify Request Headers

:::tip

You can also combine the above transforming cases according to your actual situation.

:::

### Rewrite HTTP Method

Let's create the Request Rewrite plugin (on the `anything` API) in which we rewrite the HTTP method to `GET`.

![Request Rewrite Plugin Rewrite HTTP Method](https://static.apiseven.com/2022/12/30/add-request-rewrite-plugin-rewrite-method.png)

Now let's send a request to verify it.

```shell
curl http://127.0.0.1:9080/v1/anything -H 'Host: rewrite.httpbin.org' -s -XPOST
```

```shell
{
  "args": {},
  "data": "",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Host": "rewrite.httpbin.org",
    "User-Agent": "curl/7.76.1",
    "X-Amzn-Trace-Id": "Root=1-62b55b92-3bee7a141e72e1187ae696a7",
    "X-Forwarded-Host": "rewrite.httpbin.org"
  },
  "json": null,
  "method": "GET",
  "origin": "172.17.0.1, 61.241.66.251",
  "url": "https://rewrite.httpbin.org/anything"
}
```

The original HTTP method is `POST,` and it's rewritten to `GET` (the `method` field).

### Rewrite Request URI

#### Replace URI

Assume that we want to access the `/json` API when we access `/v1/anything`. In such a case, let's update the
Request Rewrite plugin just like below:

![Request Rewrite Plugin Replace URI](https://static.apiseven.com/2022/12/30/request-rewrite-plugin-replace-uri.png)

Now let's send a request and see the response.

```shell
curl http://127.0.0.1:9080/v1/anything -H 'Host: rewrite.httpbin.org'
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

As you can see, we got the JSON response, which means Apache APISIX accessed the `/json` API.

#### Regex Replace URI

Sometimes we want to replace the URI only if the current request URI meets some conditions. Under such a circumstance, we
can use the regex replace, filling the regex pattern and the replacement pattern.

![Rewrite Regex Replace URI](https://static.apiseven.com/2022/12/30/request-rewrite-plugin-regex-replace-uri.png)

:::tip
The **New URI** can use the [capture group](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges#using_groups) so that
it can inherit some URI components from the original URI.
:::

Let's send a request which URI contains the base64 code of `"Hello, API7 Cloud!"`. You can calculate the base64 code by running:

```shell
echo 'Hello, API7 Cloud!' | base64
```

```shell
curl http://127.0.0.1:9080/v1/anything/SGVsbG8sIEFQSTcgQ2xvdWQhCg== -H 'Host: rewrite.httpbin.org' -s
```

And the response body will be:

```shell
Hello, API7 Cloud!
```

### Modify Request Headers

You may also want to operate (add, replace, delete) the HTTP request headers in the API Gateway for some business needs. Let's update the
Request Rewrite plugin as per the rules below:

1. Add or replace the `Accept-Encoding` header, the value is `deflate`;
2. Add or replace the `X-Proxy-Component` header, value is `Apache APISIX`;
3. Delete the `User-Agent` header;

![Request Rewrite Modify Request Headers](https://static.apiseven.com/2022/12/30/request-rewrite-modify-headers.png)

```shell
curl http://127.0.0.1:9080/v1/anything -H 'Host: rewrite.httpbin.org' -H 'Accept-Encoding: gzip'
```

```shell
{
  "args": {},
  "data": "",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "deflate",
    "Host": "rewrite.httpbin.org",
    "X-Amzn-Trace-Id": "Root=1-62b5652d-2ca3b15750386d2a2d7f679e",
    "X-Forwarded-Host": "rewrite.httpbin.org",
    "X-Proxy-Component": "Apache APISIX"
  },
  "json": null,
  "method": "GET",
  "origin": "172.17.0.1, 61.241.66.251",
  "url": "https://rewrite.httpbin.org/anything"
}
```

As you can see, Apache APISIX adds the `X-Proxy-Component` header, rewrites the `Accept-Encoding` (original value is `gzip`), and removes the
`User-Agent` header (curl always adds the `User-Agent`).

See Also
--------

* [Request Rewrite Plugin Reference](../../references/plugins/traffic-management/request-rewrite.md)
* [Apache APISIX Proxy Rewrite Plugin](https://apisix.apache.org/docs/apisix/plugins/proxy-rewrite/)
