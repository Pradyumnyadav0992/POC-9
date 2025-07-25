pipeline {

	agent {
		node{
			label 'Slave_node1'
			customWorkspace '/home/ubuntu/jenkins_workspace/' 
		}

	}

	environment{
		ECR_REGISTRY="963665911471.dkr.ecr.us-east-1.amazonaws.com"
		IMAGE_VERSION="${ECR_REGISTRY}/poc-project:${BUILD_NUMBER}"
	}

	stages{
		stage("FIRST"){
				steps{
					echo "Git clone Successfull"
					}
		}
		
		stage('Build'){
			steps{
				sh """
				docker build -t ${env.IMAGE_VERSION} .
				"""
			}
		
		}
		
		
		stage('Docker push') {
            steps {
                withCredentials([string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY'), 
                                 string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_KEY')]) {
                    sh """
					
					IMAGE_VERSION="${env.IMAGE_VERSION}"
                    aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${env.ECR_REGISTRY}
					docker push ${env.IMAGE_VERSION}
                    """
                }
            }
        }

		stage('Deploy') {
            steps {
                withCredentials([string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY'), 
                                 string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_KEY')]) {
						ansiblePlaybook(
							playbook: 'deploy.yml',
							inventory: 'localhost,',
							extraVars: [
								IMAGE_VERSION: "${env.IMAGE_VERSION}",
								ECR_REGISTRY: "${env.ECR_REGISTRY}"
							]
						)
                }
            }
        }



		// stage('Deploy') {
		// 	steps {
		// 		ansiblePlaybook(
		// 			playbook: 'deploy.yml',
		// 			inventory: 'localhost,',
		// 			extraVars: [
		// 				IMAGE_VERSION: "${env.IMAGE_VERSION}",
		// 				ECR_REGISTRY: "${env.ECR_REGISTRY}"
		// 			]
		// 		)
		// 	}
		// }


		stage('Cleanup Workspace') {
            steps {
                cleanWs()
            }
        }

	}
		
}


