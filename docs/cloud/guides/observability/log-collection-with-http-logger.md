---
title: Make Log Collection with HTTP Logger
reading_time: auto
show_feedback: true
---

Learning the running status of your API Gateway cluster is necessary in the real world. It's helpful to know if the cluster is healthy or not so that you can take action in time and avoid fatal faults. Logs
are one of the most valuable ways to monitor the API Gateway. It also can analyze your API requests (calculate
the top N routes and status codes distribution).

API7 Cloud provides the Log Collection feature to configure "loggers" to collect log messages. With the help of
Log Collection, you can transmit logs from [Apache APISIX](https://apisix.apache.org) to different log servers (
[Apache Kafka](https://kafka.apache.org/), [ClickHouse](https://clickhouse.com/) and so on). This guide will show
you how to use the Log Collection feature to send Apache APISIX logs to the [Loggly](https://www.loggly.com/) service.

:::important

API7 Cloud doesn't collect your logs itself.

:::

Prepare the Environment
-----------------------

### Deploy Apache APISIX

Please refer to [How to Deploy Apache APISIX](../product/how-to-deploy-apache-apisix.md) to learn how to deploy
Apache APISIX and connect it to API7 Cloud. In this guide, we'll deploy an Apache APISIX instance on Docker.

### Configure Log Collection Plan

Let's enter the Log Collection page and click on the **Create Log Collection** button to create a new Log.
Collection Plan.

![Log Collection Page](https://static.apiseven.com/2022/12/30/log-collection-page.png)
![Create Log Collection](https://static.apiseven.com/2022/12/30/create-log-collection.png)

In this case, we create an HTTP logger, which sends log entries to the Loggly service.

:::tip

* If you don't know how to send logs to Loggly HTTP(S) bulk endpoint,
  please see [HTTP Bulk Endpoint](https://documentation.solarwinds.com/en/success_center/loggly/content/admin/http-bulk-endpoint.htm) for the details.
* Here, the **Logs Concatenation** must be "New Line", which is a hard requirement from Loggly.

:::

### Create Service and Route

We'll create a service with the following details in this guide.

* The service name is `loggly-httpbin`.
* The path prefix is `/v1`.
* The protocol is `HTTP`.
* The HTTP Host is `loggly.httpbin.org`.
* The upstream URL is `https://httpbin.org`.

Besides, we'll create a route inside the `loggly-httpbin` Service.

* The route name is `json`.
* The path is `/json` (exact match).
* Accepted HTTP method is `GET`.

:::tip

If you don't know how to configure a service and route, please refer to the [Getting Started](../../getting-started)
guides first

:::

### Add Logging Plugin

Now let's add the Logging plugin to the `loggly-httpbin` Service.

![Add Logging plugin](https://static.apiseven.com/2022/12/30/add-logging-plugin.png)

The Logging plugin binds some existing Log Collection Plans to the service or route.

### Send Some Requests

Now let's send some requests.

```shell
for ((i=0; i<5; i++)); do
curl http://127.0.0.1:9080/v1/json -H 'Host: loggly.httpbin.org' -v
done
```

Please wait for a while and log in to the Loggly Console and see if there are five log entries.

![Loggly Console](https://static.apiseven.com/2022/12/30/loggly-console.png)

And let's check one of the messages and see if it's expected.

![A Log Message in Loggly](https://static.apiseven.com/2022/12/30/a-log-message-in-loggly.png)

As you can see, this log message reflects the actual request we sent, and it contains the
response body.

See Also
--------

* [Logging Plugin Reference](../../references/plugins/observability/logging.md)
* [Apache APISIX HTTP Logger Plugin](https://apisix.apache.org/docs/apisix/next/plugins/http-logger/)
