const promise =  new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, 'delay is fun');
})

Promise.delay = (value, ms) => {
    return new Promise((resolve, reject) => {
        if(value instanceof Promise) {
            value
            .then(
                res => setTimeout(() => resolve(res), ms),
                err => setTimeout(() => reject(err), ms)
            )            
        } else {
            setTimeout(() => resolve(res), ms)
        }
    })
}

Promise
    .delay(promise, 6000)
    .then(
        res => console.log(res),
        err => console.error(err)
    )