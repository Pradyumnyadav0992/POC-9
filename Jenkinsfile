pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'yourdockerhubuser/myapp'
    }

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/your-user-name/myapp.git'
            }
        }

        stage('Build Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:${BUILD_NUMBER}")
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-credentials-id') {
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy via Ansible') {
            steps {
                ansiblePlaybook(
                    playbook: 'ansible/deploy.yml',
                    inventory: 'ansible/hosts.ini',
                    credentialsId: 'ansible-ssh-key-id'
                )
            }
        }
    }
}
