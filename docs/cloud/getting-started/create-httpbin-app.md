---
title: Create the HTTPBIN Application
reading_time: auto
show_feedback: true
---

Now it's time to learn how to create an Application. Typically, you can map a physical microservice to an Application on API7 Cloud. In this section, we'll create an HTTPBIN Application to proxy the [HTTPBIN Website](https://httpbin.org/).

Click on the API Management field in the sidebar and choose the "Applications" option. You'll enter the Application list page.

![app list](https://static.apiseven.com/2022/12/30/enter-application-list.png)

Then let's click on the "Create Application" button. You'll see a pop-up window where you can create the new Application.

![create app](https://static.apiseven.com/2022/12/30/create-httpbin-app.png)

Click on the **Create** button to create this Application.

Now you have created the HTTPBIN application. Some contents you should know are:

1. We set the "Path Prefix" to `/v1`, which means the URI path of all the requests to this Application should start with `/v1`.
2. We set the HTTP Host to `cloud.httpbin.org`, which means all the requests to this Application should carry the Host header with the value of `cloud.httpbin.org`.
3. We set the "Upstream URL" to "https://httpbin.org", which means all the requests to this Application will be proxied to "httpbin.org".

Good job! Now that you have created the HTTPBIN Application, let's go to the next section for creating some APIs in it.

Next
----

[Create HTTPBIN API](./create-httpbin-api.md).
