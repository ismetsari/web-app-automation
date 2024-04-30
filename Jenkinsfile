pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'ismesari/mywebapp:latest'
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
                    docker.push(env.DOCKER_IMAGE)
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Login and push the Docker image to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'Docker-Credentials', usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASS')]) {
                    echo "Logging in with ${env.REGISTRY_USER}"
                    sh 'docker login -u $REGISTRY_USER -p $REGISTRY_PASS'
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
