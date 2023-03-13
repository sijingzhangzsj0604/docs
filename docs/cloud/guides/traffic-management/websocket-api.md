---
title: Create WebSocket API
reading_time: auto
show_feedback: true
---

[WebSocket](https://en.wikipedia.org/wiki/WebSocket#:~:text=WebSocket%20is%20a%20computer%20communications,protocol%20is%20known%20as%20WebSockets.) enables the full-duplex
communication between the client and server with low overheads and latency.

This guide will teach you how to create WebSocket API on API7 Cloud.

Prepare the Environment
-----------------------

### Deploy Apache APISIX

Please refer to [How to Deploy Apache APISIX](../product/how-to-deploy-apache-apisix.md) to learn how to deploy
Apache APISIX and connect it to API7 Cloud. In this guide, we'll deploy an Apache APISIX instance on Docker.

### Deploy the WebSocket Echo Server

We'll use the image [jmalloc/echo-server](https://hub.docker.com/r/jmalloc/echo-server/) to deploy a WebSocket server
on Docker. This server will echo the message sent from the client.

```shell
docker run --name websocket -d jmalloc/echo-server --nework <Apache APISIX Container Network ID>
```

:::tip
We deploy this container with the same network as the Apache APISIX container.
You can run the command below to get the network id of the Apache APISIX container.

```shell
docker inspect <Apache APISIX Container Name/ID> -f '{{ .NetworkSettings.Networks.bridge.NetworkID }}'
```

:::

### Create Service and API

We'll create a Service with the following details in this guide.

1. The Service name is `websocket`.
2. The path prefix is `/v1`.
3. The HTTP Host is `websocket.local`.
4. Set the upstream URL to the IP address of WebSocket server container (in our case, it's `http://172.17.0.5:8080`). Please use the below command to get the correct IP address in your run.

:::tip
You can run the command below to fetch the container address of the WebSocket server.

```shell
docker inspect websocket -f '{{ .NetworkSettings.Networks.bridge.IPAddress }}'
```

:::

Besides, we'll create an API inside the `websocket` Service.

1. The API name is `mirror`.
2. The path is `/ws` (exact match).
3. Accepted HTTP method is `GET`.
4. Click on the **Enable WebSocket** checkbox.

![Create WebSocket API](https://static.apiseven.com/2022/12/30/create-websocket-api.png)

The **Enable WebSocket** checkbox controls if your Apache APISIX should respect the WebSocket upgrade
request. Once you click on it, API7 Cloud will add the label `WebSocket` for this API. This label marks
the API type, and without actual impacts for this API, it's your liberty to decide to save or remove this label.

:::note

If you don't know how to configure a Service and API, please refer to the [Getting Started](../../getting-started) guides first

:::

Test the WebSocket API
----------------------

Let's use the [wscat](https://github.com/websockets/wscat) utility to test whether the WebSocket API is working.

```shell
wscat --connect ws://127.0.0.1:9080/v1/ws -H 'Host: websocket.local'
```

You'll enter an interactive console where you can send messages.

```shell
Connected (press CTRL+C to quit)
< Request served by eed6f64d8053
> Hello, API7 Cloud!
< Hello, API7 Cloud!
> API7 Cloud is a centralized platform to connect your APIs in any cloud.
< API7 Cloud is a centralized platform to connect your APIs in any cloud.
```

Messages led with `<` are sent by the WebSocket server.
