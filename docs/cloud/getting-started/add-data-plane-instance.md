---
title: Add a Data Plane Instance
reading_time: auto
show_feedback: true
---

The first and most important thing that you need to do after signing up is to add a data plane instance ([Apache APISIX](https://apisix.apache.org/)) and let it connect to API7 Cloud.

As a demo, we'll use [Cloud CLI](https://github.com/api7/cloud-cli) to deploy an APISIX instance on Docker, so before you go ahead, make sure:

1. [Docker](https://www.docker.com/) is installed on your machine.
2. Your machine is connected to the Internet.

:::tip
See the guide [How to Deploy Apache APISIX](../guides/product/how-to-deploy-apache-apisix.md) if you want to learn more details.
:::

First, please refer to [Cloud CLI Installation](https://github.com/api7/cloud-cli/blob/main/docs/installation.md) to install the Cloud CLI.

After installing Cloud CLI, please log in to API7 Cloud and create a Personal Access Token. You can enter the Personal Access Token page on API7 Cloud by clicking on the "Personal Access Token" button in the account drop-down box.

![Enter Personal Access Token Page](https://static.apiseven.com/2022/12/30/enter-personal-access-token-page.png)

Then click on the "Generate a new token" button.

![Personal Access Token](https://static.apiseven.com/2022/12/30/personal-access-token-page.png)

After you click on it, API7 Cloud will show a popup window, and you need to fill in the token notes (what's this token for?) and the expiration time (how long will this token be valid?).

![Generate a new token](https://static.apiseven.com/2022/12/30/generate-personal-access-token.png)

Click on the "Create Token" button. API7 Cloud will redirect you to the Personal Access Token page, and your new token will be there.

![Personal Access Token Value](https://static.apiseven.com/2022/12/30/personal-access-token-value.png)

:::warning
As API7 Cloud prompts, you have only one chance to see the token, so please make sure you save it correctly!
:::

Copy the token from the page and configure it for Cloud CLI by running the following command:

```shell
cloud-cli configure
```

It'll prompt you to enter the token.

Now let's try to deploy an APISIX instance on Docker.

```shell
cloud-cli deploy docker  \
  --apisix-image apache/apisix:2.15.0-centos \
  --name my-apisix \
  --docker-run-arg --detach \
  --docker-run-arg --rm
```

You'll see the output below if the deployment was successful.
The Container ID and APISIX ID might differ due to the random generation mechanism.

```shell  
Congratulations! Your APISIX instance was deployed successfully
Container ID: 0904c39c2551
APISIX ID: 19cb8b57-6436-40bd-8dc2-d3571a356b86
```

And now, let's check the Data Plane Instances table, and you'll see the APISIX instance you just deployed.

![APISIX instance on the table](https://static.apiseven.com/2022/12/30/see-apisix-instance-on-table.png)

If you want to stop the APISIX instance, just run the command below:

```shell
cloud-cli stop docker --name my-apisix
```

Well done! You've just deployed an APISIX instance on Docker; it'll receive the configurations from API7 Cloud and report the status to API7 Cloud. Now, let's try to create an Application on API7 Cloud to drive your APISIX instance.

Next
----

[Create the HTTPBIN Application](./create-httpbin-app.md).
