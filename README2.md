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