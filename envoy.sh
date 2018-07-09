#!/bin/bash
cd "$(dirname "$0")"
docker pull envoyproxy/envoy:latest
docker run --rm -d -p 10000:10000 envoyproxy/envoy:latest
curl -v localhost:10000