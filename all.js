const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, 'one')
})
  
const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'two')
})

const promise3 = 3

const promise4 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'four')
})

const promise5 = Promise.resolve(5)


const promiseArray = [promise1, promise2, promise3, promise4, promise5]


Promise.myAll = array => {
    return new Promise((resolve, reject) => {
        const results = []
        let completed = 0
        array.forEach((value, index) => {
            if(value instanceof Promise){
                value
                .then(
                    res => {
                        results[index] = res
                        completed++
                        if(completed === array.length) {
                            resolve(results)
                        }
                    },
                    err => reject(err)
                )
            } 
            else {
              	results[index] = value
                completed++
                if(completed === array.length) {
                    resolve(results)
                }
            }
        })  
    })
}

Promise
    .myAll(promiseArray)
    .then(results => console.log(results))