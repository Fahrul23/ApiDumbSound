const {Transaction, User} = require('../../models/index')
const Joi = require('joi')

exports.getTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findAll({
      include: [
        {
            model: User,
            as: "User",
            attributes: {
              exclude: ['password','createdAt','updatedAt']
            },
        }, 
      ],
      attributes: {
        exclude: ['UserId','createdAt','updatedAt']
      }
    })
    res.status(200).send({
      message: "success",
      data: transaction
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
        status: "failed",
        message: "internal server error"
    })    
  }
}

exports.detailTransaction = async (req, res) => {
    const {id} = req.params;
    try {
      let transaction = await Transaction.findOne({
        where: {id},
        include: [
          {
            model:User,
            as: 'User',
            attributes: {
              exclude: ['password','createdAt','updatedAt']
            }
          }
        ],
        attributes: {
          exclude: ['UserId','createdAt','updatedAt']
        }
      })
  
      if(!transaction) {
        return res.status(404).send({
          message: "Transaction Not Found"
        })
      }
  
      res.status(200).send({
        message: "success",
        data: transaction
      })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            status: "failed",
            message: "internal server error"
        })
    }
}