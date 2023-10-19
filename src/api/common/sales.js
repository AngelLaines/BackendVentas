const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const fs = require('node:fs');

const bucket = 'cyclic-perfect-pig-fashion-us-west-1';
let key = 'tmp/sales';

let salesArray = [];
let sales = {};


const getSales = async (file) => {
    //console.log(`${__dirname}/${filePath}`);
    salesArray = await s3.getObject({
        Bucket:bucket,
        Key: saleFile(file)
    }).promise();
    console.log(salesArray);
    return JSON.parse(salesArray);
}
const getSaleById = async (id,file)=>{
    const sales = await getSales(file);
    if (sales.length===0) {
        return sales;
    }
    return sales.find(sale => sale.id === id);
}

const createSale = async (sale,file)=>{
    const sales = await getSales(file);

    if (sales.length===0) {
        sales.push({id:1,...sale});
    } else {
        sales.push({id:sales[sales.length-1].id+1,...sale})
    }
    
    await s3.putObject({
        Body:JSON.stringify(sales),
        Bucket:bucket,
        Key: saleFile(file)
    }).promise();

    //const stat = fs.writeFileSync(saleFile(file),JSON.stringify(sales),'utf-8');
    return sales[sales.length-1].id;
}

const removeSale= async (id,file)=>{
    let sales = await getSales(file);
    sales = sales.filter(sale=>sale.id!==+id);
    console.log(sales);
    fs.writeFileSync(saleFile(file),JSON.stringify(sales),'utf-8');
    return 200;
}

const saleFile = (file)=>{
    
    return `${key+file}.json`;
}
module.exports.Sales = {
    salesArray,
    getSales,
    getSaleById,
    createSale,
    removeSale
};