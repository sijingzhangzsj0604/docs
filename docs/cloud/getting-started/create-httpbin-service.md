---
title: Create the HTTPBIN Service
reading_time: auto
show_feedback: true
---

Now it's time to learn how to create a Service. Typically, you can map a physical microservice to a Service on API7 Cloud. In this section, we'll create an HTTPBIN Service to proxy the [HTTPBIN Website](https://httpbin.org/). Let's do the following:

1. Open the [API7 Cloud console](https://console.api7.cloud).
2. From the left navigation bar, choose **API Management**, then select **Services** from the secondary manu.
3. Click on the **Create Service** button.
4. Fill the form, in this case:
   * We set the "Path Prefix" to `/v1`, which means the URI path of all the requests to this Service should start with `/v1`.
   * We set the HTTP Host to `cloud.httpbin.org`, which means all the requests to this Service should carry the Host header with the value of `cloud.httpbin.org`.
   * We set the "Upstream URL" to "https://httpbin.org", which means all the requests to this Service will be proxied to "httpbin.org".

Good job! Now that you have created the HTTPBIN Service, let's go to the next section for creating some APIs in it.

Next
----

[Create HTTPBIN API](./create-httpbin-route.md).
