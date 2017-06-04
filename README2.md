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