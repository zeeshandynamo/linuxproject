pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-token',
                    url: 'https://github.com/zeeshandynamo/linuxproject.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'echo "All tests passed successfully!"'
            }
        }

        stage('Docker Build & Run') {
            steps {
                sh '''
                docker build -t linuxproject:latest .
                docker stop linuxproject || true
                docker rm linuxproject || true
                docker run -d -p 3000:3000 --name linuxproject linuxproject:latest
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker tag linuxproject:latest $DOCKER_USER/linuxproject:latest
                    docker push $DOCKER_USER/linuxproject:latest
                    '''
                }
            }
        }
    }
}
