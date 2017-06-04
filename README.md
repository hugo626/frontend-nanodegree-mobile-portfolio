# Front End Nanodegree Mobile Portfolio

This is second project which comes from [Udacity](https://udacity.com/) [Front End Nanodegree](https://www.udacity.com/course/--nd001-cn-advanced)

## Goal
The purpose of this project is to optimize the given sites, so that 
1. ```index.html``` achieves a [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) score of at least **90** for Mobile and Desktop.
2. ```pizza.html``` achives a ```60FPS``` when scrolling and time to resize pizzas is less than ```5 ms``` using the pizza size slider.

More detialed project specification can be fund from [Project Specification](PROJECT-SPECIFICATION.md). [Project Rubic](https://review.udacity.com/#!/rubrics/16/view). 

## Check Result
The optimized site is hosted by git hub: [Cam's Portfolio](https://hugo626.github.io/frontend-nanodegree-mobile-portfolio/dist/index.html). 
Here is the [score for Cam's Portfolio](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fhugo626.github.io%2Ffrontend-nanodegree-mobile-portfolio%2Fdist%2Findex.html&tab=desktop). If you are interesting to the [score for Pizza.html](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fhugo626.github.io%2Ffrontend-nanodegree-mobile-portfolio%2Fdist%2Fviews%2Fpizza.html), only for fun.

## How to run local
In this project, we use ```npm``` and ```gulp``` as library managment and build tool. 
### Build Environment
In order to be able to run and build locally, you have to install [node.js](https://nodejs.org/en/download/) first. 
1. Install [Gulp](http://gulpjs.com/), 
```
npm install gulp-cli -g
```
2. Install [GraphicsMagick](http://www.graphicsmagick.org/), in our project, we are using some image compressing and resizing function from GraphicsMagick, so you have to install it first. *NOTICE. make sure to check ```gm``` commands is callable throught terminal.*

3. Go to the root folder of this project ```**/frontend-nanodegree-mobile-portfolio/``` then run 
```
npm install
```


## What optimised
main.js
change made
1. Removed function determineDx(), move the  
   ``` 
    switch(size) {
        case "1":
          return 0.25;
        case "2":
          return 0.3333;
        case "3":
          return 0.5;
        default:
          console.log("bug in sizeSwitcher");
      }
    ```
    into changePizzaSizes function directly. and change the size of width to percentage 
    ```
    newSize + '%';
    ```
        
2. inside of updatePositions function(); extract 
    ```
    document.body.scrollTop     
    ```
    out of the for loop, and cache it 
    ```
      var bodyScrollTop = document.body.scrollTop;
    ```  
3. compress both pizza.png and pizzeria.jpg. Also after observation, both pictures are too large than their max size in web page, so I decide to resize both size to match with their maximum size in web page.
4. most important: add responive image for pizzeria.jpg, as I observed, when the site is loaded on desktop, the size of pizzeria is actuall 360*270px, that is why pagespeed keep ask me to reduce the of pizzeria image. But when the browser is resize to 997 px, the pizzeria will scall up tp 720*540px. 

For index.html
1. download three picture for thumbnail.
2. add media = "print" to print.css
```
<link href="css/print.css" rel="stylesheet" media="print">
```
2. move to bottom analytics.js of body tag, and add async
```
<script async src="http://www.google-analytics.com/analytics.js"></script>
```
3. generate a thumnail for pizzeria.jpg
4. move google font to bottom of body.
5. inline style.css into index.html

## License
This Arcade Game is Copyright (c) 2017 Yuguo LI. It is free software, and may be redistributed under the terms specified in the [LICENSE](LICENSE) file.