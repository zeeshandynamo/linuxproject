pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "linuxproject:latest"
        DOCKERHUB_REPO = "zeeshandynamo/linuxproject"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/zeeshandynamo/linuxproject.git'
            }
        }

        stage('Build') {
            steps {
                echo '🏗️ Building the project...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running tests...'
                // replace below with your test command if you have tests
                sh 'echo "No tests configured, skipping..."'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo '🚀 Pushing image to DockerHub...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker tag $DOCKER_IMAGE $DOCKERHUB_REPO:latest
                        docker push $DOCKERHUB_REPO:latest
                    '''
                }
            }
        }

        stage('Deploy (Optional)') {
            steps {
                echo '📦 Running container locally on port 3000...'
                sh '''
                    docker ps -q --filter "ancestor=$DOCKER_IMAGE" | xargs -r docker stop
                    docker run -d -p 3000:3000 $DOCKERHUB_REPO:latest
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Build, Docker Push & Deploy completed successfully!'
        }
        failure {
            echo '❌ Build failed! Check logs for details.'
        }
    }
}
