import crypto from 'crypto'

const toSignature = (string) => {
    const sha1 = crypto.createHash('sha1')
    sha1.update(string)

    return sha1.digest('base64')
}

export default toSignature