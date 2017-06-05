# Front End Nanodegree Mobile Portfolio

This is second project which comes from [Udacity](https://udacity.com/) [Front End Nanodegree](https://www.udacity.com/course/--nd001-cn-advanced).

## Goal
The purpose of this project is to optimize the given sites, so that: 
1. ```index.html``` achieves a [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) score of at least **90** for Mobile and Desktop.
2. ```pizza.html``` achives a ```60FPS``` when scrolling and time to resize pizzas is less than ```5 ms``` using the pizza size slider.

More detialed project specification can be fund from [Project Specification](PROJECT-SPECIFICATION.md). [Project Rubic](https://review.udacity.com/#!/rubrics/16/view). 

## Check Result
The optimized site is hosted by git hub: [Cam's Portfolio](https://hugo626.github.io/frontend-nanodegree-mobile-portfolio/dist/index.html). 
Here is the [score for Optimized Cam's Portfolio](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fhugo626.github.io%2Ffrontend-nanodegree-mobile-portfolio%2Fdist%2Findex.html&tab=desktop). If you are interesting to the [score for Optimized Pizza.html](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fhugo626.github.io%2Ffrontend-nanodegree-mobile-portfolio%2Fdist%2Fviews%2Fpizza.html), only for fun.

## Project structure
```
Root
  +- package.json                         The file defined all needed modules for this project.
  +- gulpfile.js                          The gulp configuration file.
  +- other files
  +- dist/                                A folder which contains the optimized and minified files. It has exactly same file structrue with src/ folder
  +- src/                                 The folder which contains original files. Images may not be optimized and compressed. Css, js and html files have been formated with space and comments.
      +- index.html                       The entry file for Cam's portfolio website.
      +- project-2048.html
      +- project-mobile.html
      +- project-webperf.html
      +- css/                             Style files for Cam's portfolio website.
      +- img/                             Images are required to be optimized and compressed.
      |   +- original images              The original images which are provided by default.
      |   +- project-2048.jpg             Downloaded the image from the reference link in html, so that to reduce the response time.
      |   +- project-mobile.jpg           Same above
      |   +- project-webperf.jpg          Same above
      +- js/                              Javascript files for Cam's portfolio website.
      +- views/                           The folder which contains pizza website.
          +- pizza.html                   The Entry file for the pizza website, it also linked in index.html.
          +- css/               
          +- js/                          The javascipt which needs to be optimized.
          +- images/
              +- pizza.png                The original image.
              +- pizzeria-large.jpg       The original pizzeria.jpg was renamed to large.
              +- pizzeria-thumbnail.jpg   Newly added small size of image for index.html
              +- pizzeria.jpg             Newly added medium size of pizzeria.jpg for pizza website.
```
## How to run on local machine
In this project, we use ```npm``` and ```gulp``` as library managment and build tool. 
### Build Environment
In order to be able to run and build locally, you have to install [node.js](https://nodejs.org/en/download/) first. 
1. Install [Gulp](http://gulpjs.com/), 
   ```
   npm install gulp-cli -g
   ```
2. Install [GraphicsMagick](http://www.graphicsmagick.org/), in our project, we are using some image compressing and resizing function from GraphicsMagick, so you have to install it first. ***NOTICE**. make sure to check ```gm``` commands is callable throught terminal.*

3. Go to the root folder of this project ```**/frontend-nanodegree-mobile-portfolio/``` then run 
   ```
   npm install
   ```
If no error appears, then you are good to move to next step.
### Build Site 
To build this site, please run below command under the root folder of this project. 
```
  gulp
```
This command will remove contents in ```dist/``` folder, then minify css,js,html files and copied into ```dist/``` folder with excatly structure in ```src/```. All images will be compressed, resized and copied into corresponsed folder.

Below list all defined ```gulp``` command:
```
gulp
   1. jshint                jshint task to check the js file
   2. copy-top-images       copy, compressed and resized images into dist/img
   3. copy-top-html         copy, minified and compressed html to dist/
   4. copy-top-js           copy, minified and compressed javascript to dist/js
   5. copy-top-css          copy, minified and compressed style file to dist/css
   6. copy-pizza-images     copy, compressed and resized images into dist/views/images
   7. copy-pizza-html       copy, minified and compressed html to dist/views/
   8. copy-pizza-js         copy, minified and compressed javascript to dist/views/js
   9. copy-pizza-css        copy, minified and compressed style file to dist/views/css
  10. clean                 remove the content of dist/ folder
  11. serve:dev             run server based on src/ folder
  12. serve                 run server based on dist/ folder
  13. pagespeed             EXPERIMENT task, it will run server based on dist/ folder, and then run Ngrok based on this server, and finally call Pagespeed Insight API to evaluate index.html and pizza.html.
```  
**Notice** Due to the GFW, the ```gulp pagespeed``` seems doesn't give the correct score when we use Ngrok in China.

When you run ```gulp```, it is actually run every copy tasks sequentially, details can be checked in [gulpfile.js](gulpfile.js)

## What Optimised
### Cam's Portfolio (index.html)
1. Images
    * Download thumbnail pictures instead of refer a url in ```<img>``` tag, ```project-2048.jpg```,```project-mobile.jpg``` and ```project-webperf.jpg```.
      ```html
      <li>
        <img src="img/project-2048.jpg">
        ...
      </li>

      <li>
        <img src="img/project-webperf.jpg">
        ...
      </li>

      <li>
        <img src="img/project-mobile.jpg">
        ...
      </li>

      <li>
        <img style="width: 100px;" src="views/images/pizzeria-thumbnail.jpg">
        ...
      </li>
      ```
2. Index.html
    * Move the ```style.css``` content into ```<head>``` tag, so ```index.html``` would not be blocked by it.
    * As the ```print.css``` will only be used when print the page, add media query.
      ```html
      <link href="css/print.css" rel="stylesheet" media="print">
      ```
    * As ```analytics.js``` only for analysing purpose, so we need to load it asynchronously. Also move ```google-font``` and ```analytics.js``` to bottom of ```<body>``` tag, so both of them would not block the browser to rendering webpage.
      ```html
      <body>
        ....
        <link href="//fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">
        <script async src="http://www.google-analytics.com/analytics.js"></script>
      </body>
      ```
    * As ```index.html``` will require ```pizzeria.jpg``` as a thumbnail, I created a specific pizzeria thumbnail ```pizzeria-thumbnail.jpg```.

### Pizza Website
1. In ```main.js```
    * I removed function ```determineDx()``` as after I analysed, it is not necessary for resize the image. And the size of image is based on the percentage. So I moved the ```switch``` section to ```changePizzaSizes()``` function, and change the size of width to percentage. 
      ```javascript
        function changePizzaSizes(size) {
          var pizzaContainers = document.querySelectorAll(".randomPizzaContainer");
          var newSize;
          for (var i = 0; i < pizzaContainers.length; i++) {
            // Changes the slider value to a percent width
            switch (size) {
              case "1":
                newSize = 25;
                break;
              case "2":
                newSize = 33.33;
                break;
              case "3":
                newSize = 50;
                break;
              default:
                console.log("bug in sizeSwitcher");
            }
            pizzaContainers[i].style.width = newSize + '%';
          }
        }
        ```
        
    * In ```updatePositions()``` function, ```document.body.scrollTop``` is called inside of for-loop, so it will make browser keep tring to Forced Synchronous Layout. The solution is, we extract the ```document.body.scrollTop``` out of the for loop, and then cache it for using.
        ```javascript
        function updatePositions() {
          .... 
          var bodyScrollTop = document.body.scrollTop;
          for (var i = 0; i < items.length; i++) {
            var phase = Math.sin((bodyScrollTop / 1250) + (i % 5));
            items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
          }
          ....
        }
        ```  
2. Images

    I observed ```pizzeria.jpg``` is too large than its reuqired max size in web page, so I decide to resize ```pizzeria.jpg``` to match with their max size in web page. 
    * Compress any files in ```src/views/images/``` folder into ```dist/views/images```.
    * Rename original ```pizzeria.jpg``` to ```pizzeria-large.jpg```, so that it will be compressed and resized to 720 * 540 px into ```dist/```.
    * Resize ```pizzeria-large.jpg``` to ```pizzeria-thumbnail.jpg``` with 115 * 86 px.
    * Resize ```pizzeria-large.jpg``` to ```pizzeria.jpg``` with 360 * 270 px.
3. Pizza.html

    As I observed, when ```pizza.html``` is loaded in desktop view, the size of ```pizzeria.jpg``` is 360 * 270 px, but when width of browser's view port is smaller than 992 px, the size of ```pizzeria.jpg``` will be changed to 720 * 540 px. So I decide to make this image in responive way.

    **Solution:** 
    ```html
      <img src="images/pizzeria.jpg" alt="pizzeria" class="img-responsive pizzeria-normal">
      <img src="images/pizzeria-large.jpg"  alt="pizzeria" class="img-responsive pizzeria-large"/>
    ```
    ```css
    .pizzeria-large {
      display: none;
    }

    @media (max-width: 992px) and (min-width: 423px) {
      .pizzeria-normal {
        display: none;
      }
      .pizzeria-large {
        display: block;
      }
    }
    ```

## License
This project is Copyright (c) 2017 Yuguo LI. It is free software, and may be redistributed under the terms specified in the [LICENSE](LICENSE) file.