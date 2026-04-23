🚀 End-to-End DevSecOps Automation Platform
<p align="center"> <img src="https://img.shields.io/badge/DevSecOps-Project-blue?style=for-the-badge"> <img src="https://img.shields.io/badge/AWS-EC2-orange?style=for-the-badge&logo=amazonaws"> <img src="https://img.shields.io/badge/Jenkins-CI/CD-red?style=for-the-badge&logo=jenkins"> <img src="https://img.shields.io/badge/Kubernetes-Orchestration-326ce5?style=for-the-badge&logo=kubernetes"> <img src="https://img.shields.io/badge/Grafana-Monitoring-F46800?style=for-the-badge&logo=grafana"> </p>
📌 Overview

This project demonstrates a real-world DevSecOps pipeline built from scratch using:

CI/CD automation
Security scanning
Containerization
Kubernetes deployment
Monitoring & alerting

💡 Designed to simulate production-grade SRE workflows

🏗️ Architecture
<p align="center">
  <img src="./Project Archietecture.png" width="900">
</p>
🔄 Pipeline Flow
GitHub → Jenkins → SonarQube → Docker → Trivy → DockerHub → Kubernetes → Prometheus → Grafana → Alerts
⚡ Features
✅ Fully automated CI/CD pipeline
🔐 DevSecOps security (SonarQube + Trivy)
🐳 Docker containerization
☸️ Kubernetes deployment
📊 Prometheus + Grafana monitoring
🚨 Email & Telegram alerting
🧠 Beginner-Friendly Setup Guide

Click each step to expand 👇

<details> <summary>☁️ Step 1: Launch AWS EC2 Instance</summary>
Go to AWS → EC2 → Launch Instance

Configuration:

Name: devsecops-project
OS: Ubuntu 24.04 LTS
Instance Type: t3.medium ⚠️ (Important)
Storage: 20 GB
Key Pair: Create & download .pem
🔓 Open Ports:
Port	Use
22	SSH
8080	Jenkins
9000	SonarQube
3000	Grafana
80	App
</details>
<details> <summary>🔑 Step 2: Connect to EC2</summary>
ssh -i "your-key.pem" ubuntu@<PUBLIC-IP>
</details>
<details> <summary>🧱 Step 3: Install Basic Packages</summary>
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git unzip
</details>
<details> <summary>☕ Step 4: Install Java</summary>
sudo apt install openjdk-17-jdk -y
java -version
</details>
<details> <summary>🐳 Step 5: Install Docker</summary>
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

👉 Re-login required

</details>
<details> <summary>🔍 Step 6: Install Trivy</summary>
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo deb https://aquasecurity.github.io/trivy-repo/deb stable main | sudo tee /etc/apt/sources.list.d/trivy.list
sudo apt update
sudo apt install trivy -y
</details>
<details> <summary>🧪 Step 7: Run SonarQube</summary>
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts

👉 Open: http://<IP>:9000
Login: admin / admin

</details>
<details> <summary>⚙️ Step 8: Run Jenkins</summary>
wget https://get.jenkins.io/war-stable/latest/jenkins.war
nohup java -jar jenkins.war --httpPort=8080 &

👉 Open: http://<IP>:8080

</details>
<details> <summary>☸️ Step 9: Install Kubernetes (Minikube)</summary>
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install kubectl /usr/local/bin/kubectl

minikube start --driver=docker
</details>
<details> <summary>📊 Step 10: Install Monitoring (Prometheus + Grafana)</summary>
Prometheus
wget https://github.com/prometheus/prometheus/releases/latest/download/prometheus-*.linux-amd64.tar.gz
tar xvf prometheus*.tar.gz
cd prometheus*
./prometheus &
Grafana
sudo apt install grafana -y
sudo systemctl start grafana-server

👉 Open: http://<IP>:3000

</details>
<details> <summary>🔗 Step 11: Clone Project</summary>
git clone https://github.com/zeeshandynamo/linuxproject.git
cd linuxproject
</details>
<details> <summary>⚙️ Step 12: Configure Jenkins</summary>
Install Plugins:
Docker Pipeline
GitHub Integration
SonarQube Scanner
Add Credentials:
DockerHub
GitHub
SonarQube Token
</details>
<details> <summary>🔁 Step 13: Setup GitHub Webhook</summary>

Payload URL:

http://<IP>:8080/github-webhook/
</details>
<details> <summary>▶️ Step 14: Run Pipeline</summary>
git add .
git commit -m "trigger"
git push origin main
</details>
<details> <summary>☸️ Step 15: Deploy to Kubernetes</summary>
kubectl apply -f k8s/
kubectl get pods
</details>
<details> <summary>📊 Step 16: Monitoring & Alerts</summary>
Prometheus → http://<IP>:9090
Grafana → http://<IP>:3000

Setup:

Email alerts
Telegram alerts
</details>
📊 Dashboard Preview
<p align="center"> <img src="./assets/grafana-dashboard.png" width="900"> </p>
🎬 Demo (Add GIF)
<p align="center"> <img src="./assets/demo.gif" width="900"> </p>
🚨 Common Mistakes
❌ Using t3.micro → Not enough RAM
❌ Forgetting to open ports
❌ Not restarting after Docker install
❌ SonarQube not running before pipeline


🔮 Future Improvements
ArgoCD (GitOps)
Helm Charts
HashiCorp Vault
Istio Service Mesh
Multi-cloud deployment

👨‍💻 Author
Zeeshanali M Mannur
