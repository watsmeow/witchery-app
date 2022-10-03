# witchery-app
**Link to project:** https://witchery-spellbook-frontend.herokuapp.com/auth (heroku currently experiencing issues)

![witchery](https://user-images.githubusercontent.com/99840213/193482374-8fc5938a-531c-4516-8ba7-efea60d23424.JPG)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.js, Express.js, React.js, React Redux, JWT auth

This is a fullstack social media app using Node and Express on the back end and React on the front end. It uses React redux for storing state, integrating the front and back ends, and effectively handling user authorization and permissions.

## Optimizations

![witchery1](https://user-images.githubusercontent.com/99840213/193482375-f4c2de6f-384c-43e8-b4fe-90859c484dfc.JPG)

Fun features include: editable/customizable profile, option image upload along with posts, the ability to follow other users and like other users' posts, etc. 

![witchery3](https://user-images.githubusercontent.com/99840213/193482376-2c2743ca-218d-4f8b-b395-842aaf300127.JPG)

There are some things I'd like to optimize further. 
On the backend, I'd like to: 
- Create a route that only gets the user information for post authors when calling getAllTimelinePosts. Right now, it also utilizes the getAllUsers call, which is fine at very small scale, but would not be optimal for a larger scale application. 
- Work on more effectively dealing with security and authorization. Right now the app relies heavily on a first pass authentication and then conditionally provides the user with options based on confirmation that the user is the logged in user. This is also not optimal for a larger scale app with a huge number of functionalities, and something I'd like to address. 
On the frontend, I want to: 
- Add a 'comment' feature for posts, as well as a DM feature for private user to user communication.

## Lessons Learned:

Hosting on Heroku is always a total pain!
