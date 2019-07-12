pipeline {
    agent any
    stages {
        stage('Retrieve git repository') {
            steps {
                git 'YOUR_REPO_GIT'
            }
        }
        stage('Pre-configure docker'){
            steps {
                sh 'docker stop testcy || true && docker rm testcy || true'
            }
        }
        stage('Build docker image') {
             steps {
                sh 'docker build --build-arg UID=$(id -u) --build-arg GID=$(id -g) -t mycypress:1 .'
                }
        }
        stage('Run e2e cypress tests inside a docker container') {
             steps {
                script 
                    {
                    sh "docker run --rm --name testcy -v ${WORKSPACE}/:/cypress/results/ mycypress:1"  
                    }
                }
        }
    }
    post {
        always {
            publishTestResults serverAddress: 'YOUR_ATLASSIAN_URL', 
                    projectKey: 'YOUR_PROJECT_KEY', 
                    filePath:'tm4j_result.json', 
                    format: 'Test Management for Jira Output Result For JUnit', 
                    autoCreateTestCases: true
            cleanWs()
        }
        
    }
}