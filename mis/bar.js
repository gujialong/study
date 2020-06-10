/*
 * @Author: your name
 * @Date: 2020-06-06 13:32:37
 * @LastEditTime: 2020-06-10 17:22:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edget
 * @FilePath: \vsworkspace\mis\bar.js
 */
// class Chart{
//     constructor(w,h,axisX,axisY,interval) {
//         this.w = w;
//         this.h = h;
//         this.axisX = axisX;
//         this.axisY = axisY;
//         this.winterval = interval;
//         constructor
//     }
// }

function getBar(data) {
    console.log(data);

    //定义绘制图区域的宽度，高度，轴的宽度高度,起点
    let w = 900,
        h = 500,
        axisX = 850,
        axisY = 450,
        startX = 25,
        startY = 320;
    //定义柱子的颜色，轴的颜色
    let barColor = "#0DAFF4",
        axisColor = "rgb(0,99,99)";
    //定义柱子的宽度，及每根柱子的间距
    let barWidth = 32,
        interval = 20;
    //获得柱状图中的最大值Max
    /**
     * 
     */
    let svgStart = '<svg width=' + w + ' height=' + h + ' version="1.1" xmlns="http://www.w3.org/2000/svg">';
    let svgEnd = '</svg>';
    let row = `<line x1=${startX} y1=${startY} x2=${startX + axisX} y2=${startY} style=stroke:black;stroke-width:1  ></line>`
    let col = `<line x1=${startX} y1=${startY} x2=${startX } y2=${20}  style=stroke:black;stroke-width:1></line>`
    let svgT = svgStart + row + col;
    //遍历数组

    for (let i in data) {
        for (let j in data[i].sale) {
            let rectX = startX + interval * j + barWidth * j;
            let rectY = startY - data[i].sale[j];
            let dataValue =`<text x=${rectX} y=${rectY -10}>${data[i].sale[j]}</text>`
            let monthValue =`<text x=${rectX} y=${startY + 20}>${parseInt(j)+1 }月</text>`
            
            console.log(data[i].sale[j]);
            //进行柱状画图
            let bar = `<rect x=${rectX} y=${rectY} width=${barWidth} height=${data[i].sale[j]} style=fill:rgb(0,0,255);stroke:rgb(0,99,99);stroke-width:1></rect>`
            svgT = svgT + bar +dataValue +monthValue;
        }
    }
    svgT += svgEnd;
    return svgT;
}