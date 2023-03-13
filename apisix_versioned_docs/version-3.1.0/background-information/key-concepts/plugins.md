---
title: Plugins
slug: /key-concepts/plugins
---

In this document, you will learn the basic concept of plugins in APISIX and why you need plugins. You will be introduced to a few relevant concepts, including plugins enablement, plugins configuration files precedence, plugins execution filter and order, as well as plugins development. 

Explore additional resources at the end of the document for more information on related topics. 

## Overview

APISIX _plugins_ extend APISIX's functionalities to meet organization or user-specific requirements in traffic management, observability, security, request/response transformation, serverless computing, and more.

There are many existing APISIX plugins available for you to customize and orchestrate. You can also write your own plugins in Lua or other languages such as Java, Python, Go, and Wasm.

[//]: <TODO: PluginHub provides an inventory of plugins and their detailed usage. >

[//]: <TODO: Add link for orchestraiton. >

## Plugins Installation

APISIX comes with a default configuration file called `config-default.yaml` and a user-defined configuration file called `config.yaml`. These files are located in the `conf` directory. If the same block (e.g. `plugins`) exists in both files, the corresponding configurations in `config.yaml` will overwrite those in `config-default.yaml`.

The `plugins` block is where you can declare the plugins loaded to your APISIX instance:

```yaml
plugins:
  - real-ip         # loaded
  - ai              
  - client-control
  - proxy-control
  - request-id
  - zipkin
  # - skywalking    # not loaded
...
```

If you have made modifications to these configuration files, you would need to start/restart your APISIX instance for changes to take effect. 

[//]: <TODO: To learn more about the configuration file, see Reference - Configuration file>

## Plugins Execution Lifecycle

An installed plugin is first initialized. The configuration of the plugin is then checked against the defined [JSON Schema](https://json-schema.org) to make sure the plugins configuration schema is correct.

When a request goes through APISIX, the plugin's corresponding methods are executed in one or more of the following phases : `rewrite`, `access`, `before_proxy`, `header_filter`, `body_filter`, and `log`. These phases are largely influenced by the [OpenResty directives](https://openresty-reference.readthedocs.io/en/latest/Directives/).


<br />
<div style={{textAlign: 'center'}}>
<img src="https://static.apiseven.com/uploads/2023/03/09/ZsH5C8Og_plugins-phases.png" alt="Routes Diagram" width="50%"/>
</div>
<br />

To learn more about phases for your custom plugins development, see the plugin development how-to guide (coming soon). 

## Plugins Configuration Precedence

Plugins can be configured in [routes](https://docs.api7.ai/apisix/key-concepts/routes), [services](https://docs.api7.ai/apisix/key-concepts/services), [consumers](https://docs.api7.ai/apisix/key-concepts/consumers), [consumer groups](https://docs.api7.ai/apisix/key-concepts/consumer-groups), or plugin configs. Each plugin is only executed once for each incoming request, so if the same plugin is configured in multiple places, only one copy of the configuration will be used.

The order of precedence for plugin configuration is `Consumer` > `Consumer Group` > `Route` > `Plugin Config` > `Service`.

[//]: <TODO: add link for plugin configs>

## Plugins Execution Filter

By default, all plugins are triggered by incoming requests that match the configured rules in routes. However, in some cases, you may want more granular control over plugins execution; that is, conditionally determine which plugins are triggered for requests.

APISIX allows for dynamic control over plugin execution by applying the `_meta.filter` configuration to the plugins. The configuration supports the evaluation of [Nginx variables](http://nginx.org/en/docs/varindex.html), [APISIX variables](https://apisix.apache.org/docs/apisix/apisix-variable/), and [regular expressions (RegEx)](https://github.com/api7/lua-resty-expr#operator-list).

For example, the following `_meta.filter` configuration applies a filter to an incoming request's URI query parameter. Only incoming HTTP requests with the URI query parameter `version` set to `v2` will trigger the execution of `proxy-rewrite` plugin, which modifies the upstream URI path to from `/anything` to  `/anything/v2`. As a result, APISIX will forward requests sent to `httpbin.org/anything?version=v2` to `httpbin.org/anything/v2`:

```json
{
  "uri": "/anything",
  "plugins": {
    "proxy-rewrite": {
      # highlight-start
      "_meta": {
        "filter": [
          ["arg_version", "==", "v2"]
        ]
      },
      # highlight-end
      "uri": "/anything/v2"
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "httpbin.org:80": 1
    }
  }
}
```

If an incoming request does not include the `version=v2` key-value pair in the request's URI parameter, the `proxy-rewrite` plugin will not be executed. Instead, the request will be forwarded to `httpbin.org/anything` without any modification to the upstream URI path.

[//]: <TODO: Update link for APISIX variables to API7's doc. >
[//]: <TODO: Add link to plugin filter reference WITH EXAMPLES. >


## Plugins Execution Order

By default, plugins are executed in the order specified by their pre-configured priorities in the source files. Within a given [APISIX phase](./plugins.md#plugins-execution-lifecycle), plugins with higher priority numbers are executed before those with lower ones.

Take two plugins in the `access` phase as an example. If the `ip-restriction` plugin (priority 3000) and the `limit-count` rating limiting plugin (priority 1002) are both enabled and configured, `ip-restriction` will be executed first. 

However, there may be cases where you need to change the order of plugin execution. In such cases, APISIX allows you to re-order plugins within a given phase by passing a custom priority into the `_meta.priority` field.

In the example above, say you want to run `limit-count` before `ip-restriction`. You can do so by passing a priority number higher than the priority of `ip-restriction` into the `_meta.priority` field of `limit-count`:

```json 
"plugins": {
  "limit-count": {
    # highlight-start
    "_meta": {
      "priority": 3010
    }
    # highlight-end
  }
}
```

Note that this only modifies the priority of the specific plugin instance; it does not overwrite the global plugin priority. To reset the priority to the global default, simply remove the `_meta.priority` field from your plugin configuration.

[//]: <TODO: Add link to plugin priority reference >

## Plugins Development

APISIX supports plugin extension in multiple languages, including Lua, Java, Python, Go, and Wasm.
Plugins run in three major ways:

* Lua plugins run natively in APISIX.
* Java, Python, and Go plugins run in their corresponding APISIX plugin runners, communicating over [remote procedure calls (RPCs)](https://apisix.apache.org/docs/apisix/internal/plugin-runner/).
* Wasm plugins run in the APISIX Wasm plugin runtime.

To learn more about developing plugins, see the plugin development how-to guide (coming soon).

[//]: <TODO: Link to plugins development doc. >

## Additional Resource(s)
* Getting Started - [Configure Rate Limiting](../../getting-started/rate-limiting.md)
* [How to Build an Apache APISIX Plugin From 0 to 1?](https://api7.ai/blog/how-to-build-an-apache-apisix-plugin-from-0-to-1)
[//]: <TODO: Lua Plugins>
[//]: <TODO: External Plugins>
[//]: <TODO: Plugin Orchestration>
[//]: <TODO: Plugin Hotloading>
[//]: <TODO: Plugin References/Hub>
[//]: <TODO: Reference - Configuration file>
[//]: <TODO: Admin API - Plugin>
[//]: <TODO: Router Expressions>

