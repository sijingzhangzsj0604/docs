---
title: Restrict the Access of APIs based on the IP Addresses
reading_time: auto
show_feedback: true
---

In some cases you won't hope requests from anywhere can access some your [services](../../concepts/service.md) or [routes](../../concepts/route.md).
For instance, you may only allow requests forwarded by the Layer-4 load balancer; Or if you find some suspicious IP addresses and you want to add them to
the deny list so that they cannot access your services.

This guide will show you how to use the IP Restriction plugin to protect your services and routes. IP Restriction has two running modes: `Allow` and `Deny`.
When IP Restriction plugin works in the `Allow` mode, only requests from the IP addresses or belonging to the [CIDR Ranges](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#:~:text=CIDR%20is%20also%20used%20for,of%20bits%20in%20the%20address.)
You configured can access the services or routes; On the contrary, if IP Restriction works in the `deny` mode, Apache APISIX will block requests from the IP addresses or belonging to the CIDR Ranges you configured.

:::tip

You cannot run the IP Restriction plugin in the `Allow` mode and `Deny` mode simultaneously.

:::

:::important
The IP Restriction plugin is not available in the Free plan. Please see the [Pricing Page](https://api7.ai/pricing) for details.
:::

Create Service and Route
------------------------

We'll create a Service with the following details in this guide.

* The Service name is `ip-restriction-app`.
* The path prefix is `/v1`.
* The HTTP Host is `ip-restriction.httpbin.org`.
* The upstream URL is `https://httpbin.org`.

Besides, we'll create a route inside the `ip-restrction-app` Service.

* The route name is `anything`.
* The path is `/anything` (exact match).
* Accepted HTTP method is `GET`.

:::tip

If you don't know how to configure a service and route, please refer to the [Getting Started](../../getting-started)
guides first

:::

Test the Allow Mode
--------------------

Now let's add the IP Restriction plugin on the `ip-restriction-app` Service.
You can enter the `ip-restriction-app` details page, click on the **Add Plugin** button,
select IP Restriction plugin, and fill out the form.

![IP Restriction on Allow Mode](https://static.apiseven.com/2022/12/30/ip-restriction-on-allow-mode.png)

:::tip

You can also configure the IP Restriction plugin on the route level,
in such a case, only the route will be protected by this plugin.

:::

Only requests from the net `192.168.1.0/24` can access the `ip-restriction-app`. Now let's
send a request from the local host and see what will happen.

```shell
curl http://127.0.0.1:9080/v1/anything -H 'Host: ip-restriction.httpbin.org' -i
```

```shell
HTTP/1.1 403 Forbidden
Date: Fri, 10 Jun 2022 02:44:27 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/2.15.0

{"message":"invalid ip address"}
```

As you can see, our request is rejected since the source IP address is `127.0.0.1`.

Let's update the IP Restriction plugin and open the access from `172.17.0.1`.

:::important

Since we deploy Apache APISIX on Docker, here we use the container network gateway address `172.17.0.1`.
Although we access Apache APISIX through the host net, the source IP address will be mapped from `127.0.0.1`
to `172.17.0.1`.

You can get the network gateway address by running the
following command:

```shell
docker inspect <APISIX Container Name> --format '{{ .NetworkSettings.Networks.bridge.Gateway }}'
```

:::

![Edit IP Restriction on Allow Mode](https://static.apiseven.com/2022/12/30/edit-ip-restriction-allow-mode.png)

Then send the request again and see the result.

```shell
curl http://127.0.0.1:9080/v1/anything -H 'Host: ip-restriction.httpbin.org' -H -v
```

```shell
{
  "args": {},
  "data": "",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Host": "ip-restriction.httpbin.org",
    "User-Agent": "curl/7.76.1",
    "X-Amzn-Trace-Id": "Root=1-62a2b7bd-4123e4085a0774ca2536af44",
    "X-Forwarded-Host": "ip-restriction.httpbin.org"
  },
  "json": null,
  "method": "GET",
  "origin": "172.17.0.1, 61.241.66.251",
  "url": "https://ip-restriction.httpbin.org/anything"
}
```

As you can see, Apache APISIX forwards the API request to the backend successfully.

Test the Deny Mode
-------------------

Now let's update the IP Restriction plugin.

![Edit IP Restriction Plugin on Deny Mode](https://static.apiseven.com/2022/12/30/edit-ip-restriction-deny-mode.png)

We change the running mode from `Allow` to `Deny`, and Apache APISIX will reject requests from `172.17.0.1`.
Let's send a request to verify it.

```shell
curl http://127.0.0.1:9080/v1/anything -H 'Host: ip-restriction.httpbin.org' -i
```

```shell
HTTP/1.1 403 Forbidden
Date: Fri, 10 Jun 2022 05:07:45 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX/2.15.0

{"message":"invalid ip address"}
```

Apache APISIX rejects the request.

Then let's try to log in to the Apache APISIX container and send a request.

```shell
docker exec <APISIX Container Name> curl http://127.0.0.1:9080/v1/anything -H 'Host: ip-restriction.httpbin.org' -i
```

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 439
Connection: keep-alive
Date: Fri, 10 Jun 2022 05:11:10 GMT
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Server: APISIX/2.15.0

{
  "args": {},
  "data": "",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Host": "ip-restriction.httpbin.org",
    "User-Agent": "curl/7.29.0",
    "X-Amzn-Trace-Id": "Root=1-62a2d26e-6dbdc008357462b8694b5e0f",
    "X-Forwarded-Host": "ip-restriction.httpbin.org"
  },
  "json": null,
  "method": "GET",
  "origin": "127.0.0.1, 61.241.66.251",
  "url": "https://ip-restriction.httpbin.org/anything"
}
```

Since we log in to the container, the source of the request is `127.0.0.1`, so it's not blocked by the
IP Restriction plugin.

See Also
--------

* [IP Restriction Plugin Reference](../../references/plugins/security/ip-restriction.md)
* [Apache APISIX IP Restriction Plugin](https://apisix.apache.org/docs/apisix/next/plugins/ip-restriction/)
