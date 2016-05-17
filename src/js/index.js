define(['jquery-1.11.3.min'],function(){  
    /* to show adding dialog */
    var add={
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.add=document.querySelector('.add');  //adding link
            this.mainInner=document.querySelector('.main-inner');
        },
        bind:function(){
            var _self=this;
            var add=_self.add;
            var length=_self.add.length;
            var addWrapper=document.querySelectorAll('.add-wrapper');  //adding wrapper
            _self.mainInner.addEventListener('click',function(e){
                if(hasCls(e.target, 'add-resource')){
                    for(var i=0,len=document.querySelectorAll('.add-wrapper').length; i<len; i++){  //get length actively
                        if( hasCls(document.querySelectorAll('.add-wrapper').item(i),'add-wrapper-curr') ){
                            removeCls(document.querySelectorAll('.add-wrapper').item(i),'add-wrapper-curr');   //hide other current add-box
                            break; //break loop
                        }
                    }
                    var parent=findParent(e.target,'.add-wrapper'); 
                    addCls(parent,'add-wrapper-curr');  //show add-box
                    e.preventDefault();
                }
            });
        }
    };
    add.init();  //execute

    /* to add resources */ 
    var addBtn={
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.addBtn=document.querySelectorAll('.btn-add');  //adding button
            this.cloneItem;
            this.mainList=document.querySelector('#mainList');
        },
        bind:function(){
            var _self=this;
            this.mainList.addEventListener('click',function(e){
                var target=e.target;
                if( hasCls(target, 'btn-add') ){
                    var addWrapper=findParent(target,'.add-wrapper');
                    var addInput=findParent(target,'.add-box').querySelector('.input-add');
                    var addedNames=xssCheck(addInput.value).trim();
                    if(isBlank(addedNames)){  //to avoid input something blank
                        addInput.setAttribute('placeholder','Please type in something or click close');
                        return false;
                    }

                    var arrNames=addedNames.split(','); //creating array by splitting input content with , whether or not include ,

                    var parent=findParent(target,'.add-wrapper'); //parent node of resource items
                    var operations=findParent(target,'.operations');
                    for(i in arrNames){ //loop resource names
                        if(isBlank(arrNames[i])){  //ignore if name is blank
                            continue;
                        }
                        addedName=arrNames[i].trim();
                        _self.cloneItem=document.getElementsByClassName('resource-item')[0].cloneNode(true);  //clone resource dom that is already exisent 
                        _self.cloneItem.children[0].innerHTML=addedName; //renew innerHTML of clone item
                        _self.cloneItem.children[1].title='delete '+addedName; //renew title of clone item
                        operations.appendChild(_self.cloneItem);  //append a new resource item 
                    }
                    addInput.value='';  //clear adding input
                    removeCls(addWrapper,'add-wrapper-curr'); //hide adding
                }
            },false);
        }
    };
    addBtn.init();   //execute
    
    /* to close adding dialog */ 
    var close={
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.close=document.getElementsByClassName('btn-close');  //closing button
            this.mainInner=document.querySelector('.main-inner');
        },
        bind:function(){
            var _self=this;
            var length=_self.close.length;
            _self.mainInner.addEventListener('click',function(e){
                var target=e.target;
                if( hasCls(target,'btn-close') ){
                    var parent=findParent(target,'.add-wrapper');  //adding dialog
                    removeCls(parent,'add-wrapper-curr'); //hide adding dialog
                }
            });
        }
    };
    close.init();   //executes

    /* to delete a resource */ 
    var del={
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.del=document.querySelector('.delete-icon');   //delete icon
            this.operations=document.querySelector('.operations');   //operations dom
            this.mainList=document.querySelector('#mainList');
        },
        bind:function(){
            var _self=this;
            var length=_self.operations.length;
            _self.mainList.addEventListener('click',function(e){
                if(hasCls(e.target,'delete-icon')){
                    e.target.parentNode.parentNode.removeChild(e.target.parentNode); //remove for more browsers
                }
            });
        }
    };
    del.init();   //execu

    /* to specify initial current switch tab and switch main part */ 
    var indexCurrInital=2;   //initial index
    addCls(switchTab[indexCurrInital],'curr');  //add current style
    addCls(switchBody[indexCurrInital],'curr'); //add current style

    /* to add agent */ 
    var addAgent={
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.btnAddAgent=document.querySelector('#btnAddAgent');
        },
        bind:function(){
            var _self=this;
            _self.btnAddAgent.addEventListener('click',function(e){
                var agentName=document.querySelector('#agentName'),
                    valueAgentName=xssCheck(agentName.value);    //filter xss
                var agentId=document.querySelector('#agentId'),
                    valueAgentId=xssCheck(agentId.value);    //filter xss
                var cloneItem=document.querySelectorAll('.list-item').item(1).cloneNode(true);  //clone a list item dom
                var mainList=document.querySelector('#mainList');
                if( !isBlank(valueAgentName) && !isBlank(valueAgentId) ){   //check if inputs are blank
                    cloneItem.querySelector('.agent-name').innerHTML=valueAgentName;  //reset innerHTML according to input value
                    cloneItem.querySelector('.agent-id').innerHTML=valueAgentId;  //reset innerHTML according to input value
                    
                    var resourceItem=cloneItem.querySelector('.resource-item');
                    var resourceItemAll=cloneItem.querySelectorAll('.resource-item');
                    for(var i=resourceItemAll.length; i>0; i--){
                        resourceItem.parentNode.removeChild( resourceItemAll[i-1] );   //remove resources
                    }

                    mainList.appendChild(cloneItem); //append a cloned list item dom

                    agentName.value='';  //clear the input value
                    agentId.value='';  //clear the input value
                    var parent=findParent(_self.btnAddAgent,'.add-wrapper');
                    removeCls(parent,'add-wrapper-curr');   //hide add-box
                    var countIdle=document.querySelector('#countIdle').innerHTML;
                    countIdle++; //plus idle count
                    document.querySelector('#countIdle').innerHTML=countIdle; //reset idle count
                }
                e.stopPropagation();
            });
        }
    }
    addAgent.init(); //execute

    /* auto height of main */ 
    var autoHeight={
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.main=document.querySelector('#mainInner');
            this.aside=document.querySelector('#aside');
        },
        bind:function(){
            if(this.main.offsetHeight < this.aside.offsetHeight){
                this.main.style.height=this.aside.offsetHeight+'px'; //auto change height in order to let the border complete
            }
        }
    };
    autoHeight.init();  //execute
});

