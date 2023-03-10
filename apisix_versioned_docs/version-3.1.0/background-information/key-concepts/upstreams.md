---
title: Upstreams
slug: /key-concepts/upstreams
---

In this document, you will learn the basic concept of an upstream object in APISIX and why you would want to use it. You will be introduced to a few relevant features, including load balancing, service discovery, and upstream health checking. 

Explore additional resources at the end for more information on related topics. 


## Overview

An _upstream_ object in APISIX is a logical abstraction of a set containing one or more upstream addresses. It is required in [routes](../key-concepts/routes.md) or [services](../key-concepts/services.md) to specify **where** requests flow to and **how** they are distributed. 

There are different ways to configure upstream addresses, one of which is to explicitly configure them in every route/service. Here is an example of such a configuration in routes, where the same upstream address is repeated across three different routes: 


<br />

<div style={{textAlign: 'center'}}>
<img 
    src="https://static.apiseven.com/uploads/2023/02/24/6gZ6zw2R_upstream-before.svg"
    alt="Upstreams Diagram showing three routes with different plugins and the same hard-coded upstream address" 
    width="85%" />
</div>

<br /><br />

This approach, however, leads to data redundancies and poses a risk for update anomalies (i.e. inconsistent data resulting from a partial update). 

A better approach is to extract the repetitive upstream configurations into a separate upstream object and embed its `upstream_id` into routes/services, such as the following: 

<br />
<div style={{textAlign: 'center'}}>
<img src="https://static.apiseven.com/uploads/2023/02/24/vPjoKWdE_upstream-after.svg" 
    alt="Upstreams Diagram show three routes with different plugins pointing to the same upstream object with the desired upstream address" 
    width="95%" />
</div>

<br />

As you can probably see, large-scale systems with many routes/services would benefit significantly from configuring identical groups of upstream addresses in upstream objects, reducing redundant information and operational costs. 


## Load Balancing

An important use case of upstreams is to help [enable load balancing](../../getting-started/load-balancing.md) - that is, outlining where client requests are forwarded to and how they are distributed among backend replicas.

In upstreams, there are four load-balancing algorithms available to choose from:
* `roundrobin` - weighted round robin
* `chash` - consistent hashing
* `ewma` - exponentially weighted moving average 
* `least_conn` - least connections

You can also put your own load balancer file under `apisix/balancer` and load with `require("apisix.balancer.your_balancer")`, where needed.

For detailed instructions and explanation about load balancing in APISIX, please refer to Load Balancing in How-To Guide and Admin API Reference (coming soon).

[//]: <TODO: link to Load Balancing article under How-To>
[//]: <TODO: refer to Admin API for more upstream load balancing config>

## Service Discovery
While it is straightforward to figure upstream addresses statically, in microservice-based architectures, upstream addresses are often dynamically assigned and therefore, changed, during autoscaling, failures, and updates. Static configurations are less than ideal in this case.  

Service discovery comes to rescue. It describes the process of automatically detecting the available upstream services, keeping their addresses in a database (called a service registry) for others to reference. That way, an API gateway can always fetch the latest list of upstream addresses through the registry, ensuring all requests are forwarded to healthy upstream nodes. 

APISIX supports integrations with many service registries, such as Consul, Eureka, Nacos, Kubernetes service discovery, and more. 

For more details about how to integrate with third-party service registries, please see Service Discovery (coming soon).

[//]: <TODO: for more details about the integration, see Service Discovery (in How-To Guide)>

## Upstream Health Checking

APISIX provides active and passive health checking options to probe if upstream nodes are online (a.k.a. healthy). Unhealthy upstream nodes will be ignored until they recover and are deemed healthy again. 

Upstream health checking can be configured in the `checks` parameter in an upstream object. 

More details about how to configure upstream health checking will be provided in Active and Passive Health Checking (coming soon).

[//]: <TODO: for all health checking parameter options, see Admin API>
[//]: <TODO: How-To Guide - Health Checking>

## Additional Resource(s)
* Getting Started - [Load Balancing](../../getting-started/load-balancing.md)
[//]: <TODO: Configure Upstreams via APISIX Admin API>
[//]: <TODO: Configure Upstreams via APISIX Dashbaord>
[//]: <TODO: Upstream Health Checks>
[//]: <TODO: Service Discovery in how to guide>
