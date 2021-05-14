import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Daniel Plainview',
        email: 'daniel@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Vergiliy',
        email: 'vergiliy@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users