---
title: Metrics with Prometheus
slug: /how-to-guide/observability/metrics-with-prometheus
---

Prometheus is a popular systems monitoring and alerting toolkit. It collects and stores multi-dimensional time series data like metrics with key-value paired labels. 

APISIX supports exposing the key internal metrics to Prometheus, such as bandwidth, connections, latency, etc. It helps users to monitor the status of APISIX and diagnose problems. Meanwhile, APISIX efficiently computes large-scale metrics through the [privileged agent](https://api7.ai/blog/1s-to-10ms-reducing-prometheus-delay-in-api-gateway) while significantly reducing Prometheus delay.

This guide will show you how to enable the prometheus plugin, and set up the Prometheus and Grafana services to collect and visualize the HTTP metrics of APISIX.
[//]: <TODO: Introduce metrics in L4 proxy (TCP/UDP) are also supported.>

## Prerequisite(s)

* Install [Docker](https://docs.docker.com/get-docker/) to deploy containerized Prometheus and Grafana.
* Install [cURL](https://curl.se/) to send requests to the services for validation.
* Install and run APISIX, or follow the [Getting Started tutorial](./../../getting-started/) to start a new instance in Docker.

:::info

This guide assumes that you use the containerized APISIX created in "[Getting Started](./../../getting-started/)". The APISIX instance joins a docker network named `apisix-quickstart-net` with the hostname `apisix-quickstart`. Therefore, all services (including Prometheus and Grafana) must join this network first to access APISIX. If you install APISIX using other methods, you will need to modify the command arguments to ensure that the network works properly.

:::
## Enable Prometheus Plugin

The `prometheus` plugin can be enabled on a specific route. Let's create a route connecting to an example upstream [httpbin.org](http://httpbin.org/). You can enable the `prometheus` plugin by adding `"prometheus": {}` in the plugins option.

```shell
curl -i "http://127.0.0.1:9180/apisix/admin/routes" -X PUT -d '
{
  "id": "ip",
  "uri": "/ip",
  "plugins": {
    "prometheus":{}
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "httpbin.org:80": 1
    }
  }
}'
```

APISIX gathers internal runtime metrics and exposes them through port `9091` and path `/apisix/prometheus/metrics` by default. The port and path are supported to be customized in APISIX. You can use the command below to fetch metrics from APISIX directly:

```shell
curl "http://127.0.0.1:9091/apisix/prometheus/metrics"
```

If everything is OK, you will get metrics similar to the following: 

```text
# HELP apisix_etcd_modify_indexes Etcd modify index for APISIX keys
# TYPE apisix_etcd_modify_indexes gauge
apisix_etcd_modify_indexes{key="consumers"} 0
apisix_etcd_modify_indexes{key="global_rules"} 0
apisix_etcd_modify_indexes{key="max_modify_index"} 16
apisix_etcd_modify_indexes{key="prev_index"} 15
apisix_etcd_modify_indexes{key="protos"} 0
apisix_etcd_modify_indexes{key="routes"} 16
apisix_etcd_modify_indexes{key="services"} 0
apisix_etcd_modify_indexes{key="ssls"} 0
apisix_etcd_modify_indexes{key="stream_routes"} 0
apisix_etcd_modify_indexes{key="upstreams"} 0
apisix_etcd_modify_indexes{key="x_etcd_index"} 16
# HELP apisix_etcd_reachable Config server etcd reachable from APISIX, 0 is unreachable
# TYPE apisix_etcd_reachable gauge
apisix_etcd_reachable 1
...
# HELP apisix_http_status HTTP status codes per service in APISIX
# TYPE apisix_http_status counter
apisix_http_status{code="200",route="ip",matched_uri="/ip",matched_host="",service="",consumer="",node="52.20.124.211"} 1
...
```

## Configure Prometheus

Targets are monitored objects in Prometheus. You can configure the APISIX metric endpoint as a target in the Prometheus configuration file `prometheus.yml`.

```shell
echo 'scrape_configs:
  - job_name: "apisix"
    scrape_interval: 15s
    metrics_path: "/apisix/prometheus/metrics"
    static_configs:
      - targets: ["apisix-quickstart:9091"]
' > prometheus.yml
```

Let's start a Prometheus instance in Docker. The exposed port is mapped to `9092` on the host because `9090` is reserved for APISIX. The local configuration file `prometheus.yml` is mounted to the Prometheus container. 

```shell
docker run -d --name apisix-quickstart-prometheus \
  -p 9092:9090 \
  --network=apisix-quickstart-net \
  -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus:latest
```
You can now check if the state is "UP" on the Prometheus webpage. Prometheus will collect metrics from APISIX by scraping its metric HTTP endpoint.

![Prometheus](https://static.apiseven.com/uploads/2023/03/02/mRbZ4Hxm_prometheus.png)

## Configure Grafana

Grafana can visualize metrics stored in Prometheus. Let's start a Grafana instance on port `3000` in Docker.

```shell
docker run -d --name=apisix-quickstart-grafana \
  -p 3000:3000 \
  --network=apisix-quickstart-net \
  grafana/grafana-oss
```

Add the Prometheus instance created above to Grafana as a data source:

![Grafana Data Source](https://static.apiseven.com/uploads/2023/03/02/E9PNMkdv_grafana-data-source.png)

The official APISIX metric dashboard is published to [Grafana dashboards](https://grafana.com/grafana/dashboards/) with ID [11719](https://grafana.com/grafana/dashboards/11719-apache-apisix/). You can then import the dashboard into Grafana with the ID.

![Import Dashboard](https://static.apiseven.com/uploads/2023/03/02/21YcUlui_grafana-import-dashboard.png)

If everything is OK, the dashboard will automatically visualize metrics in real time.

![Grafana Dashboard](https://static.apiseven.com/uploads/2023/03/02/8hcTkwWW_grafana-dashboard.png)

## Disable Prometheus Plugin

To disable the `prometheus` Plugin, you can set the `_meta.disable` parameter to `true`.

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes/ip" -X PATCH -d '
{
  "plugins": {
    "prometheus": {
      "_meta": {
        "disable": true
      }
    }
  }
}'
```

## Next Steps

You have now learned how to enable APISIX metrics with Prometheus and visualize them in Grafana. Explore other resources in How-To Guide to customize your APISIX experience. 

[//]: <TODO: Add the link to the prometheus plugin>
