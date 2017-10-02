docker build -t wildapplications/email:latest . &&
kubectl scale --replicas=0 deployment deployment --namespace=email &&
kubectl scale --replicas=2 deployment deployment --namespace=email
