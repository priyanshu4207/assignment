/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let price = Array(transactions.length).fill(0); // Initialize price array with zeros
  let category = [];

  for (let i = 0; i < transactions.length; i++) {
    category.push(transactions[i].category);
  }

  const uniqueArray = [...new Set(category)];

  for (let i = 0; i < uniqueArray.length; i++) {
    for (let j = 0; j < transactions.length; j++) {
      if (transactions[j].category === uniqueArray[i]) {
        price[i] += transactions[j].price;
      }
    }
  }

  // Create an array of objects with category and totalSpent
  let result = uniqueArray.map((category, index) => ({
    category,
    totalSpent: price[index],
  }));

  return result;
}

module.exports = calculateTotalSpentByCategory;
