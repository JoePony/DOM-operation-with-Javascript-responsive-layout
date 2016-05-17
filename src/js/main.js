requirejs.config({   //requireJS configuration 
    baseUrl:'./js',  //specify base path
    path:{
        index:'index'  //define
    }
});
requirejs(['jquery-1.11.3.min','index'],function(){});  //load main javascript
