---
title: Load Balancing
slug: /getting-started/load-balancing
---

Load balancing manages traffic between clients and servers, it decides which server will handle a specific request, and it allows for improved performance, scalability, and reliability. It's essential for any servers that need to process large volume of traffic. 

Apache APISIX supports weighted round-robin load balancing, incoming traffic are distributed across a set of servers in a cyclical pattern, with each server taking a turn in a predefined order.

In this tutorial, you will create one Route with two upstream services, then enable round-robin load balancing to distribute traffic between the two services.

## Prerequisites

1. Complete the [Get APISIX](./) to install APISIX first.
2. Understand APISIX [Route and Upstream](./configure-routes#whats-a-route).

## Enable Load Balancing

Let's create a Route with two upstream services. All requests to the `/headers` endpoint are forwarded to the services ([httpbin.org](https://httpbin.org/headers) and [mock.api7.ai](https://mock.api7.ai/headers)), which respond with the requester's headers.

```sh
curl -i "http://127.0.0.1:9180/apisix/admin/routes" -X PUT -d '
{
  "id": "getting-started-headers",
  "uri": "/headers",
  "upstream" : {
    "type": "roundrobin",
    "nodes": {
      "httpbin.org:443": 1,
      "mock.api7.ai:443": 1
    },
    "pass_host": "node",
    "scheme": "https"
  }
}'
```

You will receive an `HTTP/1.1 200 OK` response if the route was created successfully.

:::info

1. The `pass_host` field is set to `node` to pass the host header, which comes from `upstream.nodes` to the upstream service.
2. The `scheme` field is set to `https` to enable TLS when sending requests to the upstream service.

:::

## Validate

The two services respond with different data.

From `httpbin.org`:

```json
{
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.58.0",
    "X-Amzn-Trace-Id": "Root=1-63e34b15-19f666602f22591b525e1e80",
    "X-Forwarded-Host": "localhost"
  }
}
```

From `mock.api7.ai`:

```json
{
  "headers": {
    "accept": "*/*",
    "host": "mock.api7.ai",
    "user-agent": "curl/7.58.0",
    "content-type": "application/json",
    "x-application-owner": "API7.ai"
  }
}
```

Let's generate 100 requests to test the load-balancing effect.

```sh
hc=$(seq 100 | xargs -i curl "http://127.0.0.1:9080/headers" -sL | grep "httpbin" | wc -l); echo httpbin.org: $hc, mock.api7.ai: $((100 - $hc))
```

The results are as follows, the response changes between the two services, and the number of responses from the two services are close.

```text
httpbin.org: 51, mock.api7.ai: 49
```

## What's Next

You have learned how to configure load balancing now. The next tutorial will guide you on how to configure the key authentication.
