pipeline {
    agent { label 'centos-agent' }  // Make sure your CentOS node label is set to this

    environment {
        IMAGE_NAME = "zeeshandynamo/linuxproject"
        DOCKERHUB_CREDENTIALS = "dockerhub-cred"   // Jenkins credential ID for DockerHub
        SONARQUBE_ENV = "sonarqube-server"         // Jenkins SonarQube server name
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📦 Cloning repository..."
                git branch: 'main', url: 'https://github.com/zeeshandynamo/linuxproject.git'
            }
        }

        stage('Code Quality - SonarQube') {
            steps {
                echo "🔍 Running SonarQube analysis..."
                withSonarQubeEnv('sonarqube-server') {
                    sh """
                    sonar-scanner \
                        -Dsonar.projectKey=linuxproject \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=\$SONAR_HOST_URL \
                        -Dsonar.login=\$SONAR_AUTH_TOKEN
                    """
                }
            }
        }

        stage('Security Scan - Trivy') {
            steps {
                echo "🛡️ Scanning for vulnerabilities with Trivy..."
                sh 'trivy fs . || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "🐳 Building Docker image..."
                sh 'docker build -t $IMAGE_NAME:latest .'
            }
        }

        stage('Trivy Image Scan') {
            steps {
                echo "🔎 Scanning Docker image..."
                sh 'trivy image $IMAGE_NAME:latest || true'
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo "⬆️ Pushing image to DockerHub..."
                withCredentials([usernamePassword(credentialsId: "$DOCKERHUB_CREDENTIALS", usernameVariable: "DOCKER_USER", passwordVariable: "DOCKER_PASS")]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker tag $IMAGE_NAME:latest $DOCKER_USER/linuxproject:latest
                        docker push $DOCKER_USER/linuxproject:latest
                    """
                }
            }
        }

        stage('Deploy Container') {
            steps {
                echo "🚀 Deploying container on CentOS Agent..."
                sh """
                    docker stop linuxproject || true
                    docker rm linuxproject || true
                    docker run -d --name linuxproject -p 3000:3000 $IMAGE_NAME:latest
                """
            }
        }
    }

    post {
        always {
            echo "✅ Pipeline completed (check logs for details)"
        }
        failure {
            echo "❌ Pipeline failed. Please check console output."
        }
    }
}
