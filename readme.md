- a short description of your app, concept and idea
Lyrific is an app designed primarily for use on mobile phones, both Android and iOS equally. It is an app that allows for the owner/admin to load lyrics for chosen songs, along with title and author, and destribute the app to other users who can then view the lyrics easily without having to log in.


- a brief account of your design choices. Can be based on  *[Deep dive: Mobile design principles and best practices](https://uxdesign.cc/boost-ux-with-mobile-ux-design-principles-and-best-practices-907e4f9fdd5d),* [10 Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/) and other relevant UX and UI resources from your teaching.

We have tried to design the app in a way to make it very usable on mobile phones. For instance by chosing to have a navigation tab bar at the bottom of the page, instead of the traditional website choice of a top navigation bar. This is because the bottom is a lot easier to reach with your fingers on a larger type of mobile phone. 
We have also considered the "Recognition Rather Than Recall" principle from *Deep dive: Mobile design principles and best practices* , and added suitable icons in the tab buttons, but also with a label underneath, so the user will not be forced to guess what the icon means, if it isn't immediately obvious.
Speed is also an important principle to consider, and for this reason we also only fetch data from the server when retrieving the full list of songs in the index page. The song data is then passed along to the various other pages and components locally to avoid slow server fetches as much as possible. This should lead to a faster and more interactive user experience

- a description of the project structure and “Thinking in React”
- a description of how to run the app in the browser and on a platforms (Android/iOS), including CLI commands
