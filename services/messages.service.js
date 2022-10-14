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
                const message = await MessagesModel.find({$or: [{"to": userid}, {"from": userid}]})

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
                const message = await MessagesModel.find({$or: [{"to": user1, "from": user2}, {"from": user2, "to": user1}]} )

                return resolve(message)
            }
            catch(err){
                return reject(err)
            }
        })
    }

}

module.exports =    MessagesService