---
title: Enable Upstream Mutual TLS
reading_time: auto
show_feedback: true
---

Mutual TLS (aka mTLS) asks the client to provide a certificate as its
identifier so the server can verify it in a TLS handshake. It can be
enforced between the clients and [Apache APISIX](https://apisix.apache.org),
and between Apache APISIX and the backend services.

This guide will show you how to configure mTLS between Apache APISIX and your backend services.

:::important

Please read [What is SSL](../../concepts/ssl.md) before you go ahead.

:::

Prepare the Environment
-----------------------

### Deploy Apache APISIX

Please refer to [How to Deploy Apache APISIX](../product/how-to-deploy-apache-apisix.md) to learn how to deploy
Apache APISIX and connect it to API7 Cloud. In this guide, we'll deploy an Apache APISIX instance on Docker.

### Sign Certificates

To show the mTLS feature, we use `openssl` to generate three key pairs:

1. The CA certificate and private key
2. The server certificate and private key (used by backend service)
3. The client certificate and private key (used by Apache APISIX)

```shell
# Generate the CA certificate and private key
openssl req  -x509 -nodes -new -keyout ca.key -out ca.crt -days 3650 -subj "/C=/ST=/L=/O=/OU=web/CN=private_ca"

# Generate the server certificate sign request and its private key
openssl req -newkey rsa:2048 -nodes -days 3650 -keyout server.key -out server.req

# Generate the server certificate
openssl x509 -req -days 3650 -set_serial 01 -in server.req -out server.crt -CA ca.crt -CAkey ca.key

# Generate the client certificate sign request and its private key
openssl req -newkey rsa:2048 -nodes -days 3650 -keyout client.key -out client.req -subj "/C=/ST=/L=/O=/OU=web/CN=mtls.httpbin.org"

# Generate the client certificate
openssl x509 -req -days 3650 -set_serial 01 -in client.req -out client.crt -CA ca.crt -CAkey ca.key
```

You can skip the above steps if you already have these certificates.

### Create SSL Object

Follow the tips in [How to Create SSL Object](../../concepts/ssl.md#how-to-create-ssl-object) and upload the server certificate, private key, CA certificate, API7 Cloud
creates an SSL object.

### Deploy Backend Service

For demonstration, in this guide, we create a [Nginx](https://nginx.org/) container. It'll return a simple
string `"mtls upstream"`. If you have an existing backend service that enables mTLS, you can use it and
skip to creating the Nginx container.

```nginx
# mtls.conf
server {
    listen 8443 ssl;
    ssl_certificate conf.d/server.crt;
    ssl_certificate_key conf.d/server.key;
    ssl_trusted_certificate conf.d/ca.crt;

    location / {
        return 200 "mtls upstream";
    }
}
```

Then run the container.

```shell
docker run --name mtls-upstream-server --detach --rm -v /path/to/mtls.conf:/etc/nginx/conf.d/httpbin.conf -v /path/to/server.crt:/etc/nginx/conf.d/server.crt -v /path/to/server.key:/etc/nginx/conf.d/server.key -v /path/to/ca.crt:/etc/nginx/conf.d/ca.crt --network <Apache APISIX Container Network ID> nginx:latest
```

:::note
You need to use the absolute paths for the `mtls.conf` and the certificates.
:::

:::tip
We deploy this container with the same network as the Apache APISIX container.
You can run the command below to get the network id of the Apache APISIX container.

```shell
docker inspect <Apache APISIX Container Name/ID> -f '{{ .NetworkSettings.Networks.bridge.NetworkID }}'
```

:::

Create Application
------------------

We'll create an Application with the following details in this guide.

1. The Application name is `upstream-mtls-app`.
2. The path prefix is `/v1`.
3. The HTTP Host is `umtls.httpbin.org`.
4. Set the upstream URL to the IP address of Nginx container (in our case, it's `http://172.17.0.4`). Please use the below command to get the correct IP address in your run.
5. We enable the upstream mutual TLS and fill in the SSL object ID.

:::tip
You can run the command below to fetch the container address of the nginx services.

```shell
docker inspect mtls-upstream-server --format '{{ .NetworkSettings.Networks.bridge.IPAddress }}'
```

:::

:::tip How to enable the upstream mutual TLS?

When you create the Application or when you add a new Upstream version:

2. Click on the **View Hide Advanced Upstream Options** to unfold advanced upstream options.
3. Select the **Mutual TLS** checkbox, and an API7 Cloud will show an input box to fill in the SSL object ID

![How to Enable Upstream mTLS](https://static.apiseven.com/2022/12/30/how-to-enable-upstream-mtls.png)
:::

Besides, we'll create an API inside the mtls-auth-app Application.

* The API name is `anything`.
* The path is `/anything` (exact match).
* Accepted HTTP method is `GET`.

:::tip

If you don't know how to configure an Application and API, please refer to the [Getting Started](../../getting-started)
guides first

:::

Test mTLS
---------

Let's send a request to the `anything` API via curl.

```shell
curl http://127.0.0.1:9080/v1/anything  -H 'Host: umtls.httpbin.org' -i
```

```shell
HTTP/1.1 200 OK
Content-Type: application/octet-stream
Content-Length: 13
Connection: keep-alive
Date: Thu, 09 Jun 2022 09:15:25 GMT
Server: APISIX/2.15.0

mtls upstream
```

Apache APISIX forwards the request to the backend Nginx service correctly.

See Also
--------

* [Enable Mutual TLS](./enable-mutual-tls.md)
