---
title: What is Cluster
reading_time: auto
show_feedback: true
---

A typical architecture for API Gateway is composed of the control plane and data plane. The data plane is always acted by
the proxy component (aka the gateway), which governs and forwards the user traffic; The control plane, as the name implies, controls the behaviors
of the data plane (gateway instance) by delivering configurations like route and upstream. In addition, it also collects telemetry data from the data plane
and visualizes them.

The control plane and data plane make up the gateway cluster. API7 Cloud provides the gateway cluster with managed
control plane part and users themselves hosted data plane instances (i.e. [Apache APISIX](https://apisix.apache.org/)).

These gateway instances will attach to the cluster and share the same configurations like [service](./service.md), [route](./route.md),
[consumer](./consumer.md), and [SSL](./ssl.md). Gateway instances' metrics are also collected to the cluster
so that you can see them on the API7 Cloud monitoring page directly.

How to Create a Cluster
-----------------------

The cluster will be created with the organization automatically. So you don't have
to create it by yourself.

:::tip

You'll be asked to create an organization when you log in to API7 Cloud for the first time.
:::

Plugins on Cluster
------------------------

You can also create [plugins](./plugin.md) on the cluster level, in case plugins will run for
all API requests.

What's Next
-----------

* Learn about [Service](./service.md).
* Learn about [Plugin](./plugin.md).
