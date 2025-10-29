pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "zeeshandynamo/linuxproject:latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/zeeshandynamo/linuxproject.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    echo "🐳 Building Docker image..."
                    docker build -t $DOCKER_IMAGE .
                '''
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "🔐 Logging into DockerHub..."
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh '''
                    echo "📤 Pushing image to DockerHub..."
                    docker push $DOCKER_IMAGE
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                    echo "🚀 Running container..."
                    docker rm -f linuxproject || true
                    docker run -d --name linuxproject -p 8081:8081 $DOCKER_IMAGE
                '''
            }
        }

        stage('Cleanup') {
            steps {
                sh '''
                    echo "🧹 Cleaning up unused Docker data..."
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
