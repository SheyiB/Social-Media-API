const UserModel = require('../models/userModel')

class UserService {
    signUp(userDetails){
        return new Promise(async (resolve, reject) => {
            try{
                const user = await UserModel.create(userDetails)
                if(!user){
                    return reject({code: 401, msg: 'User not created' })
                }
                return resolve(user)
            }
            catch(err){
                return reject(err)
            }
        })
    }

    login(email, password){
        return new Promise(async (resolve, reject) => {
            try{

                let user = await UserModel.find({"email":  email})
                console.log(user)

                if(!user){
                    return reject({code: 404, msg: 'Invalid Credentials'})
                }

                const matchPassword = await user[0].matchPassword(password)
                if(matchPassword == false){
                    return reject({code: 404, msg: 'Invalid Credentials'})
                }

                const token = user[0].getSignedJwtToken()

                return resolve(token)
            }
            catch(err){
                return reject(err)
            }
        })
    }



    getUser(userid){
        return new Promise(async (resolve, reject) => {
            try{
                const user = await UserModel.findById(userid)
                if(!user){
                    return reject({code: 404, msg: 'User not found' })
                }
                return resolve(user)
            }
            catch(err){
                return reject(err)
            }
        })
    }

    getAllUsers(){
        return new Promise(async (resolve, reject) => {
            try{
                const user = await UserModel.find()

                return resolve(user)
            }
            catch(err){
                return reject(err)
            }
        })
    }

    updateUser(userid, body){
        return new Promise(async (resolve, reject) => {
            try{
                let user = await UserModel.findById(userid)
                if(!user){
                    return reject({code: 404, msg: 'User not found' })
                }
                let newuser = await UserModel.findByIdAndUpdate(userid, body, {
                        new: true,
                        runValidators: true
                    })
                if(!newuser){
                    return reject({code: 401, msg: 'Cannot create User'})
                }
                resolve(newuser)
            }
            catch(err){
                reject(err)
            }
        })
    }

    deleteUser(userid){
        return new Promise(async (resolve, reject) => {
            try{
                let user = await UserModel.findById(userid)
                if(!user){
                    return reject({code: 404, msg: 'User not found' })
                }
                let newuser = await UserModel.findByIdAndDelete(userid)
                if(!newuser){
                    return reject({code: 401, msg: 'Cannot delete User'})
                }
                resolve()
            }
            catch(err){
                reject(err)
            }
        })
    }
}

module.exports = UserService