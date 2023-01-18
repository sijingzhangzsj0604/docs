---
title: Release Notes
reading_time: auto
show_feedback: true
---

# 2023.01.18

This is the last release before 2023 Spring festival. This is a release without so many new features,
but with some notable changes.

### API7 Cloud

* Now the concept control plane was dropped, instead, we call it cluster
* Now we use gateway instances to replace data plane instances
* Now you can configure the "include_resp_body" in file-logger plugin
* Optimize the details in user sign up
* Fixed some known issues to enhance the developer experience

### Cloud CLI

Upgrade [Cloud CLI](https://github.com/api7/cloud-cli) to [0.25.0](https://github.com/api7/cloud-cli/releases/tag/0.25.0)

* Use the new concepts: cluster and gateway instance
* Use Cloud Go SDK to communicate with API7 Cloud

# 2023.01.05

We made some plugin refactors in this release so that plugins are consistent
with ones in Apache APISIX.

### API7 Cloud

* Now resource search is case-insensitive
* Now the gateway listening ports are shown in the console
* Now the canary release rule expression is same to the API fine-grained route control
* Rename Rate Limiting plugin to Limit Count plugin
* Rename Request Rewrite plugin to Proxy Rewrite plugin
* Refactor the plugin implementation (be consistent with Apache APISIX)
* Ask users to accept privacy and term of use before sign up
* Now the resource list column width is self-adaption
 
### [Cloud Lua Module](https://github.com/api7/cloud-scripts/tree/main/assets)

* Support uploading listening ports to API7 Cloud

## 2022.12.14

We completed the user/organization data lifecycle in this release. Now you can
deactivate your account or organization if you needs.

### API7 Cloud

* Support folding/unfolding the left sidebar
* Support deleting user account
* Support deleting organization
* Support updating certificate resource without filling the certificate and private key (e.g., update labels)
* Optimize the organization name UI

## 2022.11.28

In this release, we changed the concept policy, rename it to plugin, which is close to Apache APISIX.

### API7 Cloud

* Support API [fine-grained route control](../concepts/api.md#fine-grained-route-control)
* Support transferring organization ownership
* Support configuring custom limit key for Rate Limiting plugin
* Support searching Applications via Hosts and Path Prefix
* Rename policy to plugin
* Now the default status for a new application is published (previously it's draft)
* Fix UI issue when the Application name is Chinese
* Fix the notification hints for Application, API operations
* Fix the data loss when switching between the Static and Service Discovery tab in Upstream.

### Cloud CLI

Upgrade [Cloud CLI](https://github.com/api7/cloud-cli) to [0.22.0](https://github.com/api7/cloud-cli/releases/tag/0.22.0)

* Introduce profile-based way to support configuring/switch between multiple control planes

## 2022.11.14

We refactor the service discovery feature and support the multi-cluster K8s cluster service discovery feature!

### API7 Cloud

* Support duplicating Applications
* Support publishing/drafting an Application
* Support upstream health check (active, passive)
* `Hosts` and `Path Prefix` fields are shown in the Application table
* Now `ID`, `Create Time`, `Update Time` are shown in Consumer detail page
* Add a `Type` for certificate, so that the usage of certificate can be limited

### Cloud CLI

Upgrade [Cloud CLI](https://github.com/api7/cloud-cli) to [0.21.2](https://github.com/api7/cloud-cli/releases/tag/0.21.2).

* Now TLS certificates are saved inside a `tls/{control plane id}` sub-directory

## 2022.11.1

Now we support all Apache APISIX plugin features (based on `2.15.0`) and you can configure Policies
on Consumer, Control Plane.

### API7 Cloud

* Support configuring Policies on Control Plane and Consumer.
* Support all Apache APISIX plugin features (based on `2.15.0`).
* Now the Response Rewrite policy can clear the response body.
* Now the error message in Rate Limiting policy won't be wrapped in a JSON string.
* Optimize some error messages reported on the page.

## 2022.10.13

We fixed some known issues and add some new features to make the product easier to use.

### API7 Cloud

* Remove the restriction that the API `Path` field must start with `/`.
* Support the User Profile management.
* Support re-inviting member to an organization.
* Now an Application can configure multiple hosts.

### Cloud CLI

Upgrade [Cloud CLI](https://github.com/api7/cloud-cli) to [0.19.2](https://github.com/api7/cloud-cli/releases/tag/0.19.2).

* Add China mirrors for downloading Cloud CLI.
* Support reloading Apache APISIX on bare-metal.
* Fix the incorrect certificate permission problem.
* Update the default APISIX version to `2.15.0`.

## 2022.09.28

Now you can try the product tour on the API7 Cloud console.

### API7 Cloud

* Support product tour.
* Support organization ownership transferring.

## 2022.09.14

We add some new features for this release. Also, we carve the API7 Cloud console and optimize the texts and tooltips.

### API7 Cloud

* Support customizing the log format for HTTP Logger.
* Support specifying members' permission.
* Optimize the console UI for better UX.

## 2022.08.30

We add the control plane settings in this release so that you can control the control plane scope settings!

### API7 Cloud

* Support Response Rewrite policy.
* Support Request ID policy.
* Support Control Plane settings (e.g., log rotate, custom server name, real IP replacement).
* Support Kubernetes service discovery.

### [Cloud Lua Module](https://github.com/api7/cloud-scripts/tree/main/assets)

* Support accepting Kubernetes service discovery settings from API7 Cloud.

## 2022.08.12

We support Kafka Logger & CSRF policy in this release!

### API7 Cloud

* Support using Kafka Logger in Log Collection.
* Support CSRF policy (This is a paid feature).
* Support Redirect policy.
* Fixed some page issues and improved the user experience.

### [Cloud Lua Module](https://github.com/api7/cloud-scripts/tree/main/assets)

* Support accepting control plane settings from API7 Cloud.

## 2022.07.29

We publish the organization management, and OpenID connect auth in this release.

### API7 Cloud

* Support Organization Management (invite/remove members, RBAC).
* Support OpenID Connect authentication.
* Now, users can see their organization name in the navigation bar.
* Optimize the login page.
* Now, users can sort the data plane instances by their uptime.

### [Cloud Lua Module](https://github.com/api7/cloud-scripts/blob/main/assets/cloud_module_beta.tar.gz)

* Add the switch for uploading Prometheus metrics (by default, it's enabled).

## 2022.07.14

We publish the Basic plan and support billing & payment in this release.

### API7 Cloud

* Support Log Collection feature & Logging policy.
* Support billing & plan subscription.
* Better Data Plane Instances view.
* Fix some UI problems to improve the user experience.
* Fix some problems on the server side to improve the stability.

### Cloud CLI

Upgrade [Cloud CLI](https://github.com/api7/cloud-cli) to [0.13.0](https://github.com/api7/cloud-cli/releases/tag/0.13.0).

* Support debugging API (show the translated [Apache APISIX](https://apisix.apache.org) configurations about API).
* Support customizing the HTTP & HTTPS host port.

## 2022.06.28

We fixed some bugs and improved some existing features in this release.

### API7 Cloud

* Fix some bugs on the server-side and client-side to improve stability.
* Fix the ineffective consumer labels.
* Support using a wide variety of characters for the organization name.
* Support proxying WebSocket traffic.
* Support ACL policy.
* Support JWT policy.
* Support Request Rewrite policy.

## 2022.05.26

We fixed some bugs and added some new features in this release.

### API7 Cloud

* Optimize the status code distribution diagram.
* Refactor the way we manage policies.
* Refactor the API details page.
* Support mTLS between [Apache APISIX](https://apisix.apache.org) and clients.
* Support instance filter on the monitoring page.
* Refactor the "Add Instance" page.
* Fix some bugs on the page and improve the user experience.

### Cloud CLI

* Update the default APISIX version to `2.15.0`.
* Use `sh` compatible way in the `installer.sh`.
* Fix the wrong binary package name (show the version correctly).

## 2022.05.11

In this version, we fixed some bugs and added some improvements.

:::important
Since this release, the minimum required version of the [Apache APISIX](https://apisix.apache.org) is `2.15.0`.
:::

### API7 Cloud

* Refactored the Application Details page layout and supported editing sub-resources of the Application.
* Fixed the alert due to empty [Consumer](../concepts/consumer.md) description field.
* Fixed the minimum value of count to `1` when using the [Rate Limiting Policy](../guides/traffic-management/limit-count.md).
* Fixed the incorrect redirect port when the Application protocol is `HTTPS`.
* Fixed some bugs which hurt the stability.
* Optimized the API Reference.

### [Cloud Lua Module](https://github.com/api7/cloud-scripts/blob/main/assets/cloud_module_beta.tar.gz)

* Fixed the "bad metric timestamp" bug.
* Fixed the "client body too large" problem when uploading metrics from DP instances.

### Cloud CLI

Upgrade [Cloud CLI](https://github.com/api7/cloud-cli) to [0.9.0](https://github.com/api7/cloud-cli/releases/tag/0.9.0)

* Supported releasing windows binaries (`amd64`, `arm64`).
* Fixed the incorrect command option handling for `--helm-install-arg` and `--docker-run-arg`.
* Added an [installer.sh](https://github.com/api7/cloud-cli/blob/main/tools/installer.sh) script to install Cloud CLI quickly.

## 2022.04.02 - First Release

We released the first version of the API7 Cloud.

See the [getting-started](../getting-started) guide to use API7 Cloud now!
