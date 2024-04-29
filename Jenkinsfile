pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'username/mywebapp:latest'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(env.DOCKER_IMAGE)
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Using credentials securely
                    withCredentials([usernamePassword(credentialsId: '0748e697-4d3d-4b54-a73e-7685d05ca0c5', usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASS')]) {
                        docker.withRegistry('https://registry.hub.docker.com', "${env.REGISTRY_USER}:${env.REGISTRY_PASS}") {
                            docker.image(env.DOCKER_IMAGE).push()
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Pull the latest Docker image
                    def appImage = docker.image(env.DOCKER_IMAGE)
                    appImage.pull()

                    // Stop and remove the existing container
                    sh 'docker stop mywebapp || true'
                    sh 'docker rm mywebapp || true'

                    // Run a new container with the updated image
                    appImage.run("--name mywebapp -d -p 8080:8080")
                }
            }
        }
    }
}