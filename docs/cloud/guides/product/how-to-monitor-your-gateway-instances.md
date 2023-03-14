---
title: Monitoring for Gateway Instances
reading_time: auto
show_feedback: true
---

As we said in [How does Apache APISIX connect to API7 Cloud](../../overview/how-apisix-connects-to-api7-cloud.md#the-data-flow),
gateway instances upload [Prometheus](https://prometheus.io/) metrics to API7 Cloud. API7 Cloud collects and visualizes these metrics.

Users can sign in to the API7 Cloud and enter the **Monitoring** page to see the running status of their gateway instances.

Query Filter
------------

By default, API7 Cloud shows metrics for all gateway instances
among all [services](../../concepts/service.md) and their [routes](../../concepts/route.md),
which is a global view. Use the query filter if you want to see the metrics for a specific instance or a service (even a route).

You can use the instance and service/route filters simultaneously to see the monitoring data for the specific service/route in an instance.

Query Time Range
----------------

By default, API7 Cloud shows the metrics for the last five minutes. You can
change the time range by selecting a time window. Values can be `5m`,
`30m`, `60m`, `6h` and `12h`.

Diagrams
---------

API7 Cloud draws several diagrams according to the metrics collected from the gateway instances.
You can see [Apache APISIX Prometheus Plugin](https://apisix.apache.org/docs/apisix/next/plugins/prometheus)
to learn more details.

### Single Values

![Single Values](https://static.apiseven.com/2022/12/30/monitor-single-values.png)

* `Success Ratio`: The ratio of successful requests to total requests.
* `Failure Count`: The number of failed requests (during the time range). Requests whose status code is `4xx` or `5xx` will be counted.
* `Request Count`: The number of requests (during the time range).
* `Online Gateway Instances`: The number of online gateway instances.

:::tip
Only the gateway instances whose status is `Healthy` will be treated as online.
Please read [How to check Apache APISIX running status](./how-to-deploy-apache-apisix.md#how-to-check-apache-apisix-running-status) to learn more
about Gateway instance status.
:::

:::note
The `Online Gateway Instance` is a global metric so that the query filter won't affect it.
:::

### Status Codes Distribution

API7 Cloud also visualizes the status code distribution of the requests
(since the time range), it also calculates the proportion for all the status codes.

![Status Codes Distribution](https://static.apiseven.com/2022/12/30/monitor-status-codes-distribution.png)

### Bandwidth

API7 Cloud collects and visualizes the bandwidth of the requests
(since the time range).

![Bandwidth](https://static.apiseven.com/2022/12/30/monitor-bandwidth.png)

Both the inbound and outbound bandwidth are calculated.

### QPS

You can see the QPS of the requests (since the time range).

![QPS](https://static.apiseven.com/2022/12/30/monitor-qps.png)

QPS is calculated according the status code range (`2xx`, `3xx`, `4xx`, and `5xx`)

### Latency

The `Latency` diagrams show the mean latency of the requests (since the time range).

![Latency](https://static.apiseven.com/2022/12/30/monitor-latency.png)

### Server Connection

The `Server Connection` diagram shows the number of open connections for the gateway instances
in the time range.

![Server Connection](https://static.apiseven.com/2022/12/30/monitor-server-connection.png)

:::note
The `Server Connection` is a global metric so that the query filter won't affect it.
:::
