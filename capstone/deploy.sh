echo 'Initializing deploy'

docker build -t denyslins/udacity-react-multi-client:latest -t denyslins/udacity-react-multi-client:$GIT_SHA -f ./client/Dockerfile.dev ./client
docker build -t denyslins/udacity-react-multi-server:latest -t denyslins/udacity-react-multi-server:$GIT_SHA -f ./server/Dockerfile.dev ./server
docker build -t denyslins/udacity-react-multi-worker:latest -t denyslins/udacity-react-multi-worker:$GIT_SHA -f ./worker/Dockerfile.dev ./worker

docker push denyslins/udacity-react-multi-client:latest
docker push denyslins/udacity-react-multi-client:$GIT_SHA
docker push denyslins/udacity-react-multi-server:latest
docker push denyslins/udacity-react-multi-server:$GIT_SHA
docker push denyslins/udacity-react-multi-worker:latest
docker push denyslins/udacity-react-multi-worker:$GIT_SHA

kubectl apply -f k8s

kubectl set image deployments/client-deployment client=denyslins/udacity-react-multi-client:$GIT_SHA
kubectl set image deployments/server-deployment server=denyslins/udacity-react-multi-server:$GIT_SHA
kubectl set image deployments/worker-deployment worker=denyslins/udacity-react-multi-worker:$GIT_SHA

echo 'Finishing deploy'

rm -rf service-account.json
