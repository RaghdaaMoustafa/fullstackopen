const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
}
const result = sum(1, 5)
console.log(result)
console.log(sum(2,6))

const t = [1, 2, 3]
console.log(t.map(p => p * p))


const Total = (props) => {
    let sum=0
    props.forEach(element => {sum+=element});
    return `The total number of excersices is ${sum}` 
  }
const array=[1,2,3]
console.log(Total(array))
