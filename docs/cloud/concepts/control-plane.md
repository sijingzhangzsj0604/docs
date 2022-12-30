---
title: What is Control Plane
reading_time: auto
show_feedback: true
---

A typical architecture for API Gateway is composed of the control plane and data plane. The data plane is always acted by
the proxy component, which governs and forwards the user traffic; The control plane, as the name implies, controls the behaviors
of the data plane by delivering configurations like route and upstream. In addition, it also collects telemetry data from the data plane
and visualizes them.

In API7 Cloud, API management is bounded to control plane, data plane instances (i.e. [Apache APISIX](https://apisix.apache.org/))
which attach to the same control plane will share the same configurations like [Application](./application.md), [API](./api.md),
[Consumer](./consumer.md), and [Certificate](./certificate.md). Data plane metrics are also collected by the control plane
so that you can see them on the API7 Cloud monitoring page directly.

How to Create a Control Plane
-----------------------------

The control plane will be created with the organization automatically. So you don't have
to create a control plane by yourself.

:::tip

You'll be asked to create an organization when you log in to API7 Cloud for the first time.
:::

Plugins on Control Plane
------------------------

You can also create [plugins](./plugin.md) on the control plane level, in case plugins will run for
all API requests.

What's Next
-----------

* Learn about [Application](./application.md).
* Learn about [Plugin](./plugin.md).
