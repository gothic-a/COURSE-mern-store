const base64_encode = (string) => {
    const buff = new Buffer(string)
    const encoded = buff.toString('base64')

    return encoded
}

export default base64_encode