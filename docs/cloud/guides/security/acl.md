---
title: Enable ACL
reading_time: auto
show_feedback: true
---

API7 Cloud utilizes the [Consumer](../../concepts/consumer.md) functionality to provide fine-grained API authentication.
An API request with valid credentials can be forwarded by the [Apache APISIX](https://apisix.apache.org) normally, no matter which
[Service](../../concepts/service.md) it accesses. This permissive access control might not be enough when users want to
control which Consumers can access which services or [routes](../../concepts/route.md). So that requests from unauthorized Consumers
will be rejected by Apache APISIX, and the API security can be enhanced.

[ACL](https://en.wikipedia.org/wiki/Access-control_list) is a way to control the accessible clients of API.

This guide introduces how to configure the ACL plugin on API7 Cloud.

:::important
The ACL plugin is not available in the Free plan. Please see the [Pricing Page](https://api7.ai/pricing) for details.
:::

Prepare the Environment
-----------------------

### Deploy Apache APISIX

Please refer to [How to Deploy Apache APISIX](../product/how-to-deploy-apache-apisix.md) to learn how to deploy
Apache APISIX and connect it to API7 Cloud. In this guide, we'll deploy an Apache APISIX instance on Docker.

### Create Service and Route

We'll create a service with the following details in this guide.

1. The service name is `acl-app`.
2. The path prefix is `/v1`.
3. The HTTP Host is `acl.httpbin.org`.
4. The upstream URL is `https://httpbin.org`.
5. Configuring the Authentication plugin and using the [Key Auth](../traffic-management/authentication/key-auth.md) as the authentication method.

:::important Why do we need to configure the Authentication plugin?

The objects that the ACL plugin controls are Consumers, and API7 Cloud uses the authentication
credentials of API requests to identify the Consumer.

The ACL plugin won't work if you don't configure the Authentication plugin.

:::

Besides, we'll create a route inside the `acl-app` Service.

1. The route name is `json`.
2. The path is `/json` (exact match).
3. Accepted HTTP method is `GET`.

:::tip

If you don't know how to configure a service and route, please refer to the [Getting Started](../../getting-started) guides first

:::

### Create Four Consumers

Let's create four Consumers via the guide of [How to Create a Consumer](../../concepts/consumer.md#how-to-create-a-consumer). In addition,
let's configure the Key Auth credential for each Consumer.

![Consumer Cater](https://static.apiseven.com/2022/12/30/consumer-cater.png)

We created the Consumer whose name is Cater, the label is `team-1`, and configured the Key Auth Credential.

![Consumer Charles](https://static.apiseven.com/2022/12/30/consumer-charles.png)

We created the Consumer named Charles, the label is `team-1`, and configured the Key Auth Credential.

![Consumer Christopher](https://static.apiseven.com/2022/12/30/consumer-christopher.png)

We created the Consumer named Christopher, the label is `team-1`, and configured the Key Auth Credential.

![Consumer Christopher](https://static.apiseven.com/2022/12/30/consumer-camila.png)

We created the Consumer, whose name is Camila, the label is `team-2`, and configured the Key Auth Credential.

Test ACL Allow Mode
-------------------

There are two running modes for the ACL: `Allow` and `Deny`. When the ACL plugin runs under `Allow` mode,
The Consumers you specified are in the allowed list, and only these Consumers can access the Service / API;
On the contrary, when ACL plugin runs under `Deny` mode, the Consumers you specified cannot access the Service / API
(in the denied list).

In this section, we'll test the ACL `Allow` mode.

### Configuring Consumers Directly

The ACL plugin allows you to configure several Consumers by typing their names. This way is convenient when the Consumer account is not huge.

Now let's create the ACL plugin on the `acl-app` Service by running the following steps. Of course, you can configure it on the API level. In such a case, only the API you configured is protected by the ACL plugin.

1. Enter the `acl-app` Service details page.
2. Click on the **Add plugin** button.
3. Select ACL and fill in the form.

![Add ACL Plugin](https://static.apiseven.com/2022/12/30/add-acl-plugin.png)

In this case, we allow Camila and Christopher to access this Service.

Now let's send some API requests with four Consumers' API key perspectives.

* Send a request with the API Key of Cater. The request should fail, and the status code will be `403`.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: acl.httpbin.org'  -H 'Authorization: <API Key of Cater>' -s
```

* Send a request with the API Key of Charles. The request should fail, and the status code will be `403`.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: acl.httpbin.org'  -H 'Authorization: <API Key of Charles>' -s
```

* Send a request with the API Key Christopher. The request should succeed.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: acl.httpbin.org'  -H 'Authorization: <API Key of Christopher>' -s
```

* Send a request with the API Key of, Camila. The request should succeed.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: acl.httpbin.org'  -H 'Authorization: <API Key of Camila>' -s
```

### Configuring Consumers via Labels

It's not convenient to use the ACL plugin if the number of Consumers is large. In such a case, you can configure
the ACL plugin via Consumer labels. In this section, we will show you how to use Consumer labels to configure the ACL
allow list.

Let's update the ACL plugin on the `acl-app` Service.

1. Enter the `acl-app` Service details page.
2. Edit the ACL plugin.
3. Update the configuration, and fill out the `Allowed Consumer Labels` to `team-1`.

![Update ACL Plugin 1](https://static.apiseven.com/2022/12/30/update-acl-plugin-1.png)

As per the configuration, Consumers with the label `team-1` (Carter, Charles, and Christopher) can access this Service.

Now let's send some API requests with four Consumers' API key perspectives.

* Send a request with the API Key of Cater. The request should succeed.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: acl.httpbin.org'  -H 'Authorization: <API Key of Cater>' -s
```

* Send a request with the API Key of Charles. The request should succeed.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: acl.httpbin.org'  -H 'Authorization: <API Key of Charles>' -s
```

* Send a request with API Key Christopher. The request should succeed.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: acl.httpbin.org'  -H 'Authorization: <API Key of Christopher>' -s
```

* Send a request with the API Key of, Camila. The request should fail, and the status code should be `403`.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: acl.httpbin.org'  -H 'Authorization: <API Key of Camila>' -s
```

Test ACL Deny Mode
------------------

You can also configure the denied Consumer list in the ACL plugin. In such a case, Consumers not on the list
can access the Service usually.

### Configuring Consumers Directly

Let's update the ACL plugin on the `acl-app` Service.

1. Enter the `acl-app` Service details page.
2. Edit the ACL plugin.
3. Update the configuration, change the running mode to `Deny`, and fill out the `Denied Consumer` field.

![Update ACL Plugin 2](https://static.apiseven.com/2022/12/30/update-acl-plugin-2.png)

In this case, requests from Camila and Christopher will be rejected by Apache APISIX.

Now let's send some API requests with four Consumers' API key perspectives.

* Send a request with the API Key of Cater. The request should succeed.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: acl.httpbin.org'  -H 'Authorization: <API Key of Cater>' -s
```

* Send a request with the API Key of Charles. The request should succeed.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: acl.httpbin.org'  -H 'Authorization: <API Key of Charles>' -s
```

* Send a request with API Key Christopher. The request should fail, and the status code should be `403`.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: acl.httpbin.org'  -H 'Authorization: <API Key of Christopher>' -s
```

* Send a request with the API Key of, Camila. The request should fail, and the status code should be `403`.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: acl.httpbin.org'  -H 'Authorization: <API Key of Camila>' -s
```

### Configuring Consumers via Labels

Similar to the `Allow` mode, you can also configure denied Consumers via labels.

1. Enter the `acl-app` Service details page.
2. Edit the ACL plugin.
3. Update the configuration, change the running mode to `Deny`, and fill out the `Denied Consumer Labels` to `team-2`.

![Update ACL Plugin 3](https://static.apiseven.com/2022/12/30/update-acl-plugin-3.png)

In our case, requests from Camila will be rejected by Apache APISIX.

Now let's send some API requests with four Consumers' API key perspectives.

* Send a request with the API Key of Cater. The request should succeed.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: acl.httpbin.org'  -H 'Authorization: <API Key of Cater>' -s
```

* Send a request with the API Key of Charles. The request should succeed.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: acl.httpbin.org'  -H 'Authorization: <API Key of Charles>' -s
```

* Send a request with the API Key Christopher. The request should succeed.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: acl.httpbin.org'  -H 'Authorization: <API Key of Christopher>' -s
```

* Send a request with the API Key Camila. The request should fail, and the status code should be `403`.

```shell
curl http://127.0.0.1:9080/v1/json -H 'Host: acl.httpbin.org'  -H 'Authorization: <API Key of Camila>' -s
```

See Also
--------

* [ACL Plugin Reference](../../references/plugins/security/acl.md)
* [Apache APISIX Consumer Restriction Plugin](https://apisix.apache.org/docs/apisix/next/plugins/consumer-restriction/)
