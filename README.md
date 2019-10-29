# Enterprise Software Project - A Mini Dropbox
This project is similar to dropbox and was developed as a project for my Enterprise Software class. It leverages AWS services such as (AWS Amplify, Cloudfront, Cognito, S3, etc). 

## Application Functionality
The application has CRUD (Create, Read, Update, Delete) as well as file upload/download functionality, however there are restrictions based on users. 

Administrators are allowed to access full CRUD functionality for all posts, meanwhile, users are only allowed full CRUD functionality for posts that they created. Users that did not create the posting can only view other users posts (unable to edit or delete).

Basically, the application allows users to create an account and then sign in. Once signed in, users can upload/create files. Users are also able to view posts that other users have created and download files associated to those posts. 

Here is a link to the demo of the application: 
* Click [here](https://www.youtube.com/watch?v=lakSZJE-Wg0)
or copy and paste this link into your browser: 
<br/>
https://www.youtube.com/watch?v=lakSZJE-Wg0

Here is the link to the link to the application:
* Click [here](https://d3rprkps2q5szo.cloudfront.net)
or copy and paste this link into your browser: 
<br/>
https://d3rprkps2q5szo.cloudfront.net


## Technologies Used
1. AWS Amplify
    * Amplify is a framework used for quick development of applications (primarily mobile, but web as well). It can be used to quickly set up authentication, analytics, etc with a few commands and allows developers to easily intergrate these features into their applications.
    * For my application, we used amplify for authentication, storage, API, and hosting. We also use amplify to handle the login and registering of users. The application is hosted using AWS Amplify and can be found [here](https://d3rprkps2q5szo.cloudfront.net).
2. AWS Cognito
    * Cognito is an Amazon service that provides user pools, and works directly with Amplify. 
    * Cognito uses user pools to register users and can set up custom authentication, oauth, email verification features, and specifications for account creation.
    * The application uses Cognito for authentication and login/signin, paired with Amplify.
3. AWS DynamoDB
    * DynamoDB is a noSQL database offered by Amazon that allows us to store postings that users create. 
4. AWS S3
    * S3 storage is a storage service that allows us to store files that users upload along with their postings.
5. AWS Cloudfront
    * Cloudfront is a delivery network that allows for quicker file transfer to cut back on waiting/loading times and balance traffic better based on where the user is located.
6. React.js
    * React.js is a front end framework that is used to create the interactive UI, displaying information and interactivity within the website.
7. Material-UI
    * Material UI is a react based library that allows us to quickly build displays using premade react components such as cards, buttons, etc. We can then use these components in our application for a quick and aesthetic user interface.
8. GraphQL
    * GraphQL is a query language for APIs that we used to communicate with DynamoDB. It's used for querying our DynamoDB database for information as well as CRUD functionality for things being stored to DynamoDB.

## Recreating the Application
In order to run/setup the application on your local host, you must set up the Amplify services. First, you should clone this repo onto your local computer. Then create all the aws services. This includes setting up the aws-exports.js file as well the oauth access keys for google and facebook oauth. Basically, you have to set up all the AWS services including, but not limited to the Amplify auth, Amplify API , Amplify Storage, Amplify Analytics, and Amplify Hosting. 