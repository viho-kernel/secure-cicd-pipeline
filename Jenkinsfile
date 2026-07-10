pipeline {
    agent any 
    tools {
        nodejs 'Node18'
    }

    options {
        timestamps()
        timeout(time: 20, unit: 'MINUTES')
        disableConcurrentBuilds()
buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    environment {
        APP_NAME = "secure-cicd-pipeline"
    }

    stages {
        stage('checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/viho-kernel/secure-cicd-pipeline.git'
            }
        }

        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }

    post {
        always {
            echo "Build result: ${currentBuild.currentResult}"
        }
    }
}