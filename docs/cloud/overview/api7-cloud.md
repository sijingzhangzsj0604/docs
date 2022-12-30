---
title: What is API7 Cloud
reading_time: auto
show_feedback: true
---

The API7 Cloud provides a simple but efficient and safe way to connect your APIs and Microservices in multi-cloud environments.

A modern enterprise API Gateway solution comprises the data plane and the control plane.
The data plane handles the traffic and proxies requests to the desired backends, while the control plane manages instances in the data plane. It always contains a few components like Configuration Storage (where data plane configurations are stored),
[Application Performance Management](https://en.wikipedia.org/wiki/Application_performance_management) (helps you to measure the running status of the API Gateway) and User Portal to
operate the API Gateway.

Traditionally, administrators have to maintain both sides, especially for the control plane, due to a few roles it plays like
User Portal, etc. The daily ops are tedious but essential, or your API Gateway might be out of work at any time due to different
causes. API7 Cloud aims at freeing people from the management for the **API Gateway control plane**. Users
still need to deploy them in their environments (as long as the network is connected). API7 Cloud doesn't touch any traffic of
users' business, so it, in turn, ensures user privacy and security.

API7 Cloud now helps you to deploy the necessary services on your demands so that you can:

1. Configure [Applications](../concepts/application.md) and [APIs](../concepts/api.md) for data plane;
2. Get insight into the running status of your data plane instances;

![simple-api7-cloud](https://static.apiseven.com/2022/12/30/apiseven-cloud-arch.png)

The connection between your data plane and API7 Cloud is protected since both sides are authenticated,
i.e., [mutual TLS](https://en.wikipedia.org/wiki/Mutual_authentication) is applied (API7 Cloud will generate the certificates).

:::tip
We use [Apache APISIX](https://apisix.apache.org) to act as the data plane of API7 Cloud.
:::

What's Next
-----------

* [Learn how Apache APISIX connects to API7 Cloud](./how-apisix-connects-to-api7-cloud.md)
* [Start using API7 Cloud](../getting-started/README.md)
* Learn key concepts
  * [What is Control Plane](../concepts/control-plane.md)
  * [What is Application](../concepts/application.md)
  * [What is API](../concepts/api.md)
  * [What is Consumer](../concepts/consumer.md)
  * [What is Certificate](../concepts/certificate.md)
  * [What is Plugin](../concepts/plugin.md)
