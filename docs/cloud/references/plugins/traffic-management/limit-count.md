---
title: Limit Count Plugin Reference
reading_time: auto
show_feedback: true
---

| Field                  | Type    | Default | Optional | Limitations                          | Description                                                                             |
|------------------------|---------|---------|----------|--------------------------------------|-----------------------------------------------------------------------------------------|
| `Count`                | integer | -       | No       | `Count` >= 0                         | Specified number of requests can be handled in the given time period.                   |
| `Period`               | integer | -       | No       | `Period` >= 1                        | Specified time period length (in seconds).                                              |
| `Rejected Status Code` | integer | `503`   | Yes      | 200 <= `Rejected Status Code` <= 599 | The HTTP status code will be sent when the number of requests exceed the limitation.    |
| `Error Message`        | integer | -       | Yes      | Length of `Error Message` <= 65536   | The HTTP response body will be sent when the number of requests exceed the limitation.  |
