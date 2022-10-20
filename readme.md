**A short description of your app, concept and idea**

Lyrific is an app designed primarily for use on mobile phones, both Android and iOS equally. It is an app that allows for the owner/admin to load lyrics for chosen songs, along with title and author, and destribute the app to other users who can then view the lyrics easily without having to log in.


**A brief account of your design choices. Can be based on  *[Deep dive: Mobile design principles and best practices](https://uxdesign.cc/boost-ux-with-mobile-ux-design-principles-and-best-practices-907e4f9fdd5d),* [10 Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/) and other relevant UX and UI resources from your teaching.**

We have tried to design the app in a way to make it very usable on mobile phones. For instance by chosing to have a navigation tab bar at the bottom of the page, instead of the traditional website choice of a top navigation bar. This is because the bottom is a lot easier to reach with your fingers on a larger type of mobile phone. 
We have also considered the "Recognition Rather Than Recall" principle from *Deep dive: Mobile design principles and best practices* , and added suitable icons in the tab buttons, but also with a label underneath, so the user will not be forced to guess what the icon means, if it isn't immediately obvious.
Speed is also an important principle to consider, and for this reason we also only fetch data from the server when retrieving the full list of songs in the index page. The song data is then passed along to the various other pages and components locally to avoid slow server fetches as much as possible. This should lead to a faster and more interactive user experience. 
One thing for future improvements would be to implement some kind of persistant local storage, which it would retrieve the songs from when accessing the index page multiple times in the same session. Of course the challenge is to find the right balance between fast content and the content being stale.

In terms of discoverability, we have made the features meant for the average user immediately available via the tab buttons at the bottom. On the other hand we have actively made the login functionality less visible, as it is not meant for most users, only the admin(s). Of course it can't be completely hidden, as they have to be able to find it as well, without necessarily being technical experts, so there is a balance in that.

We have also added a few toast messages to the admin functions, such as logging in/out and creating or updating a post, to provide some feedback.
Also to avoid unintentional destructive behavior, we added a device specific confirmation dialog when trying to delete, to make sure the admin doesn't delete a song by accident. 


**A description of the project structure and “Thinking in React"**
The project is built in Ionic, of course, meaning that it has a lot of structural elements from the get-go. We're using the tab template, which has a tab bar permanently fixed to the bottom of all pages, which serves as main navigation for the site. The rest of the app/pages is wrapped in a React context componenet, which essentially keeps all the global variables and functions for the rest of the app. This is primarily login/logout functionality and a current user and selected song. This is used quite a lot to determine the current state of the app and transfer data locally without having to go online.
We are using hooks quite a lot as well, primarily to render something or fetch songs when a page enters view. Also the custom hook useAuth() from the context to retrieve context data & functions.

We used a couple of large componenets, that is Login.jsx and LyricsForm.jsx. Login.jsx as it's a very self-contained element that has to appear on every page, and LyricsForm because we use an identical form on both edit and create, so made sense to reuse it as a component. 
In hindsight it would have made sense to create a lot more components, but it was difficult to extract them now, as a lot of code with mixed up. But the list items in the song list on index and history would be very obvious candidates for being made into components instead.
We also use states to make the UI update dynamically, such as displaying buttons as "pending" when sending data to the server.


**A description of how to run the app in the browser and on a platforms (Android/iOS), including CLI commands**

```shell
npm install
ionic serve

//For deploying to android (requires Android Studio)
npm i @capacitor/core
npm i -D @capacitor/cli
npm i @capacitor/android

ionic capacitor sync android
ionic capacitor open android
```


