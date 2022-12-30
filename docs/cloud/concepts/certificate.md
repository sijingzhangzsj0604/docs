---
title: What is Certificate
reading_time: auto
show_feedback: true
---

In API7 Cloud, a Certificate object is a TLS bundle that contains:

1. A X.509 v3 digital certificate;
2. A private key;
3. A Client CA Certificate (Optional) is used to verify the client's
   certificate in a TLS handshake.

How API7 Cloud Uses Certificate
-------------------------------

In API7 Cloud, [Applications](./application.md) use Certificate objects, but the
binding relationship is not explicit. It relies on the [TLS Server Name Indication](
https://en.wikipedia.org/wiki/Server_Name_Indication) to choose the most matched certificate.
So if you want to use a Certificate for an Application, please make sure the Application host
is in the certificate's SAN list.

> Q: What if I have multiple certificates for the same Application
> since their SAN lists are interlaced?
>
> A: In such a case, it depends on the strategy of the data plane (Apache APISIX)
> to choose the certificate in a TLS handshake. But it doesn't matter
> as the certificate is regular (e.g., not expired and not revoked).
> If you're interested in it, see [Apache APISIX Router RadixTree](https://apisix.apache.org/docs/apisix/router-radixtree)
> to learn the details.

:::danger
If you use HTTPS protocol for an Application but don't configure a corresponding Certificate,
the TLS handshake for API requests will fail.
:::

How to Upload a Certificate
---------------------------

After you sign in to API7 Cloud and click on the Certificates tab
(under the API Management), API7 Cloud will redirect you to the Certificate list page
(this is where you can find all existing Certificate objects).

![Enter Certificate List](https://static.apiseven.com/2022/12/30/enter-certificate-list.png)

Press the **Upload Certificate** button and fill out the form to upload the certificate.
You'll have two ways to upload a certificate: pasting from the clipboard or uploading files.
Choose the way which is better for you.

![Upload Certificate](https://static.apiseven.com/2022/12/30/upload-certificate.png)

Please note when you upload a certificate, you need to select the certificate type, which indicates the usage of this certificate.

* A server-type certificate is used by clients to verify Apache APISIX.
* A client-type certificate is used by Apache APISIX to verify the upstream.

API7 Cloud will check if the type you filled is correct by checking the `X509v3 Extended Key Usage` extensions in the certificate.

:::tip
If this extension is missing from your certificate, then API7 Cloud won't apply this check.
:::

After you upload the certificate, API7 Cloud will redirect you to the Certificate list page. The certificate you just uploaded is in the first row of the list.

:::tip

Applications associate with the Certificate will have a prompt in their details page.

![Certificate Association Prompt](https://static.apiseven.com/2022/12/30/certificate-association-prompt.png)

:::

How to Get the Certificate Details
----------------------------------

On the Certificate list page, click on the Certificate ID to enter the
Certificate details page. Some kinds of Certificate information will be there:

1. Certificate subject.
2. available Certificate period.
3. Certificate issuer.
4. Certificate extensions (like the SAN list).

:::info
You won't see the private key on the details page.
:::

How to Update a Certificate
---------------------------

:::danger
IT'S DANGEROUS TO UPDATE A CERTIFICATE, SO PLEASE MAKE SURE YOU UNDERSTAND
THE PURPOSE OF THE UPDATE.
:::

On the Certificate details page, scroll down to the Danger Zone, and click on the **Update Certificate**
button. API7 Cloud will ask you to input the Certificate ID before updating the certificate.

![Double Check of Update Certificate](https://static.apiseven.com/2022/12/30/update-certificate-double-check.png)

Then you can re-upload the certificate (pasting from the clipboard or uploading files).

Delete a Certificate
--------------------

:::danger
IT'S DANGEROUS TO DELETE AN API, SO PLEASE MAKE SURE YOU NO LONGER USE THIS CERTIFICATE.
:::

On the Certificate details page, scroll down to the Danger Zone, and click on the **Delete Certificate**
button. API7 Cloud will ask you to input the Certificate ID before deleting it.

![Double Check of Delete Certificate](https://static.apiseven.com/2022/12/30/delete-certificate-double-check.png)

Enable Mutual TLS
-----------------

Mutual TLS, aka mTLS, is a way for [mutual authentication](https://en.wikipedia.org/wiki/Mutual_authentication).
The client will be asked to provide a digital certificate in a TLS handshake as its identifier. The server will verify if
this client is an authorized entity and decides to go ahead or reject the connection.

API7 Cloud allows users to configure a Certificate with mTLS. In such a case, you need to upload another CA certificate,
Apache APISIX will use the CA certificate in two scenarios:

* When this is a client-type certificate, Apache APISIX will use the CA certificate to verify the upstream certificate in a TLS handshake.
* When this is a server-type certificate, Apache APISIX will use the CA certificate to verify the client certificate in a TLS handshake.

![Upload Certificate with Client Auth](https://static.apiseven.com/2022/12/30/upload-certificate-with-peer-auth.png)