/* function of adding class name for ele */ 
function addCls(ele,classN){
    if(!hasCls(ele,classN)){
        ele.className+=' '+classN; //add class name
    }
}

/* function of removing class name from ele */ 
function removeCls(ele,classN){
    ele.className=ele.className.replace(classN,'').replace(/\s{2}/,' ');
}

/* function of checking if ele has a certain class name */ 
function hasCls(ele,cls){
    // return (ele.className.indexOf(classN) == -1) ? false : true; //check whether or not has a certain class name
    if(ele.classList!==undefined){   //for browsers above IE 9
      return ele.classList.contains(cls);
    }else{                           //for old browsers
      var reg=new RegExp('^'+cls+'$|^'+cls+'\\s+|\\s+'+cls+'$|\\s+'+cls+'\\s+');  
      return reg.test(ele.className);
    }
}

/* switching when clicking */ 
var switchTab=document.getElementsByClassName('switchTab');  //switching tab
var switchBody=document.getElementsByClassName('switch-body');  //switching main part

/* function of switching navigation */ 
function switchNav(index){
    if(hasCls(switchTab[index],'curr')) return false;  //avoid click repeat current tab to switch
    for(var i=0,length=switchTab.length; i<length; i++){
        removeCls(switchTab[i],'curr');  //remove other current style of tab
        removeCls(switchBody[i],'curr');  //hide other switch main part
    }
    addCls(switchTab[index],'curr');  //add current style for clicking tab
    addCls(switchBody[index],'curr');  //show corresponding switch main part
}

/* find ele parent node according to class name */ 
function findParent(ele,classN){
    if(!document.querySelector(classN)){  //avoid to loop in case type class name incorrectly
        return false;
    }
    while( !hasCls(ele.parentNode, classN.substr(1)) ){ //cut the dot of class name, loop until find 
        ele=ele.parentNode;  
    }
    return ele.parentNode;
}

/* check if input value is completely blank */ 
function isBlank(str){
    return !/\S+/.test(str);
}

/* function of filter xss */ 
function xssCheck(str,reg){
    return str ? str.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) {
        if(b){
            return a;
        }else{
            return {
                '<':'&lt;',
                '&':'&amp;',
                '"':'&quot;',
                '>':'&gt;',
                "'":'&#39;',
            }[a]
        }
    }) : '';
}