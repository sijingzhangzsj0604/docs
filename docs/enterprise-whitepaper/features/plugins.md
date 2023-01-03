---
title: Plugins
slug: /features/plugins
tags:
  - API7 Enterprise
  - API7 Whitepaper
---

API7 has more than 60 built-in common plugins, covering authentication, security protection, traffic control, analysis and monitoring, request/response conversion and many other categories. Some popular plugins are listed in the chart below.

## Authentication

Authentication plugin can effectively protect Route, Service from illegal, unprivileged access.

|      Name      |                                                                                                        Description                                                                                                        |
| :------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| authz-keycloak |                                              When the plugin is enabled, API7 will support working with KeyCloak authentication service to complete identity authentication.                                              |
|   basic-auth   |                                                           When the plugin is enabled, the client needs to use the correct account and password when accessing.                                                            |
|   hmac-auth    | When the plugin is enabled, in addition to verifying the validity of the client's identity, its end request parameters will also be signed and verified to avoid parameter tampering or secondary access (replay attack). |
|    jwt-auth    |                    When the plugin is enabled, JSON Web Token will be used for validity verification, and the client needs to add the correct Token content to the HTTP request header when accessing.                    |
|    key-auth    |                                         When the plugin is enabled, the client needs to carry the correct key in the request header or query string when accessing the resource.                                          |
|   wolf-rbac    |                                                         With this plugin enabled, the gateway will support wolf-based authentication and authorization features.                                                          |
| openid-connect |                                                               When the plugin is enabled, the gateway will support authentication and token introspection.                                                                |
|  authz-casbin  |                                                          When the plugin is enabled, support the authorization scenario based on various access control models.                                                           |
|   ldap-auth    |                                    The built-in authentication plugin can be integrated with the LDAP service and cooperate with the Consumer to realize the authentication function.                                     |
|      opa       |               This plugin is used to integrate with Open Policy Agent. Using this plugin, users can decouple authentication and authorization functions, reducing the complexity of the application system.               |
|  forward-auth  |                                   The plugin uses classic external authentication. When the certification fails, you can implement custom errors or redirect to the certification page.                                   |

## Security

|         Name         |                                                                                                                         Description                                                                                                                          |
| :------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     api-breaker      | After enabling this plugin, the gateway will determine whether the upstream is abnormal according to the configuration, and if it is abnormal, it will directly return the preset error code and no longer access the upstream for a certain period of time. |
| consumer-restriction |                    When this plugin is enabled, if whitelist is set, consumers outside the whitelist will be denied requests by the gateway; if blacklist is set, consumers inside the blacklist will be denied requests by the gateway.                     |
|         cors         |                                                                                             Support browser requests to the service by enabling the CORS plugin.                                                                                             |
|   fault-injection    |                                      When the fault injection plugin is enabled, it will return the specified HTTP status code and response content directly to the incoming request for service maintenance purposes.                                       |
|    ip-restriction    |                                                   Restrict access to services by whitelisting or blacklisting IP addresses, setting single or multiple addresses, or setting IP ranges in a CIDR fashion.                                                    |
| referer-restriction  |                                                            When the plugin is enabled, the Referer information in the request header is used to determine if the request needs to be restricted.                                                             |
|  request-validation  |                                   When the gateway forwards the request upstream, the plugin uses JSONSchema to validate the request header against the request body, and requests that fail the validation are rejected.                                    |
|     uri-blocker      |                                                                 When the plugin is enabled, the gateway will return the specified status code when the request path matches the preset rule.                                                                 |
|    ua-restriction    |                                                            When this plugin is enabled, access to services or interfaces can be restricted by whitelisting or blacklisting specified User-Agent.                                                             |

## Traffic Control

