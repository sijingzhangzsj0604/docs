---
title: Fault Injection Plugin Reference
reading_time: auto
show_feedback: true
---

| Field        | Type     | Default | Optional | Limitations                                           | Description                               |
|--------------|----------|---------|----------|-------------------------------------------------------|-------------------------------------------|
| `Run Mode`   | string   | -       | No       | Optional Values: `"Abort Request"`, `"Delay Request"` | Specify the running mode.                 |
 | `Percentage` | integer  | -       | No       | `0` <= `Percentage` <= `100`                          | Specify the request ratio to be injected. |

## Abort Request Mode

| Field                         | Type    | Default                            | Optional | Limitations                                   | Description                                                   |
|-------------------------------|---------|------------------------------------|----------|-----------------------------------------------|---------------------------------------------------------------|
| `Injected HTTP Status Code`   | integer | -                                  | No       | `200` <= `Injected HTTP Status Code` <= `599` | Status code returned when the fault injection is effective.   |
| `Injected HTTP Response Body` | integer | -                                  | No       | Length > `0`                                  | Response body returned when the fault injection is effective. |

## Delay Request Mode

| Field            | Type      | Default                               | Optional | Limitations           | Description                                             |
|------------------|-----------|---------------------------------------|----------|-----------------------|---------------------------------------------------------|
| `Delay Duration` | integer   | -                                     | No       | `Delay Duration` >= 0 | How long will the request be delayed (in milliseconds). |
