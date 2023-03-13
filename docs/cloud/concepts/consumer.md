---
title: What is Consumer
reading_time: auto
show_feedback: true
---

In API7 Cloud, a Consumer represents a caller of the [Service](./service.md) or
[API](./api.md), a Consumer will attach some [plugins](./plugin.md) like authentication,
throttling to limit the access.

How to Create a Consumer
------------------------

After you sign in to API7 Cloud and click on the Consumers tab
(under the API Management), API7 Cloud will redirect you to the Consumer list page
(this is the place where you can find all existing Consumers).

![Consumer List](https://static.apiseven.com/2022/12/30/consumer-list.png)

Press the **Create Consumer** button and fill out the form to create the Consumer.

![Create Consumer](https://static.apiseven.com/2022/12/30/create-consumer.png)

Three kinds of content you should fill out:

1. **Basic**, including the name and description. Note that the name of Consumer is unique
   and cannot be modified later.
2. **Credentials**, where you can create some credentials (e.g., password, API key) for this Consumer.
3. **Plugins**, where you can specify a set of plugins (such as configuring
   authentication credentials and the rate-limiting quota).

Get Consumer Details
--------------------

On the Consumer list page, search for the Consumer you want, click on the
Consumer name. API7 Cloud will redirect you to the Consumer details page.

![Consumer Details](https://static.apiseven.com/2022/12/30/consumer-detail.png)

Update a Consumer
-----------------

You can update a Consumer after you enter the Consumer details page,

Consumer information is categorized into **Basics**, **Credentials**, **Plugins**, and each of them can be edited separately.

![Update Consumer in Consumer Details Page](https://static.apiseven.com/2022/12/30/update-consumer-in-details-page.png)

Delete a Consumer
-----------------

:::danger
IT'S DANGEROUS TO DELETE A CONSUMER UNLESS YOU KNOW THIS CONSUMER IS NO
LONGER BEING USED.
:::

![Delete Consumer](https://static.apiseven.com/2022/12/30/delete-consumer.png)

Click on the trash bin icon to delete the Consumer, and API7 Cloud will ask you to write the name of the target Consumer.

![Double Check of Delete Consumer](https://static.apiseven.com/2022/12/30/delete-consumer-double-check.png)

What's Next
-----------

* Learn about [Plugin](./plugin.md).
