---
title: Authentication
reading_time: auto
show_feedback: true
---

Besides the original Apache APISIX authentication plugins, API7 Cloud
also provides another authentication plugin, which integrates five auth
methods and provides a well-designed UI form.

You can visit the following docs to learn how to use each auth method in this plugin.

* [Basic Auth](./basic-auth.md)
* [Key Auth](./key-auth.md)
* [HMAC Auth](./hmac-auth.md)
* [JWT Auth](./jwt-auth.md)
* [OpenID Connect Auth](./openid-connect.md)

:::tip
Note that you can simultaneously use this authentication plugin with the original Apache APISIX
authentication plugins. In such a case, your API requests must
pass all verifications of these plugins, or the gateway will reject them.
:::
