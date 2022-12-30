---
title: Log Format in Log Collection
reading_time: auto
show_feedback: true
---

API7 Cloud allows users to configure different log formats when they use Log Collection to satisfy variant needs. This guide
will show you the details about the log format.

Kafka Logger
------------

There are three different log formats for the Kafka Logger.

* **Default JSON Log Format**: Collect default request/response messages. You can refer to [Apache APISIX Kafka Plugin Meta Format](https://apisix.apache.org/docs/apisix/plugins/kafka-logger/#meta_format-example) to see its (`default`) fields.
* **Original Request**: Collect request messages and concatenate them in HTTP request format. You can refer to [Apache APISIX Kafka Plugin Meta Format](https://apisix.apache.org/docs/apisix/plugins/kafka-logger/#meta_format-example) to see its (`origin`) fields.
* **Custom JSON Log Format**: Users can assemble the log message (into a JSON string with at most one level hierarchy) according to their needs. Users need to write the log message template with [Variables](../../references/variables.md).

HTTP Logger
-----------

Currently, HTTP Logger doesn't support customizing the log format. It only supports the **Default JSON Log Format** (same as Kafka Logger).
