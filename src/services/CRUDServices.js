import db from '../models/index'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromCrypt = await hastUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromCrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber,
                // positionId: DataTypes.STRING,
                // image: DataTypes.STRING,
            })
            let allUser = await db.User.findAll()
            resolve(allUser)
        } catch (e) {
            reject(e)
        }
    })

}

let hastUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true
            })
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })
            if (user) { resolve(user) }
            else { resolve({}) }
        } catch (e) {
            reject(e)
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                user.gender = data.gender
                user.phoneNumber = data.phoneNumber
                await user.save()
                let allUser = await db.User.findAll()
                resolve(allUser)
            } else {
                resolve()
            }
        } catch (e) {
            console.log(e)
        }
    })
}

let deleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // await db.User.destroy({
            //     where: { id: id },
            //     raw: true
            // })
            // let allUser = await db.User.findAll()
            // resolve(allUser)
            let user = await db.User.findOne({
                where: { id: id },
                raw: false
            })
            if (user) {
                await user.destroy()
                let allUser = await db.User.findAll()
                resolve(allUser)

            }
            else {
                resolve()

            }
        } catch (e) {
            console.log(e)
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}