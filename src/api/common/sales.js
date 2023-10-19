const { ifError } = require('node:assert');
const fs = require('node:fs');

let filePath = "../../tmp/";

let salesArray = [];
let sales = {};


const getSales = (file) => {
    //console.log(`${__dirname}/${filePath}`);
    salesArray = fs.readFileSync(saleFile(file),'utf-8');
    //console.log(salesArray);
    return JSON.parse(salesArray);
}
const getSaleById = (id,file)=>{
    const sales = getSales(file);
    if (sales.length===0) {
        return sales;
    }
    return sales.find(sale => sale.id === id);
}

const createSale = (sale,file)=>{
    const sales = getSales(file);

    if (sales.length===0) {
        sales.push({id:1,...sale});
    } else {
        sales.push({id:sales[sales.length-1].id+1,...sale})
    }
    
    const stat = fs.writeFileSync(saleFile(file),JSON.stringify(sales),'utf-8');
    return sales[sales.length-1].id;
}

const removeSale=(id,file)=>{
    let sales = getSales(file);
    sales = sales.filter(sale=>sale.id!==+id);
    console.log(sales);
    fs.writeFileSync(saleFile(file),JSON.stringify(sales),'utf-8');
    return 200;
}

const saleFile = (file)=>{
    console.log(filePath+`sales${file}.json`);
    return filePath+`sales${file}.json`;
}
module.exports.Sales = {
    salesArray,
    getSales,
    getSaleById,
    createSale,
    removeSale
};