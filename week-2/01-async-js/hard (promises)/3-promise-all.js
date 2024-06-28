/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function wait1(t1) {
    let promise1=new Promise(function(resolves){
        setTimeout(resolves,t1*1000);
    });
    return promise1
}

function wait2(t2) {
    let promise2=new Promise(function(resolves){
        setTimeout(resolves,t2*1000);
    });
    return promise2
}

function wait3(t3) {
    let promise3=new Promise(function(resolves){
        setTimeout(resolves,t3*1000);
    });
    return promise3
}

function calculateTime(t1, t2, t3) {
    const start = Date.now();

    const promises = [
      wait1(t1),
      wait2(t2),
      wait3(t3)
    ];
  
    return Promise.all(promises)
      .then(() => {
        const end = Date.now();
        const duration = end - start;
        return duration;
      })
      .catch((error) => {
        console.error('At least one promise was rejected:', error.message);
      });
}

module.exports = calculateTime;
