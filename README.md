# RUNNERS BUNDLE

## Introduction
The idea to create a simple website using Frontend and Backend tools, was supported by my passion for running.  Having running-friends or to share the same passion is a great opportunity for everyone willing to share kilometers and sweat on the road or on a track.  All runners, at one point, feel the need to share their achievements, to test themselves and of course to improve and to learn new things; bottom line, to divide the joy of running with other fellows.
The website basically is a tool "to bundle" together everybody interested in running and whatever is around it; just name it: nutrition facts, training schedule, apparels, tech and many more.

## The Website
I wanted to create a really simple and clear website, easy to navigate and at the same time, with accessible features and information.
The **Home Page** is structured with a brief explanation/introduction of the goals related to the Running Bundle groups.
<img width="619" alt="homepage" src="https://cloud.githubusercontent.com/assets/22348166/22650924/6cb19e42-ec81-11e6-9d2b-e46aa064da6e.png">

The **Events Page** shows the "Current Events" that are trendy and requested at the moment; basically these are short suggestions given to the runners; the Events page can be updated accordingly depending on the various objectives and goals.
The **Feedback** place is a useful tool where the runners can share their opinion and suggestions related to any past/present/future events; the Feedback page is one-stop review for who is interested in joining the group or who is willing to give advices.
The **Chat** tool puts in immediate contact any website user, they can share info, update on weather condition, share their achievements and much more.

## The Building of the site
As highlighted in the Introduction, Frontend and Backend tools have been used for the website.  The server file gets information from local API for the Events and the Feedback.  * [node.js] - (evented I/O for the backend) is the main engineThe Static files organized around HTML/CSS and Javascript are handled with modules like * [Express] - (fast node.js network app framework) and EJS (for the view ports).  While building the site, the Nodemon.js module was used to avoid manually restarting the server; for testing reasons Mocha/Chai libraries have been used.  Bottom line, the styling process was done using a simple and quick Bootstrap template.
