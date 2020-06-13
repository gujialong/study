/*
 * @Author: your name
 * @Date: 2020-06-11 15:36:26
 * @LastEditTime: 2020-06-13 13:18:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vsworkspace\mis\js\index.js
 */



let form = document.getElementById('mis');
let area = document.getElementById('select-area');
let tab_box = document.getElementById('table-wrapper');
let shop_type = document.getElementById('shop-type');
let area_option = document.querySelectorAll('input[name=area_option]');
let product_option = document.querySelectorAll('input[name=mis_type]');
let select_area_all = document.getElementsByClassName('selectAreaAll');
let select_product_all = document.getElementsByClassName('selectProductAll');
//显示折线图
let broken = document.getElementsByClassName("broken");
let bar = document.getElementById("bar-wrapper");

function load() {
    initLocalStorage();

    init()
}
//渲染表格
let table_title_list = ['商品', '地区', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']


//取得selct的值
area.onchange = function (event) {
    init();
}
shop_type.onchange = function (event) {
    init();

}
//获得数据
let browerData = getLocalStorage() || sourceData;
//填充数据
function fillData() {
    let value1 = getSelectValue(true),
        value2 = getSelectValue(false);
    // console.log(value1);
    // console.log(value2);

    let returnData = browerData.filter((data, index, arr) => {
        let areaData = value1.filter((item) => {
            return data.region == item
        })
        let productData = value2.filter((item) => {
            return data.product == item
        })
        if (areaData.length > 0 && productData.length > 0) {
            // console.log(areaData);
            // console.log(productData);

            return productData
        }

    })
    // console.log(data);

    return returnData;

}

//获得选择的值
function getSelectValue(isarea) {
    //如果是地区
    let data = new Array();
    if (isarea) {
        for (let i = 0; i < area_option.length; i++) {
            // console.log(area_option[i].checked);
            if (area_option[i].checked) {
                data.push(area_option[i].value)
                // console.log(data);

            }
        }
    } else {
        for (let i = 0; i < product_option.length; i++) {
            // console.log(product_option[i].checked);
            if (product_option[i].checked) {
                data.push(product_option[i].value)
                // console.log(data);

            }
        }
    }
    return data;
}

//表格初始化，渲染表头
function init() {
    tab_box.removeChild(tab_box.childNodes[0]);
    let table = document.createElement('table');
    let header = table.createTHead();
    // let row = header.insertRow(0);
    for (let i in table_title_list) {
        let th = document.createElement('th');
        // let th = row.insertR(row.cells.length);
        th.innerHTML = table_title_list[i];
        // row.append(th);
        header.append(th)
    }

    let arr = fillData();


    for (let i = 0; i < arr.length; i++) {
        let tr = table.insertRow(table.rows.length);
        let td0 = tr.insertCell(0);
        td0.innerHTML = arr[i].product;
        let td1 = tr.insertCell(1);
        td1.innerHTML = arr[i].region;
        for (let j = 0; j < 12; j++) {
            let tdn = tr.insertCell(j + 2);
            tdn.innerHTML = arr[i].sale[j];
        }

    }
    tab_box.appendChild(table);

    let trs = [...document.getElementsByTagName("tr")];
    let compont = true,
        isEdit = true;

    let trData = [{
        product: "",
        region: "",
        sale: []
    }];
    let curIndex;
    for (let i = 0; i < trs.length; i++) {
        // console.log(trs.length);
        trs[i].onmouseover = function () {
            let tds = this.getElementsByTagName("td");
            trData[0].product = tds[0].innerText;
            trData[0].region = tds[1].innerText;

            for (let j = 2; j < tds.length; j++) {
                trData[0].sale[j - 2] = tds[j].innerText;
                // trData[]
                //给每个td添加编辑事件
                tds[j].onmouseenter = function () {
                    tds[j].setAttribute("class", "edit");
                }
                tds[j].onmouseleave = function () {
                    tds[j].setAttribute("class", "");

                }
                tds[j].onclick = function () {
                    curIndex = j;
                    console.log(curIndex);
                    
                    console.log(tds[i]);
                    if (isEdit) {
                        let oldData = this.innerText;
                        console.log(oldData);
                        let _div = document.createElement("div");
                        let input = document.createElement("input");
                        let save = document.createElement("button");
                        let cancel = document.createElement("button");
                        save.type = "button";
                        cancel.type = "button"
                        save.setAttribute("class", "save");
                        cancel.setAttribute("class", "cancel");
                        _div.setAttribute("class", "ache");
                        input.setAttribute("class","curValue");
                        input.type = "number";
                        input.value = this.innerText;
                        this.innerHTML = "";

                        var _this = this;
                        input.onblur = function () {
                            isEdit = false;
                            // e.stopPropagation();

                        }
                        _div.append(input);
                        _div.append(save);
                        _div.append(cancel);

                        this.append(_div)
                        input.focus();
            

                        save.addEventListener('click', (e) => {
                            console.log(i, j);

                            isEdit = saveInput(this, input.value, isEdit, i, j);
                            broken.innerHTML = getBroken(trData);
                        });
                        // cancel.onclick = cancelInput(_this,_div,input.value)
                        cancel.addEventListener('click', (e) => {
                            isEdit = cancelInput(this, input.value, isEdit);
                        });
                        //监听键盘事件

                        document.addEventListener("keydown",function(){
                            console.log(event.keyCode);
                            if(event.keyCode == 27 ){
                                isEdit= cancelInput(_this, input.value, isEdit);
                            }
                            
                        })
                        document.addEventListener("keydown",function(){
                            console.log(event.keyCode);
                            if(event.keyCode == 13 ){
                                isEdit = saveInput(_this, input.value, isEdit, i, j);
                                broken.innerHTML = getBroken(trData);
                            }
                            
                        })
                    }

                }

                broken.innerHTML = getBroken(trData);
                bar.innerHTML = getBar(trData);
            }

            // console.log(trData);
           
        }
    }
}

function saveInput(_this, value, isEdit, row, cel) {
    // _this.removeChild(child);
    let trds = [...document.getElementsByTagName("td")]
    console.log(cel);
    let product, region;
    product = trds[row * 14].innerHTML;
    region = trds[row * 14 + 1].innerHTML;
    console.log(product);
    console.log(region);

    _this.innerHTML = value;

    console.log(_this);
    isEdit = true;
    console.log(isEdit);
    event.stopPropagation();
    updateLocalStorage(product, region,row,cel - 2, value);
    return isEdit;
}

function cancelInput(_this, oldData) {
    // _this.removeChild(child);
    _this.innerHTML = oldData;
    console.log(_this);
    isEdit = true;
    console.log(isEdit);
    event.stopPropagation();
    return isEdit;
}

//折线图显示
let data_broken = function ccc() {
    let new_array = [];
    browerData.forEach((cur, index, arr) => {
        if (cur.region == '华东' && cur.product == "手机") {
            new_array.push(cur);
        }

    })
    return new_array;
}
// broken.innerHTML = getBroken(data_broken());
// bar.innerHTML = getBar(data_broken());