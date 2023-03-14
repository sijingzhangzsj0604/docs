---
title: What is Route
reading_time: auto
show_feedback: true
---

In API7 Cloud, a route is a specific endpoint exposed by a [service](./service.md).

How to Create a Route
---------------------

Note route is an affiliated resource of the Service, to create a route,
please create a [service](./service.md) first.

1. Open the [API7 Cloud console](https://console.api7.cloud).
2. From the left navigation bar, choose **API Management**, then select **Services** from the secondary manu.
3. Click on the name of the target Service that you want to add a route for.
4. On the Service details page, click on the **Create Route**
5. Fill the form to create the target route. Two kinds of content that you should fill out:
   * **Basic**, fields like name, path, and method should be filled out.
   * [**Plugins**](./plugin.md), where you can specify a set of plugins.

How to Get Route Details
------------------------

To get a route details, do the following:

1. Open the [API7 Cloud console](https://console.api7.cloud).
2. From the left navigation bar, choose **API Management**, then select **Services** from the secondary manu.
3. Click on the name of the target Service (you need to know where the route is).
4. On the Service details page, search for the route that you want in the routes table. Click on the route name.
5. You'll be redirected to the route details page.

How to Update a Route
---------------------

To update a route, follow the tips in [How to Get Route Details](#how-to-get-route-details) first.

Route attributes are categorized into **Basics**, **Fine Grained Route Control**, **Plugins**, click on the
edit icon to update the desired part.

How to Delete a Route
--------------------

:::danger
IT'S DANGEROUS TO DELETE A ROUTE, SO PLEASE MAKE SURE YOU NO LONGER USE IT.
:::

To delete a route, do the following:

1. Open the [API7 Cloud console](https://console.api7.cloud).
2. From the left navigation bar, choose **API Management**, then select **Services** from the secondary manu.
3. Click on the name of the target Service (you need to know where the route is).
4. On the Service details page, search for the route you want in the routes table. Then:
   1. Click on the delete button.
   2. Or you can enter the route details page by clicking the route name, then click on the **Actions** button, select **Delete** field.

You'll be asked to fill the route name as the double check before deleting the route.

Key Fields
----------

Some fields are vital for the route to work.

### Path

`Path` is the URI path of the route. It'll start with the [Path Prefix](./service.md#path-prefix).
You can decide to if strip the `Path Prefix` (through the `Strip Service Path Prefix` option)
before the request goes upstream. As an example, if the `Path Prefix` is `/api/v1`, the `Path` is
`/products`, requests will have `/api/v1/products` as the URI path when they go to the upstream if the
`Strip Service Path Prefix` option is disabled; On the contrary, if the `Strip Service Path Prefix`
is enabled, the `Path` will be `/products`, and requests will have `/products`.

:::note
API7 Cloud inserts a slash (`/`) between the `Path Prefix` and the `Path`, so if the `Path Prefix` is `/api/v1`,
and `Path` is `products`, the URI path will be `/api/v1/products` instead of `/api/v1products`.
:::

The match type for the `Path` can be exact or prefix. An exact match means the URI path of requests should be
identical to the route `Path`. Prefix match means the URI path of requests should start with the
`Path` of this route. As an example, if the `Path` is `/products`, and the match type is prefix, then `/products/c2fb7846`,
`/products123` will be matched. But if the match type is exact, then only `/products` can be matched.

### Method

`Method` limits the allowed [HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). It's an optional field. By default, API7 Cloud doesn't limit the HTTP methods.

### Fine Grained Route Control

Sometimes it's not enough to match the route only uses path, HTTP methods. For example, for requests
which takes the `X-API-Version` header and value is `v1`, let's apply the [Fault Injection](../guides/traffic-management/fault-injection.md).
In such a case, the route fine-grained route control helps you.

The fine-grained route control feature is composed of a series of expressions. An expression contains subject, name, operator, value.

* The subject is the scope of the expression subject, optional values are:
  * `Header`: subject will fetch from HTTP request headers.
  * `Cookie`: subject will fetch from Cookie fields.
  * `Query`: subject will fetch from URI queries.
  * `Path`: subject will be the URI path.
  * `Variable`: subject will be a Nginx variable or APISIX variable.
* The name is the subject name, There are some requirements for name:
  * When `subject` is `Variable`, name should be a valid [Variable](../references/variables.md).
  * When `subject` is `Path`, name is not necessary.
* The value is the desired value that the subject should match.
* The operator decides how to match the value, optional values are:
  * `Equal`: subject should be equal to the value.
  * `Not Equal`: subject should not be equal to the value.
  * `Regex Match`: subject should match the value pattern (value should be a PCRE regex pattern).
  * `Regex Not Match`: subject should not match the value pattern (value should be a PCRE regex pattern).
  * `Present`: subject should not be empty. In case value field is not necessary.
  * `Not Present`: subject should be empty. In case value field is not necessary.
  * `Larger Equal`: subject should be greater than or equal to the value (value should be a number).
  * `Larger Than`: subject should be greater than the value (value should be a number).
  * `Less Equal`: subject should be less than or equal to the value (value should be a number).
  * `Less Than`: subject should be less than the value (value should be a number).

Besides, API7 Cloud also supports configuring the logical relationship among all the expressions. options can be:

* `All`: result of all expressions must be `true`.
* `Any`: at least one of the expression results should be `true`.

![FINE GRAINED ROUTE CONTROL](https://static.apiseven.com/2022/12/30/fine-grained-route-control.png)

The above fine grained route control configurations makes only requests with below characteristics can match the route:

1. Requests should have the `X-Debug` header.
2. Requests should have the `version` arg in the query string, and its value should be `v1`.

What's Next
-----------

* Learn about [Plugin](./plugin.md).
* Learn about [Consumer](./consumer.md).
