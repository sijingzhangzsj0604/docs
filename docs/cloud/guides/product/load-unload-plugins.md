---
title: Load/Unload Plugins
reading_time: auto
show_feedback: true
---

Although you can configure all [Apache APISIX](https://docs.api7.ai/apisix/getting-started) plugins on API7 Cloud,
not all of them are loaded by default. Only after loading a plugin can you configure it on [cluster](../../concepts/cluster.md),
[service](../../concepts/service.md), [route](../../concepts/route.md), and [consumer](../../concepts/consumer.md). On
the other hand, you can also unload a plugin. Once you unload a plugin, you cannot use it anywhere.

On API7 Cloud, the plugin load/unload operations are provided in **Cluster > Plugin Management**.

![Load Plugin](https://static.apiseven.com/uploads/2023/02/09/DQmIwRve_Screenshot%202023-02-09%20at%2014.04.55.png)

Some plugins have metadata that can be edited when you load this plugin. In the above example, you can
edit the log format for the File Logger plugin. You can also edit a loaded plugin's metadata at any time.

Sometimes you may want to unload a plugin so it cannot be used anymore (e.g., this plugin causes critical performance
degradation). In this case, click on the trash bin icon in the **Plugin Management** table. Before you unload it, API7
Cloud will check the plugin use to ensure you don't use it anywhere.

![Unload Plugin with Reference Check](https://static.apiseven.com/uploads/2023/02/09/KKBWP09S_Screenshot%202023-02-09%20at%2014.25.27.png)

After you remove the plugin used in all places, you can unload the plugin successfully.

![Unload Plugin in Progress](https://static.apiseven.com/uploads/2023/02/09/hwb1sB7C_unload-plugin-in-progress.png)

:::tip
An unloaded plugin won't appear in the list when you want to add plugins for the cluster, service, route, or consumer.
:::
