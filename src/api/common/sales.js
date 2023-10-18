const { ifError } = require('node:assert');
const fs = require('node:fs');

const filePath = "../../db/sales.json";
let salesArray = [];
let sales = {};

const salesFile = `${__dirname}/${filePath}`;

const getSales = () => {
    //console.log(`${__dirname}/${filePath}`);
    salesArray = fs.readFileSync(salesFile,'utf-8');
    //console.log(salesArray);
    return JSON.parse(salesArray);
}
const getSaleById = (id)=>{
    const sales = getSales();
    if (sales.length===0) {
        return sales;
    }
    return sales.find(sale => sale.id === id);
}

const createSale = (sale)=>{
    const sales = getSales();

    if (sales.length===0) {
        sales.push({id:1,...sale});
    } else {
        sales.push({id:sales[sales.length-1].id+1,...sale})
    }
    
    const stat = fs.writeFileSync(salesFile,JSON.stringify(sales),'utf-8');
    return sales[sales.length-1].id;
}

const removeSale=(id)=>{
    let sales = getSales();
    sales = sales.filter(sale=>sale.id!==+id);
    console.log(sales);
    fs.writeFileSync(salesFile,JSON.stringify(sales),'utf-8');
    return 200;
}
module.exports.Sales = {
    salesArray,
    getSales,
    getSaleById,
    createSale,
    removeSale
};