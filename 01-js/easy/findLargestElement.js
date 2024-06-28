/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
   let biggest_element=numbers[1];
   for(let i=0; i<numbers.length; i++){
    if(biggest_element<numbers[i]){
        biggest_element=numbers[i]
    }
   }
    return biggest_element;
}

module.exports = findLargestElement;