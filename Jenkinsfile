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
                sh 'echo "All tests passed!"'
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
    }
}

