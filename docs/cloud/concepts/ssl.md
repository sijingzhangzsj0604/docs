---
title: What is SSL
reading_time: auto
show_feedback: true
---

In API7 Cloud, an SSL object is a TLS bundle that contains:

1. A X.509 v3 digital certificate;
2. A private key;
3. A Client CA Certificate (Optional) is used to verify the client's
   certificate in a TLS handshake.

How API7 Cloud Uses SSL
-----------------------

In API7 Cloud, [service](./service.md) use SSL objects, but the
binding relationship is not explicit. It relies on the [TLS Server Name Indication](
https://en.wikipedia.org/wiki/Server_Name_Indication) to choose the most matched SSL object.
So if you want to use an SSL object for an Service, please make sure the Service host
is in the certificate's SAN list.

> Q: What if I have multiple SSL objects for the same Service
> since their SAN lists are interlaced?
>
> A: In such a case, it depends on the strategy of the gateway instance (Apache APISIX)
> to choose the TLS certificate in a TLS handshake. But it doesn't matter
> as the certificate is regular (e.g., not expired and not revoked).
> If you're interested in it, see [Apache APISIX Router RadixTree](https://apisix.apache.org/docs/apisix/router-radixtree)
> to learn the details.

:::danger
If you use HTTPS protocol for a Service but don't configure a corresponding Certificate,
the TLS handshake for API requests will fail.
:::

How to Create SSL Object
------------------------

To create a new SSL object, do the following:

1. Open the [API7 Cloud console](https://console.api7.cloud).
2. From the left navigation bar, choose **API Management**, then select **SSL** from the secondary manu.
3. Click on the **Create SSL** button.
4. Fill in the form
   * For uploading the TLS certificate and private key, you can either upload from files or paste from the clipboard.
   * You need to decide the SSL object type, which indicates the usage of this certificate.

     **Note**: API7 Cloud will check if the type you filled is correct by checking the `X509v3 Extended Key Usage` extensions in the TLS certificate.
     * A `Server` type SSL object is used by clients to verify Apache APISIX.
     * A `Client` type SSL object is used by Apache APISIX to verify the upstream.
   * You can enable the `Peer Authentication` by uploading an CA certificate to achieve mTLS.
     * If you create a `Server` type SSL object, `Peer Authentication` indicates clients should provide their TLS certificate.
     * If you create `Client` type SSL object, `Peer Authentication` indicates Apache APISIX will validate the upstream TLS certificate.

:::tip
If this extension is missing from your certificate, then API7 Cloud won't apply this check.
:::

How to Get the SSL Object Details
----------------------------------

To see the SSL object details, do the following:

1. Open the [API7 Cloud console](https://console.api7.cloud).
2. From the left navigation bar, choose **API Management**, then select **SSL** from the secondary manu.
3. Click on the SSL object `ID` from the list. You'll be redirected to the SSL object details page.

:::info
You won't see the private key on the details page.
:::

How to Update an SSL object
----------------------------

:::danger
IT'S DANGEROUS TO UPDATE THE SSL OBJECT. SO PLEASE MAKE SURE YOU UNDERSTAND
THE PURPOSE OF THE UPDATE.
:::

To update the SSL object, do the following:

1. Enter the SSL object details via the steps shown in [How to Get the SSL Object Details](#how-to-get-the-ssl-object-details).
2. Scroll down and click on the **Update SSL** button.
3. Fill in the form. The form is same as the one you seen in [How to Create SSL Object](#how-to-create-ssl-object).

How to Delete an SSL Object
---------------------------

:::danger
IT'S DANGEROUS TO DELETE AN SSL OBJECT, SO PLEASE MAKE SURE YOU NO LONGER USE IT.
:::

To delete an SSL object, do the following:

1. Enter the SSL object details via the steps shown in [How to Get the SSL Object Details](#how-to-get-the-ssl-object-details).
2. Scroll down and click on the **Delete SSL** button.
3. Fill in the SSL object ID to double confirm the delete operation.
