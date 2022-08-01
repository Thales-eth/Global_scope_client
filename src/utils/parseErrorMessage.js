const parseErrorMessage = (data) => {

    let aux = data.split('Expected: ')
    let aux2 = data.split('Received: ')

    aux.shift()
    aux2.shift()

    aux = aux.map(e => e.split(" ")[0])
    aux2 = aux2.map(e => e.split(" ")[0])

    let expectArr = []

    aux.forEach((e, i) => {
        expectArr.push(`Expected ${e}, received ${aux2[i]}`)
    })

    let finalResult = expectArr.join(" ")

    return finalResult
}

export default parseErrorMessage