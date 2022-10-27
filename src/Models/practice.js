// const { count } = require("../../../project3-book-management/src/Models/userModel")
//const { count } = require("../../../project3-book-management/src/Models/userModel")


// let input = "codezinger univesity"
// function myFunction(input){
//     count=0
//     for(let i =0; i<input.length;i++){
//         count++   
//         // console.log(count)
// }
// return count
// }

// console.log(myFunction("codezinger university"))

// function myFunction(input){
// let arr=[]

// for(i=0;i<input.length;i++){
//   for(j=i+1;j<input.length;j++){
//     if(input[j]!=input[j+1]){
//         arr.push(input[i])

//     }}
// }return arr
// }

// console.log(myFunction(['hello', 'world', 'hello']))



// Array=[10,7437,69,6647,898]
// Array.forEach(function(element,index,arr){
//   console.log(arr[index]+100)
// })

// let input=[1,2,3]
 
// function func(){
//   let sum =0
//   for(let element of input){
//    sum=sum+element}
//   for (let ele of input){
//     if(sum/2==ele){
//       return "yes"}
    
//   }return "No"
// }
// console.log(func())

// let input=    [8 ,4, 2, 1,5, 4, 2 ,1, 2, 3]
// function func(){
//   count=0
//   for(let i=0;i<input.length-1;i++){
//    for(let j=1;j<input.length;j++){
//     if((i+j)==input[i]+input[j])

//       count++
//    } 
//   }return count
// }
// console.log(func())

// let input=    [  1, 2, 5, 2, 2, 5]
// let a=6
// function func(){
//   let arr=[]
//   // let count=0
//   for(let i=0;i<a;i++){
//     let count=0
//     for(let j=0;j<a;j++){
//       if(input[i]==input[j])
//          count++}
//    arr[i]=count 
//  // console.log(count) 
//  } 
//    return arr}

// console.log(func())


// let input=[1 ,3 ,4 ,8,7 ,9 ,9 ,10]
// let k=6
// let b;
// function func(){

//   input=input.sort(function(a,b){return a-b})
//   console.log(input)
// for(let i=0;i<8;i++){
// if(k<=input[i]){
// return input[i]}
  
// }
 

// }
// console.log(func())

// let input= [1 ,5 ,6 ,4 ,-1 ,5 ,10]
// function func(){
//   let temp=[]
//   let count=0
//   for (let i=0;i<input.length;i++){
//     for (let j=0;j<input.length;j++){
//       let number=input[i]+input[j]
//         let index=input.indexOf(number)
//         if(index != -1){
//             if(temp.indexOf(`${input[i]}+${input[j]}`)==-1){
//                 count++;
//                 console.log(count)
//             }}}}
//           } console.log(func())


// let input= "cocodeed"
// function func(b){
//   for(let ele of input){
//   let ind=input.indexOf(input)
//   if(ind==-1){
//     break;

//   }
//   input=input.replace(b,"")
//   }
// if(input.length==0)
// return("Yes")
// else
// return("No")
// }
// console.log(func("code"))

a= ["h","e","l","l","o","","w","o","r","l","d","","h","e","l","l","o"]
b='hello'
function func(b) {
  let arr=[];
     
     //console.log(x)
     for(let i=0;i<a.length;i++){
         if(a[i]!=b){
             arr.push(a[i])
         }
     }return arr.join(' ')
 }
 console.log(func("b"))

 
