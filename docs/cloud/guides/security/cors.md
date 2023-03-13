---
title: Enable CORS
reading_time: auto
show_feedback: true
---

The CORS plugin allows users to enable the [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) mechanism on API7 Cloud.

You can configure the CORS plugin in an Service or an API.

1. If you configure the CORS plugin only for an [Service](../../concepts/service.md), it'll affect all [APIs](../../concepts/api.md) in this Service.
2. If you configure the CORS plugin only for an API, then the CORS plugin only affects this API.
3. If you configure the CORS plugin for both an Service and an API, the CORS plugin in API takes precedence.

How to Configure CORS Plugin
----------------------------

You can configure the CORS plugin when creating or updating a Service or API.

![CORS Plugin](https://static.apiseven.com/2022/12/30/cors-plugin.png)

In the above image, you can see:

1. `Access-Control-Allow-Origin` is set to `http://127.0.0.1:9080`.
2. `Access-Control-Allow-Methods` is set to `GET`.
3. `Access-Control-Max-Age` is set to `5` (seconds).
4. `Access-Control-Allow-Credentials` is `false`.
5. `Access-Control-Allow-Headers` and `Access-Control-Expose-Headers` are set to `*`.

How to Test the CORS Plugin
---------------------------

First, deploy a gateway instance and connect to the API7 Cloud.
Please see [Add a gateway instance and connect it to the API7 Cloud](../../getting-started/add-gateway-instance.md) to learn the details.

Then we can send a request to verify the CORS plugin.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: cloud.httpbin.org' -H 'Origin: http://127.0.0.1:9080' -X OPTIONS -i
```

```shell
HTTP/1.1 200 OK
Date: Wed, 13 Apr 2022 07:07:53 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/2.15.0
Access-Control-Allow-Origin: http://127.0.0.1:9080
Vary: Origin
Access-Control-Allow-Methods: GET
Access-Control-Max-Age: 5
Access-Control-Expose-Headers: *
Access-Control-Allow-Headers: *
```

As you can see, the CORS headers are the same as the ones in the above image that we set.

:::info
the CORS plugin overrides the CORS headers from upstream. But the
`Access-Control-Allow-Credentials` header is special. The CORS plugin doesn't
set this header if the value is `false`. So in such a case, if you still see
the `Access-Control-Allow-Credentials` header in the response, it means that
it's your upstream set it.
:::

What's Next
-----------

* [CORS Plugin Reference](../../references/plugins/security/cors.md)
* [Apache APISIX CORS Plugin](https://apisix.apache.org/docs/apisix/next/plugins/cors/)