|      Name      |                                                Description                                                 |
| :------------: | :--------------------------------------------------------------------------------------------------------: |
|   limit-conn   |                     Enabling this plugin will limit the number of concurrent requests.                     |
|  limit-count   | With this plugin enabled, requests that exceed a preset value within a fixed time window will be rejected. |
|   limit-req    |          When enabled, the plugin will use the Leaky Bucket algorithm to limit the request rate.           |
| traffic-split  | The plugin allows us to dynamically control the ratio of traffic directed to different upstream services.  |
| proxy-control  |        When this plugin is enabled, the behavior of the NGINX proxy can be dynamically controlled.         |
| client-control |  After enabling this plugin, it can dynamically control the behavior of NGINX processing client requests.  |


## Serverless

The Serverless plugin dynamically executes Lua code in the gateway access phase to enable the execution of FaaS functions in a serviceless environment.

|           Name           |                                                                                                 Description                                                                                                 |
| :----------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| serverless-post-function |                                                                  The functions configured in this plugin will be run before other plugins.                                                                  |
| serverless-pre-function  |                                                                  The functions configured in this plugin will be run after other plugins.                                                                   |
|     azure-functions      |      The plugin is a built-in serverless plugin for seamless integration with Azure Serverless Function (as a dynamic upstream) to proxy all requests for a specific URI to the Microsoft Azure Cloud.      |
|        openwhisk         | This plugin is for integration with the Apache Open Whisk serverless platform and can be set on the route in place of Upstream which will take over the request and send it to the Open Whisk API endpoint. |
|        aws-lambda        |                           A built-in serverless plugin for seamless integration with AWS Lambda (as a dynamic upstream), proxying all requests for a specific URI to AWS Lambda.                            |

## Observability

|                                                                                                          Name                                                                                                           |                                                                                                               Description                                                                                                                |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                    error-log-logger                                                                                                     |                                                       The plugin will push the contents of the error.log file generated by the gateway to the specified server using TCP protocol.                                                       |
|                                                                                                       http-logger                                                                                                       |                                                                 This plugin is used to send request data, response data, and contextual information to the HTTP server.                                                                  |
|                                                                                                      kafka-logger                                                                                                       |                                                                                               The plugin will send the log data to Kafka.                                                                                                |
|                                                                                                       prometheus                                                                                                        |                                                                          The plugin will expose the relevant metrics of the gateway in Prometheus' data format.                                                                          |
|                                                                                                       request-id                                                                                                        |                                                          The plugin will add a request-id request header to each request processed by the gateway to identify the API request.                                                           |
|                                                                                                       skywalking                                                                                                        |                          SkyWalking is an observability analysis platform, and this plugin will proactively report data to SkyWalking so that we can easily view the status of the gateway through SkyWalking.                           |
|                                                                                                       sls-logger                                                                                                        |                                                           This plugin is used to send request data, response data and contextual information to AliCloud SLS logging service.                                                            |
|                                                                                                         syslog                                                                                                          |                                                                      This plugin is used to send request data, response data, and contextual information to Syslog.                                                                      |
|                                                                                                       tcp-logger                                                                                                        |                                                                                This plugin is used to send access-log data as TCP to the specified server                                                                                |
|                                                                                                       udp-logger                                                                                                        |                              This plugin is used to send access-log data to the specified server as UDP. Since UDP does not require three handshakes, it is efficient and has good real-time transmission.                               |
|                                                                                                         zipkin                                                                                                          | The plugin will report gateway timing and trace data to Zipkin, including but not limited to TraceID, node information, request information, latency, etc. This can help us locate problems encountered with the gateway through Zipkin. |
|                                                                                                       node-status                                                                                                       |                                                                             A request status query plugin of APISIX, which returns basic status information.                                                                             |
|                                                                                                         datadog                                                                                                         |                                              A built-in monitoring plugin that integrates seamlessly with Datadog to push its custom metrics to the DogStatsD server via the UDP protocol.                                               |
|                                                                                                    skywalking-logger                                                                                                    |                     Enable this plugin to push Access Log data to the Sky Walking OAP server via HTTP. If there is a tracing context in the context, the plugin will automatically associate the trace with the log.                     |
|                                                                                                     rocketmq-logger                                                                                                     |                                                              After enabling this plugin, API request logs can be pushed to external RocketMQ clusters in the form of JSON.                                                               |
|                                                                                                       log-rotate                                                                                                        |                                                   After this plugin is enabled, the regular segmentation of the access and error logs in the logs directory can be done automatically.                                                   |
| Through the configuration parameters, you can set how often the logs are split at each interval, and how many logs are kept recently (after the specified number is exceeded, the old files are automatically deleted). |
|                                                                                                  google-cloud-logging                                                                                                   |                                                     The plugin provides the function of pushing the requested log data to the Google Cloud log service in the form of a batch queue.                                                     |
|                                                                                                   splunk-hec-logging                                                                                                    |                                                                This plugin is used to forward request logs to Splunk HTTP Event Collector (HEC) for storage and analysis.                                                                |

