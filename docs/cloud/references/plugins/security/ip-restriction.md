---
title: IP Restriction Plugin Reference
reading_time: auto
show_feedback: true
---

| Field          | Type   | Default | Optional | Limitations                            | Description               |
|----------------|--------|---------|----------|----------------------------------------|---------------------------|
| `Running Mode` | string | -       | No       | Optional Values: `"Allow"`, `"Deny"`   | Specify the running mode. |

## Allow Mode

| Field                                       | Type         | Default                            | Optional | Limitations | Description                                                                                                                                                                |
|---------------------------------------------|--------------|------------------------------------|----------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Allowed Client IP Addresses & CIDR Ranges` | string array | -                                  | No       | Length >= 1 | Allowed IP addresses or [CIDR Ranges](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#:~:text=CIDR%20is%20also%20used%20for,of%20bits%20in%20the%20address.). |
| `Error Message`                             | string       | `"Your IP address is not allowed"` | Yes      |             | Error message returned when the request is blocked.                                                                                                                        |

## Deny Mode

| Field                                      | Type           | Default                               | Optional | Limitations | Description                                                                                                                                                               |
|--------------------------------------------|----------------|---------------------------------------|----------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Denied Client IP Addresses & CIDR Ranges` | string array   | -                                     | No       | Length >= 1 | Denied IP addresses or [CIDR Ranges](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#:~:text=CIDR%20is%20also%20used%20for,of%20bits%20in%20the%20address.). |
| `Error Message`                            | string         | `"Your IP address is not allowed"`    | Yes      |             | Error message returned when the request is blocked.                                                                                                                       |
