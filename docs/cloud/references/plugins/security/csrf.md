---
title: CSRF Plugin Reference
reading_time: auto
show_feedback: true
---

| Field        | Type    | Default             | Optional  | Limitations | Description                                                                              |
|--------------|---------|---------------------|-----------|-------------|------------------------------------------------------------------------------------------|
| `Secret`     | string  |                     | No        | Length >= 1 | Secret used to generate CSRF token.                                                      |
| `Token Name` | string  | `apisix-csrf-token` | Yes       |             | CSRF token name.                                                                         |
| `TTL`        | integer | 7200                | Yes       | `TTL` >= 0  | Expiration time in seconds of the CSRF token. Set to 0 to skip checking expiration time. |
