const fs = require('fs');

try {
  const fileContent = fs.readFileSync('example.txt', 'utf8');

  const words = fileContent.split(' ');
  const p=[]
  for(let i=0; i<words.length; i++){
    if(words[i].length>0){
        p.push(words[i])
    }
}

// fs.writeFile('example.txt', p.join(" "), 'utf8', (err) => {      //callback function is important 
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('File has been written');
//   });

fs.writeFileSync('example.txt', p.join(" "), 'utf8') //sync function 

} catch (err) {
  console.error('Error reading file:', err);
}
