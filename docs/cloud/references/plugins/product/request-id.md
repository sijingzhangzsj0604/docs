---
title: Request ID Plugin Reference
reading_time: auto
show_feedback: true
---

| Field                 | Type    | Default        | Optional | Limitations             | Description                                            |
|-----------------------|---------|----------------|----------|-------------------------|--------------------------------------------------------|
| `Header Name`         | string  | `X-Request-ID` | Yes      |                         | Specify the request ID header.                         |
| `Include in Response` | boolean | `false`        | Yes      |                         | Whether the request ID should also in response header. |
| `Algorithm`           | string  | `UUID`         | Yes      | Optional values: `UUID` | ID generation algorithm.                               |
