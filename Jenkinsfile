pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "zeeshandynamo/linuxproject:latest"
    }

    stages {

        stage('SonarQube Analysis') {
    steps {
        withSonarQubeEnv('sonarqube') {
            sh '''
            sonar-scanner \
            -Dsonar.projectKey=linuxproject \
            -Dsonar.sources=. \
            -Dsonar.host.url=http://localhost:9000 \
            -Dsonar.login=$SONAR_AUTH_TOKEN
            '''
        }
    }
}

        stage('Quality Gate') {
    steps {
        echo "🚦 Checking Quality Gate..."

        timeout(time: 10, unit: 'MINUTES') {
            waitForQualityGate abortPipeline: true
        }
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
                    docker rm -f linuxproject || true
                    docker run -d --name linuxproject -p 8081:3000 $DOCKER_IMAGE
                    echo "✅ Container running successfully on port 8081"
                '''
            }
        }

        stage('Health Check') {
            steps {
                echo "🩺 Checking application health..."
                sh '''
                    sleep 5
                    curl -f http://localhost:8081 || (echo "❌ Health check failed!" && exit 1)
                '''
            }
        }

        stage('Cleanup') {
            steps {
                echo "🧹 Cleaning up unused Docker data..."
                sh '''
                    docker image prune -f
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Full CI/CD Pipeline + SonarQube + Quality Gate completed!"
        }
        failure {
            echo "❌ Pipeline failed. Check logs."
        }
    }
}
