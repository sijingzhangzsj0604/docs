---
title: Redirect Plugin Reference
reading_time: auto
show_feedback: true
---

| Field                   | Type    | Default | Optional | Limitations                                        | Description                                        |
|-------------------------|---------|---------|----------|----------------------------------------------------|----------------------------------------------------|
| `Mode`                  | string  | -       | No       | Optional Values: `Replace`, `Regex Substitute`     | Specify the running mode.                          |
| `Encode URI`            | boolean | `false` | Yes      |                                                    | Whether encode the URI in Location header.         |
| `Append Query String`   | boolean | `false` | Yes      |                                                    | Whether append the querystring in Location header. |
| `Redirect Code`         | integer | `302`   | Yes      | Optional Values: `301`, `302`, `303`, `307`, `308` | HTTP redirection code.                             |

Replace Mode
------------

| Field         | Type    | Default | Optional | Limitations | Description                            |
|---------------|---------|---------|----------|-------------|----------------------------------------|
| `Redirect To` | string  | -       | No       |             | The redirection URL (Location header). |

Regex Substitute Mode
---------------------

| Field           | Type     | Default | Optional | Limitations | Description                                                                                                                                                 |
|-----------------|----------|---------|----------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Match Pattern` | string   | -       | No       |             | Match pattern for the current API URL. Note if the API doesn't match the pattern, the redirection won't happen.                                             |
| `Substitution`  | string   | -       | No       |             | The new URL (Location header) construction template. Users can use regex capture group (e.g., `$1`) to reference some match parts from the `Match Pattern`. |
