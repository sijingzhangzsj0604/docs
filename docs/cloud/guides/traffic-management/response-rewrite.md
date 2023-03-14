---
title: Response Transforming
reading_time: auto
show_feedback: true
---

Sometimes you may need to transform the response of the API requests before sending them to the client, such as rewriting the HTTP status code,
modifying headers and even the response body.

This guide tells you how to use the Response Rewrite plugin to do the response transforming.

Prepare the Environment
-----------------------

### Deploy Apache APISIX

Please refer to [How to Deploy Apache APISIX](../product/how-to-deploy-apache-apisix.md) to learn how to deploy
Apache APISIX and connect it to API7 Cloud. In this guide, we'll deploy an Apache APISIX instance on Docker.

### Create Service and Route

We'll create a service with the following details in this guide.

1. The service name is `resp-rewrite-app`.
2. The path prefix is `/v1`.
3. The HTTP Host is `resp-rewrite.httpbin.org`.
4. The upstream URL is `https://httpbin.org`.

Besides, we'll create a route inside the `resp-rewrite-app` Service.

1. The route name is `anything`.
2. The path is `/anything` (prefix match), and strip the path prefix.
3. It accepts all HTTP methods.

:::note

If you don't know how to configure a service and route, please refer to the [Getting Started](../../getting-started) guides first

:::

Test Response Transforming
-------------------------

Now let's test the response transforming. We'll show you the following transforming scenarios.

* Rewrite HTTP status code
* Rewrite HTTP response headers
* Modify the HTTP response body

:::tip

You can also combine the above transforming cases according to your actual situation.

:::

### Rewrite HTTP Status Code

Let's add the Response Rewrite plugin first.

![Add Response Rewrite Plugin 1](https://static.apiseven.com/2022/12/30/add-response-rewrite-plugin-1.png)

We'll set the HTTP status code to `403` in this case. Then send a request to verify it.

```shell
curl http://127.0.0.1:9080/v1/anything -H 'Host: resp-rewrite.httpbin.org' -i
```

```shell
HTTP/1.1 403 Forbidden
Content-Type: application/json
Content-Length: 434
Connection: keep-alive
Date: Mon, 29 Aug 2022 09:31:00 GMT
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Server: APISIX
X-APISIX-Upstream-Status: 200

{
  "args": {},
  "data": "",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Host": "resp-rewrite.httpbin.org",
    "User-Agent": "curl/7.76.1",
    "X-Amzn-Trace-Id": "Root=1-630c8754-0fda4fe86f87831a2b32ff11",
    "X-Forwarded-Host": "resp-rewrite.httpbin.org"
  },
  "json": null,
  "method": "GET",
  "origin": "172.17.0.1, 61.241.66.251",
  "url": "https://resp-rewrite.httpbin.org/anything"
}
```

The status code is changed to `403`, but the HTTP headers and the body are not changed.

### Rewrite HTTP Headers

Now let's modify the HTTP headers.

![Add Response Rewrite Plugin 2](https://static.apiseven.com/2022/12/30/add-response-rewrite-plugin-2.png)

In this case, we add a new header, `X-My-Header`, and the expected value is `My-Value`; In addition, we remove the
`Access-Control-Allow-Origin` and `Access-Control-Allow-Credentials` headers. Let's send an API request to verify it.

```shell
curl http://127.0.0.1:9080/v1/anything -H 'Host: resp-rewrite.httpbin.org' -i
```

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 434
Connection: keep-alive
Date: Mon, 29 Aug 2022 09:36:51 GMT
Server: APISIX
X-APISIX-Upstream-Status: 200
X-My-Header: My-Value

{
  "args": {},
  "data": "",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Host": "resp-rewrite.httpbin.org",
    "User-Agent": "curl/7.76.1",
    "X-Amzn-Trace-Id": "Root=1-630c88b3-7570d890100c30647ff1879f",
    "X-Forwarded-Host": "resp-rewrite.httpbin.org"
  },
  "json": null,
  "method": "GET",
  "origin": "172.17.0.1, 61.241.66.251",
  "url": "https://resp-rewrite.httpbin.org/anything"
}
```

The response shows that the `X-My-Header` is added, and the value is correct.
Besides, `Access-Control-Allow-Credentials` and `Access-Control-Allow-Credentials` are removed.

### Replace Response Body

You can even replace the response body via the Response Rewrite plugin.

![Add Response Rewrite Plugin 3](https://static.apiseven.com/2022/12/30/add-response-rewrite-plugin-3.png)

In this case, we set the body to `{"message": "hello world"}`. Let's send a request to verify it.

```shell
curl http://127.0.0.1:9080/v1/anything -H 'Host: resp-rewrite.httpbin.org' -i
```

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Date: Mon, 29 Aug 2022 09:44:26 GMT
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Server: APISIX
X-APISIX-Upstream-Status: 200

{"message": "hello world"}
```

The response body is changed to the one we expect.

:::important
If the desired response body is an octet stream, you can encode it into base64 format, then paste it on the API7 Cloud console.
In such a case, don't forget to opt in the **Base64 Decode Body** checkbox. It asks Apache APISIX to decode the body before
sending it to clients.
:::

See Also
--------

* [Response Rewrite Plugin Reference](../../references/plugins/traffic-management/response-rewrite.md)
* [Apache APISIX Response Rewrite Plugin](https://apisix.apache.org/docs/apisix/plugins/response-rewrite/)
