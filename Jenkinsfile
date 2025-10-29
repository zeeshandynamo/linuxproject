pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/zeeshandynamo/linuxproject.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building project...'
                sh 'echo Build step running'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'echo Test step running'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying project...'
                sh 'echo Deploy step running'
            }
        }
    }

    post {
        success {
            echo '✅ Build completed successfully!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}
