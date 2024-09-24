const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to Stock portfolio analysis API');
});

function calculateReturns(boughtAt, marketPrice, quantity) {
  return (marketPrice - boughtAt) * quantity;
}

app.get('/calculate-returns', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let marketPrice = parseFloat(req.query.marketPrice);
  let quantity = parseFloat(req.query.quantity);

  let returns = calculateReturns(boughtAt, marketPrice, quantity);
  res.send(returns.toString());
});

function totalreturns(stock1, stock2, stock3, stock4){
  let result = stock1 + stock2 + stock3 + stock4;
  return result;
}
app.get('/total-returns', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  res.send(totalreturns(stock1, stock2, stock3, stock4).toString());
});

function calculateReturnPercentage(boughtAt, returns){
  let result = (returns / boughtAt) * 100;
  return result;
}
app.get('/calculate-return-percentage', (req,res) =>{
  let boughtAt = parseFloat(req.query.boughtAt);
  let returns = parseFloat(req.query.returns);
  res.send(calculateReturnPercentage(boughtAt, returns).toString());
})

function calculateTotalReturnPercentage(stock1, stock2, stock3, stock4){
  let result = stock1 + stock2 + stock3 + stock4;
  return result;
}
app.get('/total-return-percentage', (req,res) =>{
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  res.send(calculateTotalReturnPercentage(stock1, stock2, stock3, stock4).toString());
})

function getStockStatus(returnPercentage) {
  if (returnPercentage > 0) {
      return 'Profit';
  } else {
      return 'Loss';
  }
}
app.get('/status', (req, res) => {
 let returnPercentage = parseFloat(req.query.returnPercentage);
 res.send(getStockStatus(returnPercentage).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