## Others

|        Name         |                                                                                                                                                                                                                                       Description                                                                                                                                                                                                                                       |
| :-----------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   batch-requests    |                                                                                                  The plugin will support the use of Pipeline form to receive multiple requests and send them to the corresponding upstream service, whose response content is a combination of the response content of multiple requests. This is useful when a client wants to access multiple APIs.                                                                                                   |
|   grpc-transcode    |                                                                                                                                                                                                   The plugin will support sending RESTful API requests to the gRPC upstream service.                                                                                                                                                                                                    |
|     proxy-cache     | The plugin will support caching upstream service response content, when the content requested by the client already exists in the cache, the content will be returned directly from the cache, without the need to request the upstream service again. This will effectively reduce the pressure on the upstream service. In addition, when the upstream node fails, it can also temporarily return the cached content without returning the error page to improve the user experience. |
|    proxy-mirror     |                                                                                                                                                                                               The plugin supports mirrored replication of requests for better bypassed request analysis.                                                                                                                                                                                                |
|    proxy-rewrite    |                                                                                                                       Before the request sent by the client reaches the upstream service, the plugin will modify the request according to the specified rules, including but not limited to the request body, request header, request path and other parameters.                                                                                                                        |
|  response-rewrite   |                                                                                                                          Before the response from the upstream service reaches the client, the plugin will modify the response content according to the specified rules, including but not limited to the response body, response header and other parameters.                                                                                                                          |
|      redirect       |                                                                                                                                                                                                                       This plugin can implement URI redirection.                                                                                                                                                                                                                        |
|        gzip         |                                                                                                                                                                                                           This plugin can dynamically set the compression behavior of NGINX.                                                                                                                                                                                                            |
|       real-ip       |                                                                                                                                                                                           This plugin is used to dynamically change the IP and Port of the real client passed to the Gateway.                                                                                                                                                                                           |
|     server-info     |                                                                                                                                                                                                     This plugin can periodically report basic service information to etcd plugins.                                                                                                                                                                                                      |
| ext-plugin-pre-req  |                                                                                                                                                                                       Run a specific External Plugin inside the Plugin Runner before executing most of the built-in Lua plugins.                                                                                                                                                                                        |
| ext-plugin-post-req |                                                                                                                                                       This plugin is similar to the ext-plugin-pre-req plugin, the only difference: it works after the built-in Lua plugin executes and before the request reaches the upstream.                                                                                                                                                        |
|      grpc-web       |                                                                                                                                                                                                      A proxy plugin that translates requests from gRPC web clients to gRPC Server.                                                                                                                                                                                                      |
|     dubbo-proxy     |                                                                                                                                                                                                        When enabled, the plugin allows proxying HTTP requests to  Apache Dubbo.                                                                                                                                                                                                         |
|     mqtt-proxy      |                                                                                                                                                                       After this plugin is enabled, the MQTT service can be brokered, and dynamic load balancing can be achieved according to the MQTT client_id.                                                                                                                                                                       |