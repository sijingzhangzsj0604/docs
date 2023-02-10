---
title: Get APISIX
description: This tutorial uses a script to quickly install Apache APISIX in your local environment and verify it through the Admin API.
---

Apache APISIX is a dynamic, real-time, high-performance API Gateway, and is a top-level project of the Apache Software Foundation. 

You can use APISIX API Gateway as a traffic entrance to process all business data, including dynamic routing, dynamic upstream, dynamic certificates, A/B testing, canary release, blue-green deployment, limit rate, defense against malicious attacks, metrics, monitoring alarms, service observability, service governance, etc. 

This tutorial uses a script to quickly install [Apache APISIX](https://api7.ai/apisix) in your local environment and verify it through the Admin API. You can also use [API7 Cloud](https://api7.ai/cloud), a Cloud-host service, to manage APISIX.

## Prerequisite

The quickstart script relies on several components:

* [Docker](https://docs.docker.com/get-docker/) is used to install the containered **etcd** and **APISIX**.
* [curl](https://curl.se/) is used to send requests to APISIX for validation.

## Get APISIX

:::caution

To provide a better experience in this tutorial, the authorization of Admin API is switched off by default. Please turn on the authorization of Admin API in the production environment.

:::
        
The APISIX can be easily installed and started with the quickstart script.

```sh
curl -sL https://run.api7.ai/apisix/quickstart | sh
```

This command runs APISIX and etcd locally with Docker. APISIX uses etcd to save and synchronize configuration. Both the etcd and the APISIX use [**host**](https://docs.docker.com/network/host/) Docker network mode. That is, the APISIX can be accessed from local.

If everything is ok, you will see the following message.

```text
✔ APISIX is ready!
```


## Validate

Once APISIX is running, you can use curl to access it. Send a simple HTTP request to validate if APISIX is working properly or not.

```sh
curl "http://127.0.0.1:9080" --head | grep Server
```

If everything is ok, you will get the following response.

```text
Server: APISIX/3.1.0
```

You now have APISIX installed and running successfully!​

## Next Steps

The following tutorial is based on the working APISIX, please keep everything running and move on to the next step.

* [Configure Routes](configure-routes.md)
* [Load Balancing](load-balancing.md)
* [Rate Limiting](rate-limiting.md)
* [Key Authentication](key-authentication.md)

