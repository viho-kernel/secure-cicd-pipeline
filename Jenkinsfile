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

        stage('Unit Tests') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    // Archive coverage report so you can view it later
                    archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                                withSonarQubeEnv('SonarQube') { 
                    sh "${tool 'SonarScanner'}/bin/sonar-scanner"
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time:20, unit: 'MINUTES') {
                     waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        always {
            echo "Build result: ${currentBuild.currentResult}"
        }
    }
}