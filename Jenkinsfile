pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Cloning Repository...'
                git branch: 'main', url: 'https://github.com/zeeshandynamo/linuxproject.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                sh '''
                    if [ -f package.json ]; then
                        npm install
                    else
                        echo "No package.json found, skipping npm install"
                    fi
                '''
            }
        }

        stage('Build') {
            steps {
                echo '⚙️ Building project (if needed)...'
                sh 'echo "No build step required for app.js"'
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying app on port 3000...'
                sh '''
                    APP_PID=$(pgrep -f "node app.js" || true)
                    if [ ! -z "$APP_PID" ]; then
                        echo "Stopping existing app (PID: $APP_PID)..."
                        kill -9 $APP_PID || true
                    fi
                    
                    echo "Starting new app instance..."
                    nohup node app.js > app.log 2>&1 &
                    sleep 3
                    echo "App restarted successfully!"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Build & Deployment Successful!'
        }
        failure {
            echo '❌ Build Failed. Check Console Output.'
        }
    }
}
