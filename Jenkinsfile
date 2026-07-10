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

        stage('Trivy Dockerfile Scan') {
            steps {
                echo 'Scanning Docker image for vulnerabilities...'
                 sh 'trivy config --severity HIGH,CRITICAL --exit-code 1 .'

            }
        }

        stage('Read Version') {
            steps {
                script {
                    def packageJson = readJSON file: 'package.json' 
                    env.APP_VERSION = packageJson.version
                    env.IMAGE_TAG = "${env.APP_VERSION}-${env.BUILD_NUMBER}"
                    echo "Version: ${env.APP_VERSION} | Image tag: ${env.IMAGE_TAG}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${env.APP_NAME}:${env.IMAGE_TAG} ."
            }
        }

        stage('Trivy Image Scan') {
            steps {
sh "trivy image --severity CRITICAL --exit-code 1 --format table ${env.APP_NAME}:${env.IMAGE_TAG}"
            }
        }
    }

    post {
        always {
            echo "Build result: ${currentBuild.currentResult}"
        }
    }
}