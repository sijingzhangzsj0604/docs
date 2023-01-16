---
title: What is API
reading_time: auto
show_feedback: true
---

In API7 Cloud, an API is a specific endpoint exposed by an [Application](./application.md).

How to Create an API
--------------------

Note API is an affiliated resource of the Application, so before you go further,
please create an [Application](./application.md) first.

![HTTPBIN Application Details](https://static.apiseven.com/2022/12/30/httpbin-app-detail.png)

On the Application details page, scroll down to the API section and click on the **Create API** button, and you'll be redirected to a form to create an API.
![Create HTTPBIN JSON API](https://static.apiseven.com/2022/12/30/create-httpbin-json-api.png)

Two kinds of content that you should fill out:

1. **Basic**, fields like name, path, and method should be filled out.
2. [**Plugins**](./plugin.md), where you can specify a set of plugins.

Get API Details
---------------

On the Application details page, please scroll down to the API section,
search for the API you want to see, and click on its name. API7 Cloud will redirect you to the API details page.

![HTTPBIN JSON API DETAIL](https://static.apiseven.com/uploads/2023/01/12/1n3Kv5rc_Screenshot%202023-01-12%20at%2010.13.59.png)

Update API
----------

You can update an API after you enter the API details page.

API information is categorized into **Basics**, **Fine Grained Route Control**, **Plugins**, and each of them can be edited separately.

![Update API in API Details Page](https://static.apiseven.com/uploads/2023/01/13/6nqAMEnp_json-api-with-edit-mark.png)

Delete API
----------

:::danger
IT'S DANGEROUS TO DELETE AN API, SO PLEASE MAKE SURE YOU NO LONGER USE THIS API.
:::

![Delete JSON API](https://static.apiseven.com/2022/12/30/delete-api.png)

On the Application details page, scroll down to the API section,
search for the API you want to delete, and click on the trash can icon. API7 Cloud will prompt you to confirm the deletion.

![Double Check of Delete JSON API](https://static.apiseven.com/2022/12/30/delete-api-double-check.png)

Key Fields
----------

Some fields are vital for the API to work.

### Path

`Path` is the URI path of the API. It'll start with the [Path Prefix](./application.md#path-prefix).
You can decide to if strip the `Path Prefix` (through the `Strip Application Path Prefix` option)
before the request goes upstream. As an example, if the `Path Prefix` is `/api/v1`, the `Path` is
`/products`, requests will have `/api/v1/products` as the URI path when they go to the upstream if the
`Strip Application Path Prefix` option is disabled; On the contrary, if the `Strip Application Path Prefix`
is enabled, the `Path` will be `/products`, and requests will have `/products`.

:::note
API7 Cloud inserts a slash (`/`) between the `Path Prefix` and the `Path`, so if the `Path Prefix` is `/api/v1`,
and `Path` is `products`, the URI path will be `/api/v1/products` instead of `/api/v1products`.
:::

The match type for the `Path` can be exact or prefix. An exact match means the URI path of requests should be
identical to the API `Path`. Prefix match means the URI path of requests should start with the
`Path` of this API. As an example, if the `Path` is `/products`, and the match type is prefix, then `/products/c2fb7846`,
`/products123` will be matched. But if the match type is exact, then only `/products` can be matched.

### Method

`Method` limits the allowed [HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). It's an optional field. By default, API7 Cloud doesn't limit the HTTP methods.

### Fine Grained Route Control

Sometimes it's not enough to match the API only uses path, HTTP methods. For example, for requests
which takes the `X-API-Version` header and value is `v1`, let's apply the [Fault Injection](../guides/traffic-management/fault-injection.md).
In such a case, the API fine-grained route control helps you.

API7 Cloud allows you to configure some expressions in the API fine-grained route control.
An expression is composed of subject, name, operator, value.

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

The above fine grained route control configurations makes only requests with below characteristics can match the API:

1. Requests should have the `X-Debug` header.
2. Requests should have the `version` arg in the query string, and its value should be `v1`.

What's Next
-----------

* Learn about [Plugin](./plugin.md).
* Learn about [Consumer](./consumer.md).
