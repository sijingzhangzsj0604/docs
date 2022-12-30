---
title: Rate Limiting
reading_time: auto
show_feedback: true
---

The Rate Limiting plugin limits the number of requests can be handled (in the given time period)
for an [Application](../../concepts/application.md) or [API](../../concepts/api.md).

:::info
The quota configured on API7 Cloud is for individual data plane instances.
It's exclusive instead of shared (among all of your instances).
:::

You can configure the Rate Limiting plugin in an Application or an API.

1. If you configure the Rate Limiting plugin only for an Application, it'll affect all APIs in this Application.
2. If you configure the Rate Limiting plugin only for an API, then the Rate Limiting plugin only affects this API.
3. If you configure the Rate Limiting plugin for both an Application and an API, the Rate Limiting plugin in API takes precedence.

> When you configure the Rate Limiting plugin in Application, all APIs in it won't share the rating quota,
they don't affect each other.

How to Configure Rate Limiting Plugin
-------------------------------------

You can configure the Rate Limiting plugin when creating or updating an Application or API.

![Rate Limiting Plugin](https://static.apiseven.com/2022/12/30/rate-limiting-plugin.png)

In the above image, you can see:

1. Apache APISIX only accepts five requests in `1` minute.
2. The status code will be `429` if Apache APISIX rejects the request.
2. The response body will be `Too many requests` if Apache APISIX rejects the request.

How to Test the Rate Limiting Plugin
------------------------------------

First, deploy a data plane instance and connect to the API7 Cloud.
Please see [Add a data plane instance and connect it to the API7 Cloud](../../getting-started/add-data-plane-instance.md) to learn the details.

Then we can send a bunch of requests to verify the Rate Limiting plugin.

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

* [Rate Limiting Plugin Reference](../../references/plugins/traffic-management/rate-limiting.md)
* [Apache APISIX Limit Count Plugin](https://apisix.apache.org/docs/apisix/next/plugins/limit-count)
