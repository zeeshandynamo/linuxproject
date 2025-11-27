pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "zeeshandynamo/linuxproject:latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "📥 Checking out latest code from GitHub..."
                git branch: 'main', url: 'https://github.com/zeeshandynamo/linuxproject.git'
            }
        }

        stage('Login to DockerHub') {
            steps {
                echo "🔐 Logging into DockerHub..."
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "🐳 Building Docker image..."
                sh '''
                    docker build -t $DOCKER_IMAGE .
                '''
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo "📤 Pushing image to DockerHub..."
                sh '''
                    docker push $DOCKER_IMAGE
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                echo "🚀 Deploying container..."
                sh '''
                    # Remove any old container with same name
                    docker rm -f linuxproject || true

                    # Run new container (host 8081 -> container 3000)
                    docker run -d --name linuxproject -p 8081:3000 $DOCKER_IMAGE

                    echo "✅ Container running successfully on port 8081"
                '''
            }
        }

        stage('Health Check') {
            steps {
                echo "🩺 Checking application health..."
                sh '''
                    sleep 3
                    curl -f http://localhost:8081 || (echo "❌ Health check failed!" && exit 1)
                '''
            }
        }

        stage('Cleanup') {
            steps {
                echo "🧹 Cleaning up unused Docker data..."
                sh '''
                    docker system prune -f
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Build, push, and deploy completed successfully!"
        }
        failure {
            echo "❌ Build failed. Check logs."
        }
    }
}
