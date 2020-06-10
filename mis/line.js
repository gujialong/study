/*
 * @Author: your name
 * @Date: 2020-06-06 13:04:00
 * @LastEditTime: 2020-06-11 00:04:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vsworkspace\mis\line.js
 */
function getBroken(data) {
    //定义一个折线函数
    //暂时只显示华东地区的
    //1.定义好折线图绘制区域，轴的高度，宽度
    console.log(data[0].region);

    let axisWidth = 850;
    let axisHeight = 450;
    let startX = 53,
        startY = 450;
    //2.定义好每一个数据点的直径，颜色，线的颜色，宽度
    let dataColor = "#ff0000",
        connectLineColor = "#00faff";

    if (data[0].region == '华东') {
        connectLineColor = "#00faff";
    } else if (data[0].region == '华南') {
        connectLineColor = "#fa00ff";
    } else {
        connectLineColor = "#00ff00";
    }

    let connectLineWidth = 5;
    //定义每两个数据点之间的间隔距离
    let dataInterval = 60;

   
    let ctx = document.getElementById("canvas").getContext("2d");

     //创建X轴Y轴
     ctx.strokeStyle ="black";
    ctx.moveTo(startX, startY);
    ctx.lineTo(axisWidth, startY);
    ctx.stroke();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, -axisHeight);
    ctx.stroke();
    let dataSale = [];
    data = data.reduce((cur, next) => {
        dataSale = [...next.sale];
        return cur;
    }, [])

    //获得最大值

    let max = Math.max(...dataSale);
    for (let i = 0; i < dataSale.length; i++) {
        //第一个点  23  +   5 *1 + 10 *1 
        let dataX = startX + connectLineWidth * (i + 1) + dataInterval * (i + 1);
        let dataY = startY - dataSale[i];
        let nextX = startX + connectLineWidth * (i + 2) + dataInterval * (i + 2)
        let nextY = startY - dataSale[i + 1];
        //画数据点
        ctx.fillStyle = dataColor;
        ctx.beginPath();
        ctx.arc(dataX, dataY, connectLineWidth, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
        //连接线
        ctx.strokeStyle = connectLineColor;
        ctx.beginPath();
        ctx.moveTo(dataX, dataY);
        ctx.lineTo(nextX, nextY);
        ctx.stroke();

        //创建文本
        ctx.fillStyle = "black";
        //创建0点
        ctx.font = "20px Arial "
        ctx.fillText(0, startX, startY + 30);
        ctx.fillText(i + 1 + '月', dataX, startY + 30);
        //创建Y上的文字
        //23
        let num = 0;
        dataSale.forEach((data) => {
            num += data;
        })
        let average = Math.ceil(num / 12 / 2);
        ctx.fillText(average * i, startX - 40, startY - average * i);

    }
}