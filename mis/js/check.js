/*
 * @Author: your name
 * @Date: 2020-06-11 15:48:00
 * @LastEditTime: 2020-06-11 16:03:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vsworkspace\mis\js\check.js
 */ 
let areanum = 1;
let productnum = 1;

    function aaa() {
        if (event.target.checked == true) {
            areanum++;
            console.log(event.target.value);
        } else {
            areanum--;
        }
        if (areanum == area_option.length) {
            select_area_all.item(0).checked = "checked";
        } else {
            select_area_all.item(0).checked = "";
        }
    }
    //地区全选


    function selectAreaAll() {
        let selectAreaAll = event.target.checked;
        //单击全选改变下面的三个checkbox
        if (selectAreaAll) {
            for (let i = 0; i < area_option.length; i++) {
                area_option[i].checked = "checked"
                areanum = area_option.length;
                init();
            }
        } else {
            for (let i = 0; i < area_option.length; i++) {
                area_option[i].checked = "";
                areanum = 0;
                init();
            }
        }
    }

    function productChange() {
        if (event.target.checked == true) {
            productnum++;
            console.log(event.target.value);
        } else {
            productnum--;
        }
        if (productnum == product_option.length) {
            console.log(product_option.length);
            console.log(select_product_all.item(0).checked);

            select_product_all.item(0).checked = "checked";
        } else {
            select_product_all.item(0).checked = "";
        }
    }

    function selectProductAll() {
        let selectProductAll = event.target.checked;
        console.log(selectProductAll);

        //单击全选改变下面的三个checkbox
        if (selectProductAll) {
            for (let i = 0; i < product_option.length; i++) {
                product_option[i].checked = "checked"
                productnum = product_option.length;
                init();

            }
        } else {
            for (let i = 0; i < product_option.length; i++) {
                product_option[i].checked = "";
                productnum = 0;
                init();
            }
        }
    }