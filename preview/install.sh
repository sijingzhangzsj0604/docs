#!/usr/bin/env bash
API7_AI_IMAGE_REPOSITORY="api7ai.azurecr.io/api7-docs"
API7_AI_IMAGE_TAG=${ID}
API7_AI_HOST="api7-docs-${ID}.preview.api7.ai"

helm upgrade api7-docs-${ID} "./preview/api7-docs" \
  --install \
  --namespace "api7-docs" \
  --set image.repository="${API7_AI_IMAGE_REPOSITORY}" \
  --set image.tag="${API7_AI_IMAGE_TAG}" \
  --set imagePullSecrets[0].name="api7ai" \
  --set image.pullPolicy="Always" \
  --set service.port=3000 \
  --set ingress.enabled=true \
  --set ingress.hosts[0].host=${API7_AI_HOST} \
  --set ingress.hosts[0].paths[0].path=/ \
  --set ingress.hosts[0].paths[0].pathType=Prefix \
  --set ingress.tls[0].secretName=preview-api7ai-tls \
  --set ingress.tls[0].hosts[0]=*.preview.api7.ai \
  --set "ingress.annotations.kubernetes\.io/ingress\.class=addon-http-application-routing"

