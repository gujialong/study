/*
 * @Author: your name
 * @Date: 2020-06-06 13:32:37
 * @LastEditTime: 2020-06-06 16:55:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vsworkspace\mis\bar.js
 */ 
function getBar(data){
    console.log(data);
    
    //定义柱状图
    //定义好柱状图绘制区域的高度，宽度，轴的高度，宽度
    let w = 550,
    h = 350,
    axisX = 500,
    axisY = 300,
    startX = 25,
    startY = 325;
    //定义每一个柱子的宽度及柱子的间隔宽度
    let barWidth = 32,
        interval = 9;
    //定义好柱子的颜色，轴的颜色
    let barColor = "#0DAFF4",
    axisColor = "rgb(0,99,99)";
    //拿到柱状图中的最大值Max
    let max = data[0].num;
    for (let i in data){
        if(data[i].num> max){
            max = data[i].num;
        }
    }
    console.log(max);
    
    //根据Max和你用来绘制柱状图图像区域的高度,进行一个数据和像素的折算比例
    var percent = 1;
    var svgStart = '<svg width=' + w + ' height=' + h + ' version="1.1" xmlns="http://www.w3.org/2000/svg">';
    var svgEnd = '</svg>';
    // 绘制横轴及纵轴
    var row = "<line x1=" + startX + " y1=" + startY + " x2=" + (startX + axisX) + " y2=" + startY + ' style="stroke:rgb(0,99,99);stroke-width:1"/>';
    var col = "<line x1=" + startX + " y1=" + startY + " x2=" + startX + " y2=" + (startY - axisY) + ' style="stroke:rgb(0,99,99);stroke-width:1"/>';
    // 遍历数据，计算将要绘制柱子的高度和位置，绘制每一个柱子
    var svgT = svgStart + row + col;
 
    for (let i = 0; i < data.length; i++) {
 
        let rectStartX = startX + interval * (i + 1) + barWidth * i;
        let rectStartY = startY - data[i].num;
        
        var bar = "<rect x=" + rectStartX + " y=" + rectStartY + " width=" + barWidth + " height=" + data[i].num + ' style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>';
        svgT += bar;
        var num= "<text x=" + rectStartX + " y =" + rectStartY + " fill=black   > "+ data[i].num + " </text>"
        var name= "<text x=" + rectStartX + " y =" + (startY + 20)  + " fill=black   > "+ data[i].name + " </text>"
        svgT += num;
        svgT += name;
    }
    svgT += svgEnd;
 
    return svgT;
}