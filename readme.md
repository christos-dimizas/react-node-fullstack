Designing an App (basic steps):

    1. Create UML like diagrams that explain (more or less) the main flow of the app, 
       from the user perspective.
    2. Side by side with the diagram specify the possible tech stack that is necessary
       for the app.
    3. According to those , try to create some draft mockups of the UI and UX of the 
       different screens that the app's flow naturally produces. 

Server Side Architecture:

    1. Application architecture:
        React App  <- communicates through http requests with -> Express/Node API communicates with --> Mongo DB
        
        NodeJS    : Javascript runtime used to execute code outside of the browser
        ExpressJS : Library that runs in the Node runtime. Has helpers to make dealing 
                    with HTTP traffic easier.
        
        
Deployment Checklist:

    1. Dynamic port binding
    2. Specify node environment
    3. Specify start script
    4. Create .gitignore file
    
   
