---
title: How to Use Personal Access Token
reading_time: auto
show_feedback: true
---

Personal Access Token is an authentication method that allows you to access
the [API7 Cloud API](https://api7.cloud/api) without providing your
account name and password. It helps integrate API7 Cloud with your programs.

You may want to integrate API7 Cloud API with your existing application in several
cases like:

1. Integrate API7 Cloud with your CI/CD pipeline (to expose an API to API Gateway after it's released).
2. Change the [API](../../concepts/api.md) configuration after some events triggered
3. Create a new [Consumer](../../concepts/consumer.md) automatically for your users if they're allowed to
   access some of your services.

:::info

The [Cloud CLI](https://github.com/api7/cloud-cli/blob/main/docs/configuring-cloud-cli.md) relies on
Personal Access Token to communicate with API7 Cloud, and it can help
you deploy [Apache APISIX](https://apisix.apache.org).

:::

How to grant a new Personal Access Token
---------------------------------------

You can enter the Personal Access Token page on API7 Cloud by clicking on the
"Personal Access Token" button in the account drop-down box.

![Enter Personal Access Token Page](https://static.apiseven.com/2022/12/30/enter-personal-access-token-page.png)

On the Personal Access Token page, click on the **Generate a new token** button to create
a new token, you'll be asked to input the token note (optional) and the expiry time (you should
evaluate the expiry time carefully!).

:::tip
It's better to write the token note to make it easier to remember the token use.
:::

![Personal Access Token](https://static.apiseven.com/2022/12/30/personal-access-token-page.png)
![Generate a new token](https://static.apiseven.com/2022/12/30/generate-personal-access-token.png)

You'll see the token value on the Personal Access Token page, and that's the only time
you can see it on API7 Cloud, **so please save it carefully**.

![Personal Access Token Value](https://static.apiseven.com/2022/12/30/personal-access-token-value.png)

:::note Token number limitation
You can generate up to 50 tokens right now.
:::

Test the token
--------------

Now let's verify if the token works. We'll access the [/user/me](https://www.api7.cloud/api#operation/userLogin) API.

```shell
curl https://console.api7.cloud/api/v1/user/me -H 'Authorization: Bearer <PASTE YOUR TOKEN HERE>'  -i
```

You'll see your account profile in the JSON response if the token is valid.

```shell
HTTP/2 200
content-type: application/json; charset=utf-8
content-length: 417
date: Wed, 20 Apr 2022 03:54:34 GMT
server: APISIX/2.10.1
x-request-id: a607104a-f8fc-47ac-81ff-a9f32901ddf9

{"payload":{...},"status":{"code":0,"message":"OK"}}
```

How to delete a token
---------------------

You should delete the token if it's useless or even leaked. Click on
**Delete** button on the target row.

In the extreme case, you may want to delete all tokens. Such as all the tokens are not
used anymore, or even your account is suffering from identity theft. Click on the
**Delete All** button in the "Danger Zone" to go ahead.

What's Next
-----------

* [How to configure Cloud CLI](https://github.com/api7/cloud-cli/blob/main/docs/configuring-cloud-cli.md)
* [How to add Data Plane instance](../../getting-started/add-data-plane-instance.md)
