/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/

function calculateTime(n) {
    let ans=0;
    const date =new Date();
    const t1=date.getTime()
    for(let i=0; i<n; i++){
        ans=ans+i;
    }
    const date2=new Date();
    const t2=date2.getTime();

    return t2-t1;
}

console.log(calculateTime(101))
console.log(calculateTime(100001))
console.log(calculateTime(1000000001))