/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let str1=str.toLowerCase().replace(/[!?,. ]/g, '')
  let l=str1.length
  if(l==1){
    return true;
  }
  else if(l%2==0){
    if(str1.slice(0 , l/2)==str1.slice(l/2 , l ).split('').reverse().join('')){
      return true;
    }
    else{
      return false
    }
  }
  else if(l%2 !==0){
    if(str1.slice(0 , (l-1)/2)==str1.slice((l+1)/2 , l ).split('').reverse().join('')){
      return true;
    }
    else{
      return false;
    }
  }
  
}

module.exports = isPalindrome;
