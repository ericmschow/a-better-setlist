# a-better-setlist

Built with React, using JavaScript, HTML, and CSS.

This project is intended to solve a real-world problem my band faces: having to make and re-make setlists for every show. It is very time consuming to have to, for every show, write out each song, keep track of how long they are, and add up the total setlist length to ensure we'll be within our allotted time.

We could use a Google/Excel spreadsheet to track the information, but that does not allow for quick and painless setlist creation. Besides, everyone knows spreadsheets are boring. A cursory search showed no free tools to do this, which makes this an excellent problem to tackle for my DigitalCrafts individual project.

The MVP for this project will allow the user to:
* Input their songs, including its name and duration (with the possibility of other fields for a data-presentation-related stretch goal)
* Save their songs to localStorage for an improved user experience
* View a list of all their songs, sorted alphabetically
* Select songs from their list to put in their setlist
* Easily re-order their setlist via drag-and-drop

Stretch goals include:
* Graphs to easily answer questions about your setlist, e.g. "Will there be breaks in intensity to let the audience relax?" or "How will the audience respond to this track order based on how I've rated the crowd response?"
* Seamless vs seamed transition option for setlist, granting the option to add dead time between songs to make charts more realistic
* Song sorting options for main list beyond alphabetically
* Google Drive export feature to easily print out the list from computer (vs screenshots from phone)
* Automatic setlist re-ordering, including randomly or in accordance with a given intensity or response curve
* Allow the user to have multiple bands
* Allow saving/loading different setlists
* Refactor into React Native or some other means of putting

Some challenges faced while building this project included:
* Overcoming react-swipeable-views' behavior of re-rendering every component on every frame of animation, when computationally heavy logic needed to be done prior to re-rendering. Solved via debounce module on the heavy logic, preventing it from running that frequently.

* Finding a way to take touch input on individual divs while react-swipeable-views wanted to take touch input on the entire screen. Solved via finding a different touch module, Tappable, that worked at a higher priority than react-swipeable-views.
