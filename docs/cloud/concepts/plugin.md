---
title: What is Plugin
reading_time: auto
show_feedback: true
---

In API7 Cloud, a plugin is a rule that defines how the gateway instance will handle the requests.
By saying handled, it means requests might be:

1. transformed (headers, query parameters, body);
2. protected (authentication, authorization, rate-limiting, etc.);
3. recorded (logging, metrics, etc.);

A plugin can be attached on a specific [service](./service.md),
[route](./route.md), [consumer](./consumer.md), or [cluster](./cluster.md).
The effective rules of the plugin are as follows:

* Plugins attached to the route only work for this route and will override the same
ones on the service (instead of running them twice).
* Plugins attached to the service will affect all routes in this Service.
* Plugins attached to the consumer only work for this consumer and will override the same
ones on the service and route (instead of running them twice).
* Plugins attached to the cluster will be effective for all API requests. Care must
be taken that these plugins won't override the same ones on the service, route, and consumer, i.e.
same plugins will be run twice (the one on cluster runs first).

What's Next
-----------

API7 Cloud provides several plugins for different purposes. Please refer to the table of contents below to
learn the details.

* Security
  * [ACL Plugin](../guides/security/acl.md)
  * [CORS Plugin](../guides/security/cors.md)
  * [CSRF Plugin](../guides/security/csrf.md)
  * [IP Restriction Plugin](../guides/security/ip-restriction.md)
* Traffic Management
  * Authentication Plugin
    * [Basic Auth](../guides/traffic-management/authentication/basic-auth.md)
    * [HMAC Auth](../guides/traffic-management/authentication/hmac-auth.md)
    * [JWT Auth](../guides/traffic-management/authentication/jwt-auth.md)
    * [Key Auth](../guides/traffic-management/authentication/key-auth.md)
    * [OpenID Connect](../guides/traffic-management/authentication/openid-connect.md)
  * [Limit Count Plugin](../guides/traffic-management/limit-count.md)
  * [Fault Injection Plugin](../guides/traffic-management/fault-injection.md)
  * [Redirect Plugin](../guides/traffic-management/redirect.md)
  * [Request Rewrite Plugin](../guides/traffic-management/proxy-rewrite.md)
  * [Response Rewrite Plugin](../guides/traffic-management/response-rewrite.md)
* Product
  * [Request ID Plugin](../guides/product/request-id.md)
* Observability
  * [Logging Plugin with HTTP Logger](../guides/observability/log-collection-with-http-logger.md)
  * [Logging Plugin with Kafka Logger](../guides/observability/log-collection-with-kafka-logger.md)
