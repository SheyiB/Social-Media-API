const MessagesModel = require('../models/messages.model')

class MessagesService {
    createMessage(messageDetails){
        return new Promise(async (resolve, reject) => {
            try{
                const message = await MessagesModel.create(messageDetails)
                if(!message){
                    return reject({code: 401, msg: 'message not created' })
                }
                return resolve(message)
            }
            catch(err){
                return reject(err)
            }
        })
    }

    getAllUserMessages(userid){
        return new Promise(async (resolve, reject) => {
            try{
                const message = await MessagesModel.find({to: userid})

                return resolve(message)
            }
            catch(err){
                return reject(err)
            }
        })
    }


    getConversation(user1, user2){
        return new Promise(async (resolve, reject) => {
            try{
                const message = await MessagesModel.find({$or: [{to: user1, from: user2}, {from: user2, to: user1}]} )

                return resolve(message)
            }
            catch(err){
                return reject(err)
            }
        })
    }

    updatemessage(messageid, body){
        return new Promise(async (resolve, reject) => {
            try{
                let message = await MessagesModel.findById(messageid)
                if(!message){
                    return reject({code: 404, msg: 'message not found' })
                }
                let newmessage = await MessagesModel.findByIdAndUpdate(messageid, body, {
                        new: true,
                        runValidators: true
                    })
                if(!newmessage){
                    return reject({code: 401, msg: 'Cannot create message'})
                }
                resolve(newmessage)
            }
            catch(err){
                reject(err)
            }
        })
    }

    deletemessage(messageid){
        return new Promise(async (resolve, reject) => {
            try{
                let message = await MessagesModel.findById(messageid)
                if(!message){
                    return reject({code: 404, msg: 'message not found' })
                }
                let newmessage = await MessagesModel.findByIdAndDelete(messageid)
                if(!newmessage){
                    return reject({code: 401, msg: 'Cannot delete message'})
                }
                resolve()
            }
            catch(err){
                reject(err)
            }
        })
    }
}

module.exports = messageService