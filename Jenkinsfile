pipeline {
    agent any

    triggers {
        // Trigger the pipeline when changes are pushed to the specified branch
        git branch: 'main', 
            // Path to the Git repository
            url: 'https://github.com/ismetsari/web-app-automation',
            // Poll SCM every minute
            pollSCM('H/1 * * * *')
    }

    stages {
        stage('Build') {
            steps {
                // Add your build steps here
                sh 'echo "Building..."'
            }
        }
        // Add more stages as needed
    }
}
