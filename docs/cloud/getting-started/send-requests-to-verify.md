---
title: Test the HTTPBIN Application and API
reading_time: auto
show_feedback: true
---

Now you created the HTTPBIN Application and a JSON API for it. Let's send a request to verify if it's working.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: cloud.httpbin.org' -v
```

We set the host header to `cloud.httpbin.org` and the request path to `/json`. And you have an APISIX instance listening on `127.0.0.1:9080` as per the guide.
So you'll see the output below.

```shell
*   Trying 127.0.0.1:9080...
* Connected to 127.0.0.1 (127.0.0.1) port 9080 (#0)
> GET /v1/json HTTP/1.1
> Host: cloud.httpbin.org
> User-Agent: curl/7.76.1
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Content-Type: application/json
< Content-Length: 429
< Connection: keep-alive
< X-RateLimit-Limit: 5
< X-RateLimit-Remaining: 4
< Date: Fri, 22 Apr 2022 02:20:41 GMT
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Credentials: true
< Server: APISIX/2.15.0
<
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

As you can see, we got a JSON string from APISIX, which is the response that we want to get (from https://httpbin.org).

:::note
HTTPBIN service randomly generates the JSON string data, so the data you got might differ from the data you get from this request.
:::

Congratulations! Now that you test the HTTPBIN Application and its JSON API, everything is working.

Next
----

[Attach the Rate Limiting Plugin](./attach-rate-limiting-plugin.md).
