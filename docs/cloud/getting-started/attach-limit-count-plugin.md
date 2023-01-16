---
title: Attach the Limit Count Plugin
reading_time: auto
show_feedback: true
---

So far, you know how to configure Application and API to let your APISIX instance run as your expectation. This section will extend the API with the [Limit Count Plugin](../guides/traffic-management/limit-count.md). Limit Count protects your API from too many requests from being overwhelmed by a large number of requests.

![JSON API detail](https://static.apiseven.com/uploads/2023/01/12/1n3Kv5rc_Screenshot%202023-01-12%20at%2010.13.59.png)

Enter the JSON API detail page and click on the **Add Plugin** button (wrapped by the black ellipse). API7 Cloud will open a popup window to add a new plugin.

![Configure Limit Count Plugin](https://static.apiseven.com/2023/01/03/63b3dec6d86a6.png)

Let's select the Limit Count plugin and fill out the form. In this case, we configure:

1. A gateway instance only accepts five requests in a minute (for the JSON API);
2. If the number of requests exceeds the limit, the gateway instance rejects the requests with the `429` status code, and the response body will be "Too many requests".

Save the settings, and now let's try to verify the Limit Count Plugin.

Again, we'll use [curl](https://curl.se/) for the verification. This time we'll send requests continuously.

```shell
for ((i=0; i<6; i++)); do
curl http://127.0.0.1:9080/v1/json -H 'Host: cloud.httpbin.org' -s -o/dev/null -w 'status code: %{http_code}\n'
done
```

The output will be:

```shell
status code: 200
status code: 200
status code: 200
status code: 200
status code: 200
status code: 429
```

As you can see, we sent `6` requests in a minute. The first `5` requests responded with a `200` status code,
and the last one responded with the expected`429`, but what about the response body?
Let's send a request separately through the below command.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: cloud.httpbin.org' -s
```

You'll see `{"error_msg":"Too many requests"}` printed on the screen.

:::note
Apache APISIX wraps the error message in a JSON string.
:::

:::info
The throttling quota might already reset when you run the above command. Try a few times if you don't see this output.
:::

Congratulations, you've mastered using Limit Count plugin in your API.

Next
----

[Summary](./summary.md).
