---
title: Proxy Rewrite Plugin Reference
reading_time: auto
show_feedback: true
---

| Field                 | Type                                | Default | Optional | Limitations                                                                                     | Description                         |
|-----------------------|-------------------------------------|---------|----------|-------------------------------------------------------------------------------------------------|-------------------------------------|
| `Rewrite HTTP Method` | string                              | -       | Yes      | Optional Values: `GET`, `POST`, `HEAD`, `PUT`, `DELETE`, `CONNECT`, `OPTIONS`, `TRACE`, `PATCH` | Specify how to rewrite HTTP method. |
 | `Request URI Mode`    | array of rewrite headers operations | -       | Yes      | Length >= `1`                                                                                   | Header rewrite rules.               |

Request URI Mode
----------------

### Regex Replace

| Field           | Type     | Default | Optional | Limitations                   | Description                                                                                                                                                                             |
|-----------------|----------|---------|----------|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Regex Pattern` | string   | -       | No       | Valid PCRE regular expression | Specify the regex pattern that the original request URI should match.                                                                                                                   |
| `New URI`       | string   | -       | No       |                               | The New Request URI pattern (can contain [capture group](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges) from the `Regex Pattern`. |

### Replace

| Field           | Type     | Default  | Optional | Limitations                   | Description          |
|-----------------|----------|----------|----------|-------------------------------|----------------------|
| `New URI`       | string   | -        | No       |                               | The New Request URI. |

Rewrite Headers
---------------

| Field       | Type     | Default  | Optional                                   | Limitations                                 | Description                |
|-------------|----------|----------|--------------------------------------------|---------------------------------------------|----------------------------|
| `Operation` | string   | -        | No                                         | Optional Values: `Add / Replace`, `Delete`. | The header operation type. |
| `Header`    | string   | -        | No                                         |                                             | The header name.           |
| `Value`     | string   | -        | Required if `Operation` is `Add /Replace`. |                                             | The header value.          |
