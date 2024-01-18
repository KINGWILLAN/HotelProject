# React + Vite

I created te frontend with react vite because of its development experience. I also used material-tailwind component as my utility component library which helps to speed up my development process for things like carousel, button among other.

The frontend folder is divide into /publicand /src folder. The src folder house the implementation for the frontend there you can find folders as follows:

asset folder - contains all the images and other static files that are used in the project
components - this house all the reusable components that are created in the ability which brings the power of react into play.
data - this folder has the dummy data that was used to design the front end before data are being fetched from the backend.
hookd - house different custom hooks used in the project for resuability. it contains useScreenHook used to et the media query for the current screen size, useAuth which helps to authenticate users and authorize user for any action they want to perform.
pages - house the different pages/routing in our frontend application powered with the help of react-router-dom.
queries - this contains the Mutation and Query functions which are later called by react-query library for asynchronous data fetching from the server.
redux - this is the redux setup which contains the store and the various sliices used in the application.
utils - contains reusable utility function which are used throiugh the development process.

The entry point of the application is main.jsx which is being called in index.html which is in the root folder.
