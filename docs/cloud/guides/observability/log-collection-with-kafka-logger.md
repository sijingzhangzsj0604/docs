---
title: Make Log Collection with Kafka Logger
reading_time: auto
show_feedback: true
---

Learning the running status of your API Gateway cluster is necessary in the real world. It's helpful to know if the cluster is healthy or not so that you can take action in time and avoid fatal faults. Logs
are one of the most valuable ways to monitor the API Gateway. It also can analyze your API requests (calculate
the top N APIs and status codes distribution).

API7 Cloud provides the Log Collection feature to configure "loggers" to collect log messages. With the help of
Log Collection, you can transmit logs from [Apache APISIX](https://apisix.apache.org) to different log servers (
[Apache Kafka](https://kafka.apache.org/), [ClickHouse](https://clickhouse.com/) and so on). This guide will show
you how to use the Log Collection feature to send Apache APISIX logs to an Apache Kafka.

Prepare the Environment
-----------------------

### Deploy Apache Kafka Cluster

We'll deploy a Kafka cluster with only one broker. You can skip this step if you already have an existing cluster.

```shell
docker run \
    --name kafka \
    --hostname kafka \
    --env KAFKA_ENABLE_KRAFT=yes \
    --env KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE=true \
    --env KAFKA_CFG_PROCESS_ROLES=broker,controller \
    --env KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093 \
    --env KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT \
    --env KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092 \
    --env KAFKA_BROKER_ID=1 \
    --env ALLOW_PLAINTEXT_LISTENER=yes \
    --env KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=1@127.0.0.1:9093 \
    --env KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER \
    --network f20f3d77c6d7 \
    bitnami/kafka:latest
```

### Deploy Apache APISIX

Please refer to [How to Deploy Apache APISIX](../product/how-to-deploy-apache-apisix.md) to learn how to deploy
Apache APISIX and connect it to API7 Cloud. In this guide, we'll deploy an Apache APISIX instance on Docker.

:::tip

When you deploy Apache APISIX with Docker, add a host mapping for the Kafka container.

```shell
--docker-run-arg --add-host=<Kafka Container IP>
```

You can run the command below to fetch the Kafka container address.

```shell
docker inspect kafka --format '{{ .NetworkSettings.Networks.bridge.IPAddress }}'
```

:::

### Configure Log Collection Plan

Let's enter the Log Collection page and click on the **Create Log Collection** button to create a new Log.
Collection Plan.

![Log Collection Page](https://static.apiseven.com/2022/12/30/log-collection-page.png)
![Create Log Collection](https://static.apiseven.com/2022/12/30/create-log-collection-kafka-logger.png)

In this case, we create a Kafka logger, which sends log entries to the specified Kafka cluster. We use the default JSON format.

:::tip

Refer to [Log Format in Log Collection](./log-collection-log-format.md) to learn more about log format. Here we use the
**Default JSON Log Format**.

:::

### Create Application and API

We'll create an Application with the following details in this guide.

* The Application name is `kafka-httpbin`.
* The path prefix is `/v1`.
* The protocol is `HTTP`.
* The HTTP Host is `kafka.httpbin.org`.
* The upstream URL is `https://httpbin.org`.

Besides, we'll create an API inside the `kafka-httpbin` Application.

* The API name is `json`.
* The path is `/json` (exact match).
* Accepted HTTP method is `GET`.

:::tip

If you don't know how to configure an Application and API, please refer to the [Getting Started](../../getting-started)
guides first

:::

### Add Logging Plugin

Now let's add the Logging plugin to the `kafka-httpbin` Application.

![Add Logging Plugin](https://static.apiseven.com/2022/12/30/add-logging-plugin-2.png)

The Logging plugin binds some existing Log Collection Plans to the Application or API.
Here we bind the `kafka-logger`.

### Send Some Requests

Now let's send some requests.

```shell
for ((i=0; i<5; i++)); do
curl http://127.0.0.1:9080/v1/json -H 'Host: kafka.httpbin.org' -v
done
```

Please wait a while, and let's use the `kafka-console-consumer.sh` to fetch log messages.

```shell
docker exec kafka  /opt/bitnami/kafka/bin/kafka-console-consumer.sh --topic apisix --from-beginning --bootstrap-server kafka:9092
```

```shell
[{"latency":4749.0000724792,"response":{"headers":{"access-control-allow-credentials":"true","server":"APISIX\/2.15.0","access-control-allow-origin":"*","content-type":"application\/json","x-apisix-upstream-status":"200","content-length":"429","connection":"close","date":"Mon, 15 Aug 2022 07:04:53 GMT"},"status":200,"size":688},"apisix_latency":3461.0000724792,"upstream_latency":1288,"upstream":"3.94.154.124:443","start_time":1660547089245,"client_ip":"172.17.0.1","route_id":"51ef3022","server":{"hostname":"apisix-fedora34","version":"2.15.0"},"request":{"size":88,"uri":"\/v1\/json","method":"GET","headers":{"accept":"*\/*","host":"kafka.httpbin.org","user-agent":"curl\/7.76.1"},"url":"http:\/\/kafka.httpbin.org:9080\/v1\/json","querystring":{}},"service_id":"421106273338000218"}]
[{"latency":1244.9998855591,"response":{"headers":{"connection":"close","access-control-allow-credentials":"true","server":"APISIX\/2.15.0","content-type":"application\/json","access-control-allow-origin":"*","content-length":"429","x-apisix-upstream-status":"200","date":"Mon, 15 Aug 2022 07:04:55 GMT"},"status":200,"size":688},"apisix_latency":0.99988555908203,"upstream_latency":1244,"upstream":"3.94.154.124:443","start_time":1660547093999,"client_ip":"172.17.0.1","route_id":"51ef3022","server":{"hostname":"apisix-fedora34","version":"2.15.0"},"request":{"size":88,"uri":"\/v1\/json","method":"GET","headers":{"accept":"*\/*","host":"kafka.httpbin.org","user-agent":"curl\/7.76.1"},"url":"http:\/\/kafka.httpbin.org:9080\/v1\/json","querystring":{}},"service_id":"421106273338000218"}]
[{"latency":1397.0000743866,"response":{"headers":{"x-apisix-upstream-status":"200","access-control-allow-origin":"*","server":"APISIX\/2.15.0","content-type":"application\/json","access-control-allow-credentials":"true","content-length":"429","connection":"close","date":"Mon, 15 Aug 2022 07:04:56 GMT"},"status":200,"size":688},"apisix_latency":1.0000743865967,"upstream_latency":1396,"upstream":"3.94.154.124:443","start_time":1660547095553,"client_ip":"172.17.0.1","route_id":"51ef3022","server":{"hostname":"apisix-fedora34","version":"2.15.0"},"request":{"size":88,"uri":"\/v1\/json","method":"GET","headers":{"accept":"*\/*","host":"kafka.httpbin.org","user-agent":"curl\/7.76.1"},"url":"http:\/\/kafka.httpbin.org:9080\/v1\/json","querystring":{}},"service_id":"421106273338000218"}]
[{"latency":292.99998283386,"response":{"headers":{"x-apisix-upstream-status":"200","access-control-allow-origin":"*","access-control-allow-credentials":"true","content-type":"application\/json","server":"APISIX\/2.15.0","content-length":"429","connection":"close","date":"Mon, 15 Aug 2022 07:04:55 GMT"},"status":200,"size":688},"apisix_latency":0,"upstream_latency":293,"upstream":"34.227.213.82:443","start_time":1660547095253,"client_ip":"172.17.0.1","route_id":"51ef3022","server":{"hostname":"apisix-fedora34","version":"2.15.0"},"request":{"size":88,"uri":"\/v1\/json","method":"GET","headers":{"accept":"*\/*","host":"kafka.httpbin.org","user-agent":"curl\/7.76.1"},"url":"http:\/\/kafka.httpbin.org:9080\/v1\/json","querystring":{}},"service_id":"421106273338000218"},{"latency":1385.999917984,"response":{"headers":{"x-apisix-upstream-status":"200","access-control-allow-origin":"*","access-control-allow-credentials":"true","content-type":"application\/json","server":"APISIX\/2.15.0","content-length":"429","connection":"close","date":"Mon, 15 Aug 2022 07:04:58 GMT"},"status":200,"size":688},"apisix_latency":0,"upstream_latency":1387,"upstream":"3.94.154.124:443","start_time":1660547096956,"client_ip":"172.17.0.1","route_id":"51ef3022","server":{"hostname":"apisix-fedora34","version":"2.15.0"},"request":{"size":88,"uri":"\/v1\/json","method":"GET","headers":{"accept":"*\/*","host":"kafka.httpbin.org","user-agent":"curl\/7.76.1"},"url":"http:\/\/kafka.httpbin.org:9080\/v1\/json","querystring":{}},"service_id":"421106273338000218"}]
```

A single and well-formatted log entry will be like this:

```shell
{
  "latency": 4749.0000724792,
  "response": {
    "headers": {
      "access-control-allow-credentials": "true",
      "server": "APISIX/2.15.0",
      "access-control-allow-origin": "*",
      "content-type": "application/json",
      "x-apisix-upstream-status": "200",
      "content-length": "429",
      "connection": "close",
      "date": "Mon, 15 Aug 2022 07:04:53 GMT"
    },
    "status": 200,
    "size": 688
  },
  "apisix_latency": 3461.0000724792,
  "upstream_latency": 1288,
  "upstream": "3.94.154.124:443",
  "start_time": 1660547089245,
  "client_ip": "172.17.0.1",
  "route_id": "51ef3022",
  "server": {
    "hostname": "apisix-fedora34",
    "version": "2.15.0"
  },
  "request": {
    "size": 88,
    "uri": "/v1/json",
    "method": "GET",
    "headers": {
      "accept": "*/*",
      "host": "kafka.httpbin.org",
      "user-agent": "curl/7.76.1"
    },
    "url": "http://kafka.httpbin.org:9080/v1/json",
    "querystring": {}
  },
  "service_id": "421106273338000218"
}
```

See Also
--------

* [Logging Plugin Reference](../../references/plugins/observability/logging.md)
* [Apache APISIX Kafka Logger Plugin](https://apisix.apache.org/docs/apisix/plugins/kafka-logger/)
