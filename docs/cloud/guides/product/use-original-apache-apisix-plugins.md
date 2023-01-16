---
title: Use Original Apache APISIX Plugins
reading_time: auto
show_feedback: true
---

API7 Cloud uses [Apache APISIX](https://apisix.apache.org) as its data plane gateway.
Users can use all the original Apache APISIX plugins on API7 Cloud, users can configure
these plugins on [Application](../../concepts/application.md), [API](../../concepts/api.md),
[Consumer](../../concepts/consumer.md) and [Cluster](../../concepts/cluster.md).

:::tip
Currently, API7 Cloud supports all plugins in Apache APISIX `2.15`.
:::

Once users select an original Apache APISIX plugin, API7 Cloud will show a raw JSON editor,
and users can edit the plugin configurations. Plugin schemas are the same as the ones defined
by Apache APISIX.

For instance, here we configure the [API Breaker](https://apisix.apache.org/docs/apisix/plugins/api-breaker/)
plugin.

![Configure API Breaker Plugin](https://static.apiseven.com/2023/01/03/63b3dec5bfca0.png)

:::tip
For learning each original Apache APISIX plugin, please visit [Apache APISIX Website](https://apisix.apache.org/),
and search the plugin name.
:::

For most original Apache APISIX plugins, API7 Cloud doesn't implement the UI form for the following plugins
own the UI form, and users don't have to configure them via the JSON editor.

* [CORS](../security/cors.md) plugin
* [CSRF](../security/csrf.md) plugin
* [Limit Count](../traffic-management/limit-count.md) plugin
* [IP Restriction](../security/ip-restriction.md) plugin
* [Proxy Rewrite](../traffic-management/proxy-rewrite.md) plugin
* [Response Rewrite](../traffic-management/response-rewrite.md) plugin
* [ACL](../security/acl.md) plugin (this is a custom plugin developed by API7 Cloud)
* [Logging](../observability/log-collection-with-http-logger.md) plugin
* [Authentication](../traffic-management/authentication/basic-auth.md) plugin
* [Redirect](../traffic-management/redirect.md) plugin
* [Request ID](./request-id.md) plugin
* [Fault Injection](../traffic-management/fault-injection.md) plugin
