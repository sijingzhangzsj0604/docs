---
title: Rate Limiting (Limit Count)
reading_time: auto
show_feedback: true
---

The Limit Count plugin limits the number of requests can be handled (in the given time period)
for an [Service](../../concepts/service.md) or [API](../../concepts/api.md).

:::info
The quota configured on API7 Cloud is for individual gateway instances.
It's exclusive instead of shared (among all of your instances).
:::

You can configure the Limit Count plugin in a Service or an API.

1. If you configure the Limit Count plugin only for a Service, it'll affect all APIs in this Service.
2. If you configure the Limit Count plugin only for an API, then the Limit Count plugin only affects this API.
3. If you configure the Limit Count plugin for both a Service and an API, the Limit Count plugin in API takes precedence.

> When you configure the Limit Count plugin in Service, all APIs in it won't share the rating quota,
they don't affect each other.

How to Configure Limit Count Plugin
-------------------------------------

You can configure the Limit Count plugin when creating or updating a Service or API.

![Limit Count Plugin](https://static.apiseven.com/2023/01/03/63b3dec96c55d.png)

In the above image, you can see:

1. Apache APISIX only accepts five requests in `1` minute.
2. The status code will be `429` if Apache APISIX rejects the request.
2. The response body will be `Too many requests` if Apache APISIX rejects the request.

How to Test the Limit Count Plugin
------------------------------------

First, deploy a gateway instance and connect to the API7 Cloud.
Please see [Add a gateway instance and connect it to the API7 Cloud](../../getting-started/add-gateway-instance.md) to learn the details.

Then we can send a bunch of requests to verify the Limit Count plugin.

```shell
for ((i=0; i<6; i++)); do
  curl http://127.0.0.1:9080/v1/json -H 'Host: cloud.httpbin.org' -s -o/dev/null -w 'status code: %{http_code}\n'
done
```

```shell
status code: 200
status code: 200
status code: 200
status code: 200
status code: 200
status code: 429
```

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: cloud.httpbin.org' -s
```

```shell
{"error_msg":"Too many requests"}
```

As you can see, Apache APISIX rejects the 6th request as expected,
and we sent another request to check the response body, which
is also expected.

What's Next
------------

* [Limit Count Plugin Reference](../../references/plugins/traffic-management/limit-count.md)
* [Apache APISIX Limit Count Plugin](https://apisix.apache.org/docs/apisix/next/plugins/limit-count)
