/*
 * @Author: your name
 * @Date: 2020-06-12 14:21:40
 * @LastEditTime: 2020-06-13 09:51:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vsworkspace\mis\js\localStorage.js
 */ 


// 全局变量，用于查询存储在localStorage中的数据
var KEY = "LOCAL_DATA";

//初始化LocalStorage
function initLocalStorage(){
    if(!getLocalStorage()){
        let data = [];
        data = sourceData.slice();
        data = JSON.stringify(data); 
        localStorage.setItem(KEY,data)
    }

}
//获得localStorage的值
function getLocalStorage(){
    return JSON.parse(localStorage.getItem(KEY))
}

//更新localStorage的值
function updateLocalStorage(product,region,row,index,value){
    let localData = getLocalStorage();
    let dataLength = 0 ;
    for(let i = 0;i<localData.length;i++){
        if(localData[i]["product"] === product 
            && localData[i]["region"] === region
        ){
            dataLength++;
        }
    }
    console.log(dataLength);
    let data= updataSelectLocalStorage(localData,product,region,index,value,dataLength);
    localStorage.setItem(KEY,JSON.stringify(data))
}


function updataSelectLocalStorage(localData,product,region,index,value,length){
    let times = 0 ; 
    for(let i = 0;i<localData.length;i++){
        if(localData[i]["product"] === product 
            && localData[i]["region"] === region
        ){ 
            times++;     
            if(times == length  ){
                localData[i]["sale"][index] = value;
                console.log(i);
                console.log(index);
                console.log(localData[i]["sale"][index]);
                break;
            }     
           
        }
    }
    return localData;
   

}