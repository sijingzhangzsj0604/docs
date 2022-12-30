---
title: Create API for HTTPBIN Application
reading_time: auto
show_feedback: true
---

Now we have created the HTTPBIN Application successfully, specifying the upstream URL. But we don't have any API endpoints.

In this section, we'll create an API endpoint that returns a JSON string from https://httpbin.org.

Enter the HTTPBIN Application detail page, and click on the **Create API** button.

![http app detail](https://static.apiseven.com/2022/12/30/httpbin-app-detail.png)

API7 Cloud will open a popup window, filling in the API details.

![create http json api](https://static.apiseven.com/2022/12/30/create-httpbin-json-api.png)

Click on the **Create** button, API7 Cloud will create the API.

Now you have created the JSON API. Some contents you should know are:

1. We set the API "Path" to `/json`, and we click the "Strip Path Prefix" option, which means the `/v1/json` will be rewritten to "/json" before proxying to the backend;
2. Only the `GET` method is allowed;

Congratulations! You have created the JSON API. Now, let's send some requests to verify if it works!

Next
----

[Send Requests To Verify](./send-requests-to-verify.md).
