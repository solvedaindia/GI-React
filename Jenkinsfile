pipeline {
  environment {
    registry = "sitgintsolr2.godrej.com:5000/react-nodejs"
    registryCredential = 'registry'
    dockerImage = ''
  }
  agent any
  stages {
    stage('Cloning svn') {
      steps {
	   checkout scm
      }
    }
    stage('Building image') {
      steps{
		  echo 'Starting to build docker image'
		  
        script {		
          dockerImage = docker.build registry + ":${nodereact_buildtag}"
		  echo "Build number is :::: ${nodereact_buildtag}"
        }
      }
    }
  stage('Deploy Image') {
      steps{
        script {
          withDockerRegistry(credentialsId: 'registry', url: 'http://sitgintsolr2.godrej.com:5000/react-nodejs') {
            dockerImage.push()
          }
        }
      }
    }
  }
}
