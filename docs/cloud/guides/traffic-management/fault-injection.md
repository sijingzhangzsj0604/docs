---
title: Inject Faults to your APIs
reading_time: auto
show_feedback: true
---

Fault injection is a testing technique for detecting how your platform will behave when
some components don't run in the usual way.

API7 Cloud allows users to configure the Fault Injection plugin to inject some errors for
their [services](../../concepts/service.md) or [routes](../../concepts/route.md) so that
they can simulate the API Gateway faults.

The Fault Injection plugin has two run modes: `Abort Request` and `Delay Request`. When it works in
`Abort Request`, Apache APISIX will reject API requests immediately, and [Apache APISIX](https://apisix.apache.org)
will set the given status code and response body; when the run mode is `Delay Request`, Apache APISIX
will delay the request for the given period and forward the request normally.

Create Service and Route
------------------------

We'll create a service with the following details in this guide.

* The service name is `fault-injection-app`.
* The path prefix is `/v1`.
* The HTTP Host is `fault-injection.httpbin.org`.
* The upstream URL is `https://httpbin.org`.

Besides, we'll create a route inside the `fault-injection-app` Service.

* The route name is `json`.
* The path is `/json` (exact match).
* Accepted HTTP method is `GET`.

:::tip

If you don't know how to configure a service and route, please refer to the [Getting Started](../../getting-started) guides first.

:::

Test the Abort Request Mode
---------------------------

Now let's add the Fault Injection plugin to the `fault-injection-app` Service.
You can enter the `fault-injection-app` details page, click on the **Add Plugin** button,
select Fault Injection plugin, and fill out the form.

![Create Fault Injection Plugin](https://static.apiseven.com/2022/12/30/create-fault-injection-plugin.png)

:::tip

You can also configure the Fault Injection plugin on the route level,
in such a case, only the route will be affected by this plugin.

:::

Then let's send a request and see what will happen.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: fault-injection.httpbin.org' -i
```

```shell
HTTP/1.1 503 Service Temporarily Unavailable
Date: Mon, 13 Jun 2022 01:24:03 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/2.15.0

Injected 503 error
```

As you can see, Apache APISIX rejects the request.
The status code (`503`) and body (`Injected 503 error`) are expected.

:::important

We set the percentage to `100%` so every request you sent will be rejected by
Apache APISIX. In the real world, you may want to reject the portion of requests so that
the percentage might be `10%`, `30%` `50%`, and so on. But please note that Apache APISIX
uses a random algorithm to decide if the request should be rejected (according to the
specific percentage), so it doesn't mean there will have exactly `30` requests rejected
if you sent `100` requests and the portion is `30%`. From a statistical point of view, the larger
the sample, the more accurate the results.

:::

Test the Delay Request Mode
---------------------------

Let's update the Fault Injection plugin on the `fault-injection-app` Service.

![Update Fault Injection Plugin](https://static.apiseven.com/2022/12/30/update-fault-injection-plugin.png)

We change the run mode from `Abort Request` to `Delay Request`, and the delay duration is
`1000ms`.

To feel the delay, let's send `5` requests with/without the Fault Injection plugin
perspective, and compare the difference in the average request time.

```shell
for ((i=0; i < 5; i++)); do
curl http://127.0.0.1:9080/v1/json -H 'Host: fault-injection.httpbin.org' -s -o/dev/null -w '%{time_total}\n'
done
```

```shell
1.900560
2.206164
1.933959
1.907882
1.991174
```

And let's disable the Fault Injection plugin and send `5` requests again.

![Update Fault Injection Plugin Delay](https://static.apiseven.com/2022/12/30/update-fault-injection-plugin-disable.png)

```shell
0.938746
1.010053
0.964290
1.192605
0.946725
```

As you can see, the request times are about `1` second less, but it's not accurate due
to the Internet.

:::important

Again, we set the percentage to `100%`, so every request you sent will be delayed by
Apache APISIX. In the real world, you may want to delay the portion of requests so that
the percentage might be `10%`, `30%` `50%`, and so on. But please note that Apache APISIX
uses a random algorithm to decide if the request should be delayed (according to the
specific percentage). So it doesn't mean there will have exactly `30` requests will be delayed
if you sent `100` requests and the portion is `30%`. From a statistical point of view, the larger
the sample, the more accurate the results.

:::

See Also
--------

* [Fault Injection Plugin Reference](../../references/plugins/traffic-management/fault-injection.md)
* [Apache APISIX Fault Injection Plugin](https://apisix.apache.org/docs/apisix/next/plugins/fault-injection/)
