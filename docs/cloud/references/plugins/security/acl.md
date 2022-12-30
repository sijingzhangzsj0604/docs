---
title: ACL Plugin Reference
reading_time: auto
show_feedback: true
---

| Field                  | Type    | Default                      | Optional | Limitations                              | Description                                                                                             |
|------------------------|---------|------------------------------|----------|------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `Running Mode`         | string  | -                            | No       | Optional Values: `"Allow"`, `"Deny"`     | Specify the running mode.                                                                               |
| `Rejected Status Code` | integer | `403`                        | Yes      | `200` <= `Rejected Status Code` <= `599` | Specify the status code sent by [Apache APISIX](https://apisix.apache.org/) when request is rejected.   |
| `Error Message`        | string  | `The consumer is forbidden.` | Yes      |                                          | Specify the response body sent by [Apache APISIX](https://apisix.apache.org/) when request is rejected. |

## Allow Mode

| Field                     | Type           | Default   | Optional   | Limitations | Description                         |
|---------------------------|----------------|-----------|------------|-------------|-------------------------------------|
| `Allowed Consumers`       | string array   | -         | Yes        |             | Allowed Consumer list.              |
| `Allowed Consumer Labels` | string array   | -         | Yes        |             | Label list of allowed Consumers.    |

:::note

At lease one field between `Allowed Consumers` and `Allowed Consumer Labels` should be specified.

:::

## Deny Mode

| Field                    | Type         | Default | Optional | Limitations | Description                     |
|--------------------------|--------------|---------|----------|-------------|---------------------------------|
| `Denied Consumers`       | string array | -       | Yes      |             | Denied Consumer list.           |
| `Denied Consumer Labels` | string array | -       | Yes      |             | Label list of denied Consumers. |

:::note

At lease one field between `Denied Consumers` and `Denied Consumer Labels` should be specified.

:::
