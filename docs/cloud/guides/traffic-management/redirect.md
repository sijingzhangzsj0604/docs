---
title: API Redirect
reading_time: auto
show_feedback: true
---

A server triggers a redirection via sending special responses which
status code typically is `301`, `302`, `303`, `307`, and `308`.
You may want to redirect API requests in some cases, e.g., you're migrating
the API and the Host or URI are changed.

In this guide, you'll learn how to configure redirection rules on API7 Cloud
with the help of the Redirect plugin.

:::tip
The Redirect plugin doesn't support redirecting HTTP requests to HTTPS. If you want, see [Build HTTPS Only Application](../security/https-only-application.md) for the details.
:::

Prepare the Environment
-----------------------

### Deploy Apache APISIX

Please refer to [How to Deploy Apache APISIX](../product/how-to-deploy-apache-apisix.md) to learn how to deploy
Apache APISIX and connect it to API7 Cloud. In this guide, we'll deploy an Apache APISIX instance on Docker.

### Create Application and API

We'll create an Application with the following details in this guide.

1. The Application name is `redirect-app`.
2. The path prefix is `/v1`.
3. The HTTP Host is `redirect.httpbin.org`.
4. The upstream URL is `https://httpbin.org`.

Besides, we'll create an API inside the `redirect-app` Application.

1. The API name is `anything`.
2. The path is `/anything` (prefix match), and strip the path prefix.
3. It accepts all HTTP methods.

:::note

If you don't know how to configure an Application and API, please refer to the [Getting Started](../../getting-started) guides first

:::

Test Direct Redirection
-----------------------

One of the running modes of the Redirect plugin is redirecting your API requests to another URL. We call it
the replace mode.

Now let's create the Redirect plugin for the `anything` API.

![Redirect Plugin Replace Mode](https://static.apiseven.com/2022/12/30/redirect-plugin-replace-mode.png)

We'll redirect all API requests to `/v1/json`. Now let's send a request to verify it.

```shell
curl http://127.0.0.1:9080/v1/anything -H 'Host: redirect.httpbin.org' -i
```

```shell
HTTP/1.1 302 Moved Temporarily
Date: Wed, 10 Aug 2022 06:24:02 GMT
Content-Type: text/html
Content-Length: 142
Connection: keep-alive
Location: /v1/json
Server: APISIX/2.15.0

<html>
<head><title>302 Found</title></head>
<body>
<center><h1>302 Found</h1></center>
<hr><center>openresty</center>
</body>
</html>
```

As you can see, the Location header contains the new URL we want.

Test Regex Substitution
-----------------------

The Redirect plugin also has a fine-grain running mode, which constructs the
Location header according to the current API path and a regex template.

Let's update the Redirect plugin.

![Redirect Plugin Regex Substitution](https://static.apiseven.com/2022/12/30/redirect-plugin-regex-substitution.png)

In this case, we hope all API requests led by `/v1` will be replaced with `/v2`.

Let's send a request and see what will happen.

```shell
curl http://127.0.0.1:9080/v1/anything -H 'Host: redirect.httpbin.org' -i
```

```shell
HTTP/1.1 302 Moved Temporarily
Date: Wed, 10 Aug 2022 06:29:01 GMT
Content-Type: text/html
Content-Length: 142
Connection: keep-alive
Location: /v2/anything
Server: APISIX/2.15.0

<html>
<head><title>302 Found</title></head>
<body>
<center><h1>302 Found</h1></center>
<hr><center>openresty</center>
</body>
</html>
```

Let's focus on the Location header. It's `/v2/anything`, which is the expected one.

See Also
--------

* [Redirect Plugin Reference](../../references/plugins/traffic-management/redirect.md)
* [Apache APISIX Redirect Plugin](https://apisix.apache.org/docs/apisix/next/plugins/redirect/)
