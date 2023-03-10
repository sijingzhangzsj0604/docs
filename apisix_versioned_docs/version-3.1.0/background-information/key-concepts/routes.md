---
title: Routes
slug: /key-concepts/routes
---

In this document, you will learn the basic concept of routes in APISIX, different routing options APISIX offers, as well as drawbacks and solutions to repetitive route configurations. 

Explore additional resources at the end of the document for more information on related topics. 


## Overview

_Routes_ define paths to upstream services. In APISIX, routes are responsible for matching client requests based on configured rules, loading & executing the corresponding plugins, as well as forwarding requests to the specified upstream endpoints.

In APISIX, a simple route can be set up with a path-matching URI and a corresponding upstream address. The diagram below shows an example of users sending two HTTP requests to the APISIX API gateway, which are forwarded accordingly per the configured rules in routes: 

<br />

<div style={{textAlign: 'center'}}>
<img src="https://static.apiseven.com/uploads/2023/02/24/1yJwf7in_routes.svg" alt="Routes Diagram" width="90%" />
</div>

<br /><br />

Routes are often configured with plugins as well. For example, [configuring the rate-limit plugin in a route](../../getting-started/rate-limiting.md) will enable rate-limiting effects. 


## Routing Options

APISIX has three HTTP router options to choose from.

By default, APISIX uses the `radixtree_uri` routing option, which routes requests by URI paths. This is useful in routing east-west traffic (e.g. between microservices). 

Another option is `radixtree_host_uri` which routes requests by hosts and URI paths. This is useful in routing north-south traffic between clients and servers.

Finally, there is a `radixtree_uri_with_parameter` routing option, which is an enhancement of `radixtree_uri` where parameter matching is supported. 

The different routing options can be configured in `conf/config.yaml` under `apisix.router.http`. 

## Routes, Upstreams, and Services

While routes are essential in defining the paths of traffic flows, there are drawbacks to repetitive route configurations (i.e. hard coding **the same upstream addresses or plugin names** for a group of routes). During the time of updates, the repetitive field(s) of these routes will need to be traversed and updated one by one. Configurations like this increase a lot of maintenance costs as a result, especially in large-scale systems with many routes.

To address this issue, [Upstreams](./upstreams.md) and [Services](./services.md) were designed to abstract away repetitive information and reduce redundancies, following the [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). 

## Additional Resource(s)
* Getting Started - [Configure Routes](../../getting-started/configure-routes.md)
[//]: <TODO: Configure Routes via APISIX Admin API>
[//]: <TODO: Configure Routes via APISIX Dashbaord>
[//]: <TODO: Configure Routes in Configuration File>
[//]: <TODO: Service Routing>
[//]: <TODO: Router Expressions>
