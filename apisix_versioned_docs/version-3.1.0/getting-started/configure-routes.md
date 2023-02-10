---
title: Configure Routes
slug: /getting-started/configure-routes
---

Apache APISIX provides flexible gateway management capabilities based on _Route_, which defines the request's routing path and targets.

This tutorial guides you on how to create one Route and validate it. You will complete the following steps:

1. Create a Route with an example _Upstream_, which points to [httpbin.org](http://httpbin.org).
2. Use _cURL_ to send a test request, showing how APISIX proxies and forwards the request.

## Prerequisites

1. Complete the [Get APISIX](./) step to install APISIX first.

## What's a Route

A Route is a routing path to the upstream targets. In [Apache APISIX](https://api7.ai/apisix), the Route matches the client's requests based on defined rules, loads and executes the corresponding plugins, then forwards the request to the specified upstream targets.

One Route should have _uri_ and the corresponding Upstream at least.

## What's an Upstream

An Upstream is a set of target nodes with the same work. The Upstream defines the virtual host abstraction that performs load balancing on a given set of service nodes according to the configured rules.

## Create a Route

In this section, let's create a Route to forward client requests to the [httpbin.org](http://httpbin.org), which is a public HTTP Request and Response service.

The following command creates one Route which matches all requests to the `http://127.0.0.1:9080/ip` endpoint, forwards them to the [httpbin.org/ip](http://httpbin.org/ip), and returns the requester's IP address.

[//]: <TODO: Add the link to the authorization of Admin API>

```sh
curl -i "http://127.0.0.1:9180/apisix/admin/routes" -X PUT -d '
{
  "id": "getting-started-ip",
  "uri": "/ip",
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "httpbin.org:80": 1
    }
  }
}'
```

You will receive an `HTTP/1.1 200 OK` response if the route was created successfully.

## Validate

```sh
curl "http://127.0.0.1:9080/ip"
```

The expected response is similar to the following:

```text
{
  "origin": "183.94.122.205"
}
```

## What's Next

This tutorial creates one Route with only one target node. The next tutorial will show you how to configure the load balancing with multiple target nodes.
