const model = require("../model/shopping");


const fetchCategory = (req, res) => {
model 
.category()
.then((categoryItems) => {
console.log(categoryItems)
    res.status(200).send({category: categoryItems});
  
  return;
})
.catch((error) => {
  console.error(error);
  res.send({
    error: "Something went wrong with the categories" | +error.message,
  })
})
};

module.exports = {
  fetchCategory
};