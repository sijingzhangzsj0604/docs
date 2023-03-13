---
title: Kubernetes Service Discovery
reading_time: auto
show_feedback: true
---

The service discovery mechanism allows you to dynamically discover the endpoints for target services. With the
help of it, you don't have to hard code the service endpoints in advance, which is static and inappropriate
when you adopt containerized infrastructures like Kubernetes (lifetime of service instances are ephemeral).
Thus the API Gateway needs to support kinds of service discovery mechanisms.

This guide will tell you how to configure and use the Kubernetes service discovery on API7 Cloud. The Kubernetes
service discovery module of Apache APISIX watches [Endpoints](https://kubernetes.io/docs/concepts/services-networking/service/)
objects in the Kubernetes cluster and, save them in the memory, query them before Apache APISIX forwards the API request to
the backend.

Prepare the Environment
-----------------------

### Deploy Apache APISIX

Please refer to [How to Deploy Apache APISIX](../../product/how-to-deploy-apache-apisix.md) to learn how to deploy
Apache APISIX and connect it to API7 Cloud. In this guide, we'll deploy an Apache APISIX instance on Kubernetes (the namespace is `apisix`).

### Deploy Backend Service

We deploy an HTTPBIN service in the `apisix` namespace.

```shell
kubectl run httpbin --image kennethreitz/httpbin --port 80 -n apisix
kubectl expose pod/httpbin --port 80 -n apisix
```

### Create Service Account

Permission of the default service account token is not sufficient for watching the
Endpoints objects. We create a custom one with the following definitions.

```yaml
# rbac.yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: apisix-k8s-sd-watcher
rules:
  - apiGroups: [""]
    resources: ["endpoints"]
    verbs: ["list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: apisix-k8s-sd-watcher-binding
subjects:
  - kind: ServiceAccount
    name: apisix-k8s-sd-sa
    namespace: apisix
roleRef:
  kind: ClusterRole
  name: apisix-k8s-sd-watcher
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: apisix-k8s-sd-sa
  namespace: apisix
```

Apply them and fetch the token from the secret.

```shell
kubectl apply -f rbac.yaml
SECRET_NAME=`kubectl get sa -n apisix apisix-k8s-sd-sa -ojsonpath='{.secrets[0].name}'`
kubectl get secrets $SECRET_NAME -n apisix -ojsonpath='{.data.token}' | base64 -d
```

### Create Kubernetes Service Registry

First, let's create a Kubernetes-type service registry on API7 Cloud.

1. Click on the **Cluster** option in the left sidebar to enter the cluster settings page
2. Scroll down the page and click on the **Add Registry** button
3. Fill in the service registry form

![CP Enable K8s SD](https://static.apiseven.com/uploads/2023/01/12/X0WsJXGJ_cluster-enable-k8s-sd.png)
![CP Fill K8s SD Form](https://static.apiseven.com/2022/12/30/cp-fill-k8s-service-registry-form.png)

In this case:

* The Registry Name field is `my-k8s-cluster`
* The Kubernetes API Server address is `https://kubernetes.default:443`
* We fill the token value fetched from the last section
* Only namespaces whose name matches the regex pattern `apisix` will be watched

You can adjust the settings according to your real cases.

### Create Service and API

We'll create a Service with the following details in this guide.

1. The Service name is `sd-app`
2. The path prefix is `/v1`
3. The HTTP Host is `sd.httpbin.org`
4. Select **service Discovery** when filling the upstream
   * The registry type is `Kubernetes`
   * The service registry name is `my-k8s-cluster`, which we just created
   * the service namespace is `apisix`
   * The service name is `httpbin`
   * the port is `80` (note this is the service port, instead of the container port)

![K8s Service Discovery Upstream](https://static.apiseven.com/2022/12/30/k8s-sd-upstream.png)

Besides, we'll create an API inside the `sd-app` Service.

1. The API name is `anything`.
2. The path is `/anything` (prefix match), and strip the path prefix.
3. It accepts all HTTP methods.

Send Request
------------

You may need to wait for a while after you enable the Kubernetes service discovery. Then let's send a request,
since we don't expose the Apache APISIX service, we'll forward the port to local.

```shell
kubectl port-forward -n apisix svc/apisix-gateway 9080:80
```

```shell
curl http://127.0.0.1:9080/v1/anything -H 'Host: sd.httpbin.org' -i
```

```shell
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 319
Connection: keep-alive
Date: Thu, 01 Sep 2022 07:07:43 GMT
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Server: APISIX/2.15.0
X-APISIX-Upstream-Status: 200

{
  "args": {},
  "data": "",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Host": "sd.httpbin.org",
    "User-Agent": "curl/7.76.1",
    "X-Forwarded-Host": "sd.httpbin.org"
  },
  "json": null,
  "method": "GET",
  "origin": "127.0.0.1",
  "url": "http://sd.httpbin.org/anything"
}
```

The API request is forwarded to the HTTPBIN service, which means the service discovery takes effect.

:::important
If you disable the Kubernetes service discovery, API requests to Service that use service discovery upstream will fail,
and Apache APISIX will return `503`. So be careful when you want to disable the Kubernetes service discovery.
:::

See Also
--------

* [Apache APISIX Kubernetes Service Discovery Module](https://apisix.apache.org/docs/apisix/discovery/kubernetes/)
