pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'username/mywebapp:latest'
        REGISTRY_CREDENTIALS = 'docker-hub-credentials'
    }

    triggers {
        // Trigger the pipeline on commits to the main branch
        pollSCM 'H/5 * * * *'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    docker.build(env.DOCKER_IMAGE)
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Login and push the Docker image to Docker Hub
                    docker.withRegistry('https://registry.hub.docker.com', env.REGISTRY_CREDENTIALS) {
                        docker.image(env.DOCKER_IMAGE).push()
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

