---
title: Get APISIX Ingress controller
description: This tutorial uses Helm to quickly deploy Apache APISIX Ingress controller to your Kubernetes Cluster.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Apache APISIX Ingress Controller is a cloud-native API gateway that allows you to manage and control HTTP and HTTPS traffic between clients and services.
In this guide, we'll walk you through the steps to install and configure Apache APISIX Ingress Controller on a Kubernetes cluster.

## Prerequisites

Before you begin, you need to have the following prerequisites:

* A running [Kubernetes](https://kubernetes.io/) cluster (version 1.16 or higher)
* [kubectl](https://kubernetes.io/docs/tasks/tools/) command-line tool installed and configured to communicate with your Kubernetes cluster
* [Helm](https://helm.sh/docs/intro/install/) CLI installed


## Install Apache APISIX Ingress Controller

To install Apache APISIX Ingress Controller on your Kubernetes cluster, follow these steps:

```bash
$ helm repo add apisix https://charts.apiseven.com
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm repo update
$ helm install apisix apisix/apisix --namespace apisix --create-namespace \
    --set ingress-controller.enabled=true \
    --set ingress-controller.config.apisix.serviceNamespace=apisix \
    --set ingress-controller.config.apisix.serviceName=apisix-admin \
    --set ingress-controller.config.kubernetes.enableGatewayAPI=true \
    --set ingress-controller.config.ingressPublishService="apisix/apisix-gateway"
```

These commands install Apache APISIX Ingress Controller on your Kubernetes cluster with the default configuration.


## Verify the Installation

To verify that Apache APISIX Ingress Controller is installed and running correctly, follow these steps:

1. Check the status of the pods:

```bash
$ kubectl -n apisix get pods 
NAME                                         READY   STATUS    RESTARTS   AGE
apisix-etcd-1                                1/1     Running   0          6m
apisix-etcd-2                                1/1     Running   0          6m
apisix-etcd-0                                1/1     Running   0          6m
apisix-7744bb457f-lnqjb                      1/1     Running   0          6m
apisix-ingress-controller-86c5c9688d-hnnhq   1/1     Running   0          6m
```

2. Check the status of the services:

```bash
➜  ~ kubectl -n apisix get svc
NAME                        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)             AGE
apisix-etcd-headless        ClusterIP   None            <none>        2379/TCP,2380/TCP   6m
apisix-etcd                 ClusterIP   10.43.146.104   <none>        2379/TCP,2380/TCP   6m
apisix-ingress-controller   ClusterIP   10.43.178.43    <none>        80/TCP              6m
apisix-admin                ClusterIP   10.43.195.36    <none>        9180/TCP            6m
apisix-gateway              NodePort    10.43.95.209    <none>        80:32379/TCP        6m
```


## Configure Apache APISIX Ingress Controller



<Tabs
groupId="resources"
defaultValue="apisix"
values={[
{label: 'APISIX Ingress custom resource', value: 'apisix'},
{label: 'Kubernetes ingress resource', value: 'kubernetes'},
]}>

<TabItem value="apisix">

```yaml title="httpbin-route.yaml"
apiVersion: apisix.apache.org/v2
kind: ApisixRoute
metadata:
  name: httpbin-route
spec:
  http:
    - name: route-1
      match:
        hosts:
          - local.httpbin.org
        paths:
          - /*
      backends:
        - serviceName: httpbin
          servicePort: 80
```

</TabItem>

<TabItem value="kubernetes">

```yaml title="httpbin-route.yaml"
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: httpbin-route
spec:
  ingressClassName: apisix
  rules:
    - host: local.httpbin.org
      http:
        paths:
          - backend:
              service:
                name: httpbin
                port:
                  number: 80
            path: /
            pathType: Prefix
```

</TabItem>
</Tabs>

APISIX ingress controller defines the CRDs [ApisixRoute](./concepts/apisix_route.md), [ApisixUpstream](./concepts/apisix_upstream.md), [ApisixTls](concepts/apisix_tls.md), and [ApisixClusterConfig](concepts/apisix_cluster_config.md).

APISIX also supports [service discovery](https://apisix.apache.org/docs/apisix/next/discovery/kubernetes/) through [Kubernetes service](https://kubernetes.io/docs/concepts/services-networking/service/) abstraction.

![scene](../../assets/images/scene.png)

See [Design](./design.md) to learn more about how APISIX ingress controller works under the hood.

## Features

To summarize, APISIX ingress controller has the following features:

- Declarative configuration with CRDs.
- Fully dynamic configuration.
- Supports native Kubernetes Ingress resource (both v1 and v1beta1).
- Supports service discovery through Kubernetes Service.
- Out-of-the-box node health check support.
- Supports load balancing based on pods (Upstream nodes).
- Rich [Plugins](https://apisix.apache.org/docs/apisix/next/plugins/batch-requests/) with [custom Plugin](https://apisix.apache.org/docs/apisix/next/plugin-develop/) support.

## Get involved

You can contribute to the development of APISIX ingress controller. See [Development guide](./contribute.md) for instructions on setting up the project locally.

See the [Contribute to APISIX](https://apisix.apache.org/docs/general/contributor-guide/) section for details on the contributing flow.
