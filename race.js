const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, 'one')
})
  
const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'two')
})

const promise3 = 3

const promise4 = new Promise((resolve, reject) => {
    setTimeout(reject, 1000, 'four')
})

const promise5 = Promise.resolve(5)

/* const promise6 = new Promise((resolve, reject) => {
    reject('rej')
})
const promise7 = new Promise((resolve, reject) => {
    resolve('res')
}) */


const promiseArray = [promise1, promise2, promise3,  promise4, promise5]


/* const promiseArray2 = [promise6, promise7] */


Promise.myRace = array => {
    return new Promise((resolve, reject) => {
        let isTaskCompleted = false
        /* Loop continues its work and resolves other promises, but they have no effect. 
        Our Promise has already settled. 
        For it we added condition and resolve method will be called at once. */
        array.forEach( value => {
            if ( value instanceof Promise) {
                value
                .then(
                    res => {
                        if( !isTaskCompleted ) {
                            isTaskCompleted = true
                            resolve(res)
                        }
                    },
                    err => {
                        if( !isTaskCompleted ) {
                            isTaskCompleted = true
                            reject(err)
                        }
                    }
                )  
            }
            else {
                resolve(value) 
            }
        })
    })
}

Promise
    .myRace(promiseArray)
    .then(
        res => console.log(res),
        err => console.log(err)
    )