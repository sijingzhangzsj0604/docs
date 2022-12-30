---
title: What is Application
reading_time: auto
show_feedback: true
---

In API7 Cloud, the Application is a high-level abstraction for a backend (or upstream) from
API Gateway's point of view. In terms of architecture, it's equivalent to a micro-service,
which contains a set of [APIs](./api.md) (all of them will be effective on the API Gateway).

How to create an Application
----------------------------

After you sign in to API7 Cloud and click on the Applications tab
(under the API Management), API7 Cloud will redirect you to the Application list page
(this is the place where you can find all existing Applications).

![Enter Application List](https://static.apiseven.com/2022/12/30/enter-application-list.png)

Press the **Create Application** button and fill out the form to create the Application.

![Create HTTP Application](https://static.apiseven.com/2022/12/30/create-httpbin-app.png)

Three kinds of content that you should fill in to create an Application:

1. **Basic**, where you can specify the Application name,
   description, protocol, and other fields.
2. **Upstream**, where you can specify the upstream information (e.g., the target URLs).
3. [**Plugins**](./plugin.md), where you can specify a set of plugins.

:::important:::
The switch in the upper right controls if the Application is published. Only
published Application will be visible for gateway instances.
:::

Get Application Details
-----------------------

On the Application List page, search for the Application you want, and click on the
Application name. API7 Cloud will redirect you to the Application details page.

![HTTPBIN Application Details](https://static.apiseven.com/2022/12/30/httpbin-app-detail.png)

On the detail page, you can see the following attributes of this Application:

1. Basic information (e.g., [Protocol](#protocol), [Host](#host))
2. [Upstream](#upstream) information
3. API list
4. [Plugins](./plugin.md) on this Application
5. Canary Release rules

Delete an Application
---------------------

:::danger
**IT'S DANGEROUS TO DELETE AN APPLICATION UNLESS YOU KNOW IT'S NO LONGER USED.**
:::

Delete all the APIs in the Application before you try to delete the Application, or the delete operation will fail.

![Delete Application](https://static.apiseven.com/2022/12/30/delete-app.png)

Click on the trash icon to delete the Application, and you need to fill in the name of the target Application.

![Double Check for deleting Application](https://static.apiseven.com/2022/12/30/delete-app-double-check.png)

Key Fields
----------

Some fields are vital for the API to work.

### Protocol

Which protocol the Application will use. Currently, candidates are `HTTP`, `HTTPS`, and `HTTP, HTTPS`.

* `HTTP`. The Application only handles HTTP traffic.
* `HTTPS`. The Application only handles HTTPS traffic. In such a case, data plane instances will redirect requests sent to the HTTP port to the HTTPS port.
* `HTTP, HTTPS`. The Application handles both HTTP and HTTPS traffic.

### Path Prefix

`Path Prefix` is the path prefix of the Application. It'll be used with the [API Path](./api.md#path)
together to form the full API path.

### Host

`Host` indicates the HTTP Host header value for requests to the Application.

### Upstream

Fields in the **Upstream** section specify details about the upstream (in other words,
the backend micro-service).

API7 Cloud supports configuring multiple Upstream versions for the same Application. This feature is
always used with the Canary Release so that your backend service can transit from the old version to the new one smoothly.

You can only create one Upstream version (version name will be `default`) when creating the Application.
By default, you just need to specify the upstream address (URL), e.g., `https://httpbin.org`.

### Upstream Version in Use

This field indicates which [Upstream](#upstream) version is used.
All API requests will be forwarded to this Upstream version (if no Canary Release rule is active).

### Upstream Advanced Settings

If the use case is simple, you just need to fill in the backend service address. However, some
advanced settings might be helpful when the scenarios are complicated.

![Advanced Upstream Settings](https://static.apiseven.com/2022/12/30/advanced-upstream-settings.png)

:::tip
All the advanced upstream settings are collapsed by default. Click on **View Advanced Upstream Options**
to unfold them.

:::

#### Mutual TLS

If the backend service asks the client to provide the certificate as the identifier, you need to enable
the Mutual TLS feature for this upstream version. Please refer to [Enable Upstream Mutual TLS](../guides/security/enable-upstream-mutual-tls.md) for more details.

#### Load Balancing

Load balancing is trivial if you just have one endpoint for the backend service, but it's crucial when you have multiple.
You can select the desired load balancing algorithm and input several endpoints and weights.

Available load balancing algorithms are:

1. [Round Robin](https://en.wikipedia.org/wiki/Weighted_round_robin): API7 Cloud uses the weighted one.
2. [Least Connection](http://kb.linuxvirtualserver.org/wiki/Least-Connection_Scheduling): Schedule according to the existing connections of each endpoint.
3. [Exponentially Weighted Moving Average (EWMA)](https://en.wikipedia.org/wiki/Moving_average)

#### Timeouts

You can also customize the timeout settings for this upstream version if the default ones are not
appropriate for you. The connect timeout, read timeout, and send timeout are `60s` perspectives.

:::important

The timeouts are set for only between two successive write/read operations,
not for the transmission of the whole response.
:::

#### Retry

The `Retry` field controls the retry times for requests to this upstream version. By default,
it's equal to the number of endpoints minus `1` for this upstream version, e.g., if you configure five endpoints, then
requests will retry at most four times. It doesn't contain the time that the initial request to the backend. Set it to `0` will disable
the retry.

:::important When will Apache APISIX trigger retry?

1. An error occurred while establishing a connection with the endpoint, passing a request to it, or reading the response header;
2. A timeout has occurred while establishing a connection with the endpoint, passing a request to it, or reading the response header;

:::

### Service Discovery

The upstream target list will be dynamic if you're using service registry. In such a case, you can
configure an upstream with the Service Discovery settings instead of filling the target list. Currently,
only the [Kubernetes Service Discovery](../guides/traffic-management/service-discovery/kubernetes.md) is supported.

### Health Check

We cannot make sure any service can work all the time, or the [Service Level Agreement](https://en.wikipedia.org/wiki/Service-level_agreement) (aka SLA) won't appear. Forwarding API requests
to the correct backend service is an API Gateway's primary responsibility, but what if some service instances are broken? The API request may get HTTP status codes like `503` or `504`, depending on
the specific failures.

The service availability will be enhanced significantly if the API Gateway can pick up only the healthy instances when forwarding API requests. This is the feature that we call "Upstream Health Check".
You can configure the active health check and passive health check. For the active one, Apache APISIX will send probe requests to upstream targets and check if the targets are healthy or not. The passive
health check relies on checking the response of actual API requests (e.g., status code, connection state). Once failure times reach the configured threshold, Apache APISIX will mark upstream targets as unhealthy. You can enable the passive health check only if you also enable the active one because there is no "recovery mechanism" for the passive health check. Without the active health check, an
unhealthy node won't have a chance to be healthy again, even if it's healthy.

You can see the [Upstream Health Check Reference](../references/product/upstream-health-check.md) to learn the details.

What's Next
-----------

* Learn about [API](./api.md)
* Learn about [Plugin](./plugin.md)
* Learn about [Certificate](./certificate.md)
