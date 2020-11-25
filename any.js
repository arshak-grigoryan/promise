const promise1 = new Promise((resolve, reject) => {
    setTimeout(reject, 3000, 'one')
})
  
const promise2 = new Promise((resolve, reject) => {
    setTimeout(reject, 2000, 'two')
})

const promise3 = 15

const promise4 = new Promise((resolve, reject) => {
    setTimeout(reject, 1000, 'rejected')
})

const promise5 = Promise.resolve(22)


const promiseArray = [promise1, promise2, promise4]


Promise.myAny = array => {
    return new Promise( (resolve, reject) => {
        if(array.length === 0) {
        	resolve([])
        }  
        const results = []
        let counter = 0
        array.forEach( (value, index) => {
            if(value instanceof Promise) {
                value
                .then(res => resolve(res))
                .catch(err => {
                    results[index] = err
                    counter++
                    if(counter === array.length) {
                        // reject(new AggregateError([new Error('ERER')]))
                        // reject(new AggregateError(results))/
                        // reject(new AggregateError(new Error(results)))
                    }
                })                
            }
            else {
                resolve(value)
            }

        })
    })
}

Promise
    .myAny(promiseArray)
    .then(res => console.log(res))
    .catch(err => console.log(err))