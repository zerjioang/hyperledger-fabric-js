FROM lyft/envoy:latest

ENV CLUSTERNAME samplecluster
ENV SERVICENAME sample1
ENV SOURCE_CONFIG envoy.json
ENV CONFIG_FILE_PATH /etc/envoy.json

RUN apt-get update
COPY $SOURCE_CONFIG $CONFIG_FILE_PATH

# admin console at: http://$dockerip:9901/
EXPOSE 9901 10000

CMD /usr/local/bin/envoy -c $CONFIG_FILE_PATH --service-cluster $CLUSTERNAME --service-node $SERVICENAME