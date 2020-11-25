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


const promiseArray = [promise1, promise2, promise3, promise4, promise5]


Promise.myAllSettled = array => {
    return new Promise( (resolve, reject) => {
        if(array.length === 0) {
        	resolve([])
        }    
        const results = []
        let completed = 0
        array.forEach( (element, index) => {
            if(element instanceof Promise){
                element
                .then(
                	res => results[index] = {status: 'fulfilled', value: res},
					err => results[index] = {status: 'rejected', reason: err}
                )
                .then(() =>{
                	completed++
                	if(completed === array.length) {
                        resolve(results)
                    }
                })       
            } else {
            	results[index] = {status: 'fulfilled', value: element}
            	completed++
            	if(completed === array.length) {
            	    resolve(results)
            	}
            }
        })
    })
}


Promise.myAllSettledViaAll = array => {
    return Promise.all(array.map(p => (
        Promise.resolve(p)
        .then(
            res => ( {status: 'fulfilled', value: res} ),
            err => ( {status: 'rejected', reason: err} )
        )
    )))
}


Promise
    .myAllSettled(promiseArray)
    .then(res => console.log(res))


Promise
    .myAllSettledViaAll(promiseArray)
    .then(res => console.log(res))