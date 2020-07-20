echo 'Initializing deploy'

export GIT_SHA=$(git rev-parse --short HEAD)
echo $GIT_SHA

echo 'Building client'
docker build -t denyslins/udacity-react-multi-client:$GIT_SHA -f ./client/Dockerfile ./client

echo 'Building server'
docker build -t denyslins/udacity-react-multi-server:$GIT_SHA -f ./server/Dockerfile ./server

echo 'Building worker'
docker build -t denyslins/udacity-react-multi-worker:$GIT_SHA -f ./worker/Dockerfile ./worker

echo 'Pushing client'
docker push denyslins/udacity-react-multi-client:$GIT_SHA

echo 'Pushing server'
docker push denyslins/udacity-react-multi-server:$GIT_SHA

echo 'Pushing worker'
docker push denyslins/udacity-react-multi-worker:$GIT_SHA

echo 'Applying k8s'
kubectl apply -f k8s

echo 'Setting image client'
kubectl set image deployments/client-deployment client=denyslins/udacity-react-multi-client:$GIT_SHA

echo 'Setting image server'
kubectl set image deployments/server-deployment server=denyslins/udacity-react-multi-server:$GIT_SHA

echo 'Setting image worker'
kubectl set image deployments/worker-deployment worker=denyslins/udacity-react-multi-worker:$GIT_SHA

echo 'Finishing deploy'
