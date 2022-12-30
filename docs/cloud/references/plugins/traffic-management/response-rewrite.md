---
title: Response Rewrite Plugin Reference
reading_time: auto
show_feedback: true
---

| Field                 | Type                                | Default | Optional | Limitations                   | Description                                                                                                                                                                                             |
|-----------------------|-------------------------------------|---------|----------|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Rewrite Status Code` | integer                             | -       | Yes      | `200` <= Status Code <= `599` | Rewrite the HTTP status code.                                                                                                                                                                           |
| `Rewrite Headers`     | array of rewrite headers operations | -       | Yes      | Length >= `1`                 | Header rewrite rules.                                                                                                                                                                                   |
| `Replace Body`        | string                              | -       | Yes      |                               | Replace the HTTP response body. If the desired body is an octect stream, you can encode it into a base64 string and then pass it to API7 Cloud. In such a case, opt in the `Base64 Decode Body` option. |
| `Base64 Decode Body`  | boolean                             | -       | Yes      |                               | Whether [Apache APISIX](https://apisix.apache.org) should decode the response body (base64 format) before sending to clients.                                                                           |

Rewrite Headers
---------------

| Field       | Type     | Default  | Optional                                   | Limitations                                 | Description                |
|-------------|----------|----------|--------------------------------------------|---------------------------------------------|----------------------------|
| `Operation` | string   | -        | No                                         | Optional Values: `Add / Replace`, `Delete`. | The header operation type. |
| `Header`    | string   | -        | No                                         |                                             | The header name.           |
| `Value`     | string   | -        | Required if `Operation` is `Add /Replace`. |                                             | The header value.          |
