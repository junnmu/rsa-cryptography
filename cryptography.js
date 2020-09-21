const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function verifyPrimality(a) {
    if (a % 2 == 0) {
        if (a == 2) {
            return true
        }
    }
    else {
        let div = 3
        while (div * div <= a) {
            if (a % div == 0) {
                return false
            }
            else {
                div += 2
            }
        }
        if (div * div > a) {
            return true
        }
    }
}

function greatestCommonDivisor(a, b) {
    while (b != 0) {
        let mod = a % b
        a = b
        b = mod
    }
    return a
}

function leastCommonMultiple(a, b) {
    return(a * b / greatestCommonDivisor(a, b))
}

function lambda(a, b) {
    return leastCommonMultiple(a - 1, b - 1)
}

function extendedEuclidean(lambdaN, e) {
    var auxA = lambdaN, auxB = lambdaN
    var auxC = e, auxD = 1
    var c2 = 0, d2 = 0

    while (auxC != 1) {
        c2 = (auxA - Math.floor((auxA / auxC)) * auxC) % lambdaN
        d2 = (auxB - Math.floor((auxA / auxC)) * auxD) % lambdaN
        if (c2 < 0) {
            c2 += lambdaN
        }
        else if (d2 < 0) {
            d2 += lambdaN
        }
        auxA = auxC
        auxB = auxD
        auxC = c2
        auxD = d2
        if (auxC == 0 || auxD == 0) {
            return console.error("Cannot calculate the private key with these numbers")
        }
    }
    return auxD;
}

function handleRSA(p, q, e) {
    if (p > 1 && q > 1) {
        if (verifyPrimality(p) === true && verifyPrimality(q) === true) {
            if (greatestCommonDivisor(e, lambda(p, q)) == 1) {
                if (extendedEuclidean((p - 1) * (q - 1), e)) {
                    return console.log("The private key 'd' is: ", extendedEuclidean((p - 1) * (q - 1), e))
                }
            }
            else{
                return console.error("The public key is not a co-prime of the lambda function")
            }
        }
        else {
            return console.error("P or Q is not prime")
        }
    }
    else {
        return console.error("P or Q is invalid. Enter natural numbers greater than 1")
    }
}

rl.question("Enter a prime number 'p': ", p => {
    rl.question("Enter a prime number 'q': ", q => {
        rl.question("Enter a public key 'e': ", e => {
            rl.write('\n')
            handleRSA(p, q, e)
            rl.close()
        })
    })
})
