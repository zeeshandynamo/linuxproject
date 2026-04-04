pipeline {
    agent any

    stages {

        stage('SonarQube Analysis') {
            steps {
                echo "🔍 Running SonarQube analysis..."

                withSonarQubeEnv('sonarqube') {
                    sh '''
                    sonar-scanner \
                    -Dsonar.projectKey=linuxproject \
                    -Dsonar.sources=. \
                    -Dsonar.login=$SONAR_AUTH_TOKEN
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Code scanned successfully!"
        }
        failure {
            echo "❌ Scan failed!"
        }
    }
}
