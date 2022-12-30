---
title: How does Apache APISIX connect to API7 Cloud
reading_time: auto
show_feedback: true
---

In the [Overview](./api7-cloud.md) section, we know the data plane solution of API7 Cloud is [Apache APISIX](https://apisix.apache.org/),
API7 Cloud uses [the official Apache APISIX distributions](https://apisix.apache.org/downloads/) as the base, with an extra Lua module
to communicate with API7 Cloud.

:::note

Currently, API7 Cloud only supports `APISIX/2.15.0` and above.

:::

The Data Flow
-------------

The data flow between Apache APISIX and API7 Cloud is as follows:

1. Apache APISIX will periodically send [Prometheus](https://prometheus.io/) metrics and stats data (e.g., number of API calls) to API7 Cloud.
2. API7 Cloud will send the configuration changes to Apache APISIX (leverage the Apache APISIX configuration center).

The Control Flow
-----------------

API7 Cloud only communicates with registered Apache APISIX instances. So before the data
flow, Apache APISIX needs to register itself to API7 Cloud. After the initial registration,
Apache APISIX will send periodic heartbeat probes (per `10s`) to keep it alive.

How to check if the Apache APISIX instance is registered
--------------------------------------------------------

You can see registered Apache APISIX instances on the API7 Cloud overview page (Data Plane Instances section).

![Apache APISIX Status](https://static.apiseven.com/2022/12/30/apisix-status.png)

:::tip
Learn [How to Deploy Apache APISIX](../guides/product/how-to-deploy-apache-apisix.md) for more details.
:::

The API7 Cloud Lua Module
--------------------------

The Data Flow and Control Flow logics are not the standard parts of the open-source Apache APISIX,
we implement them in a separate Lua module: [Cloud Lua Module](https://github.com/api7/cloud-scripts/tree/main/assets).

And thanks to the [Lua Module Hook](https://github.com/apache/apisix/blob/master/conf/config-default.yaml#L54) feature, we mount this module easily, without any modifications to the Apache APISIX core.

The mTLS Support
----------------

No matter the Data Flow or the Control Flow, the Apache APISIX instance can communicate with API7 Cloud securely
with the support of [mTLS](https://en.wikipedia.org/wiki/Mutual_authentication). The certificate and private key
can be downloaded from API7 Cloud and should configure for the Apache APISIX instance.

The Cloud CLI
-------------

Users don't have to do the above steps (mount the Cloud Lua Module and configure
the certificate) manually as we use [Cloud CLI](https://github.com/api7/cloud-cli) to manipulate them.
So the above steps are imperceptible to users.

What's Next
------------

* [Start using API7 Cloud](../getting-started/README.md)
* [Learn How to use Cloud CLI to deploy Apache APISIX](https://github.com/api7/cloud-cli#introduction)
