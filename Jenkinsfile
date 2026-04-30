pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "zeeshandynamo/linuxproject:${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/zeeshandynamo/linuxproject.git'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh 'docker push $DOCKER_IMAGE'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                    docker stop linuxproject || true
                    docker rm linuxproject || true
                    docker run -d --name linuxproject -p 8081:3000 $DOCKER_IMAGE
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 5
                    curl -f http://localhost:8081
                '''
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker image prune -f --filter "until=24h"'
            }
        }
    }

    post {
        success {
            echo "Pipeline successful 🚀"
        }
        failure {
            echo "Pipeline failed ❌"
        }
    }
}
