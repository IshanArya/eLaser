# eLaser

### This project won 4 categories at hackBCA IV: Code For Good Award, Best Education Hack, Best Use of Wolfram, and Overall top 10.

## Inspiration
Generic store-bought laser pointers are always a pain - you have to pair them with your computer, sometimes you lose the USB dongle, and most of the time the controls are so obscure, you waste the first 5 minutes of your presentation time figuring out how to navigate between your slides. We attempt to fix this problem by bringing together two widespread technologies - your web browser, and your smartphone.

## What it does
Our chrome extension will pair with your phone and use your phone's accelerometer data to track its motion and display a corresponding "laser point" on the screen. With it you can easily switch to presentation mode using intuitive movements of your hand to move a laser pointing dot across the screen. As an added bonus, you can click around on the screen, as well as interact with audience members with an integrated Q&A feature.

## How we built it
Using Node.js and socket.io, we wrote the backend to process the smartphone's accelerometer data and send it to the chrome extension which displays the laser point on the screen. We used Wolfram's API to convert the "alpha, beta, gamma" coordinates of the phone into "x,y" coordinates for the screen. The chrome extension was created with HTML/CSS/Javascript and as well Chrome's own API, and can integrate with Twilio to be interactive with your audience members and send questions to them.

## Challenges we ran into
A large part of our time was spent figuring out what parts of the smartphone's accelerometer data was relevant, how to process this data and send it to the chrome extension. Furthermore, this was our first time developing a chrome extension and getting familiar with its bizarre messaging system and various scripts was a pain. Eventually we jumped this hurdle by countless hours of online reading with no sleep.

## Accomplishments that we're proud of
The final prototype runs quite smoothly (more so than we expected), is very intuitive, and has a nice design. We believe the front end of a program has more importance than people think, so we made sure to design it with the end user in mind.

## What we learned
How to make Chrome extensions with their tricky messaging systems. We learned about the difference between background scripts and content scripts. We learned about the versatility of CSS animations. We also learned that if you repeatedly press run, the program will eventually start to work.

## What's next for eLaser
Add WebRTC support to put less strain on the servers and give more immediate feedback. Also publish it on the Chrome Webstore.
