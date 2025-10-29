pipeline {
    agent any

    environment {
        IMAGE_NAME = "zeeshandynamo/linuxproject"
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred')
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
                    sudo docker build -t $IMAGE_NAME:latest .
                '''
            }
        }

        stage('Login to DockerHub') {
            steps {
                sh '''
                    echo "🔐 Logging in to DockerHub..."
                    echo $DOCKERHUB_CREDENTIALS_PSW | sudo docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                '''
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh '''
                    echo "📦 Pushing image to DockerHub..."
                    sudo docker push $IMAGE_NAME:latest
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Successfully built and pushed image to DockerHub!"
        }
        failure {
            echo "❌ Build failed. Check logs."
        }
    }
}
