const {Music, Artist} = require('../../models/index')
const Joi = require('joi')

exports.getMusics = async (req, res) => {
  try {
    let musics = await Music.findAll({
      include: [
        {
            model: Artist,
            as: "Artist",
            attributes: {
              exclude: ['createdAt','updatedAt']
            },
        }, 
      ],
      attributes: {
        exclude: ['artistId','createdAt','updatedAt']
      }
    })
    res.status(200).send({
      message: "success",
      data: musics
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({
        status: "failed",
        message: "internal server error"
    })    
  }
}

exports.detailMusic = async (req, res) => {
  const {id} = req.params;
  try {
    let music = await Music.findOne({
      where: {id},
      include: [
        {
          model: Artist,
          as: 'Artist',
          attributes: {
            exclude: ['createdAt','updatedAt']
          }
        }
      ],
      attributes: {
        exclude: ['artistId','createdAt','updatedAt']
      }
    })

    if(!music) {
      return res.status(404).send({
        message: "Music Not Found"
      })
    }

    res.status(200).send({
      message: "success",
      data: music
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({
        status: "failed",
        message: "internal server error"
    })
  }
}


exports.addMusic = async (req, res) => {
  const artistId =  req.body.artistId
  const title =  req.body.title
  const year =  req.body.year
  const schema = Joi.object({
      artistId: Joi.required(),
      title: Joi.string().min(3).required(),
      year: Joi.number().min(4).required(),
  })
  const {error} = schema.validate({artistId, title, year})
  if(error) {
      return res.status(400).send({
          message: error.details[0].message
      })
  }
  try {
      const newMusic = await Music.create({
          artistId : 1,
          title,
          year,
          goal: req.body.goal,
          thumbnail: req.files[0].filename,
          attache: req.files[1].filename,
      })

      res.status(201).send({
          status: "success",
          data: newMusic
      })

  } catch (error) {
      console.log(error.message)
      res.status(500).send({
          status: "failed",
          message: "internal server error"
      })
  }
}

exports.editMusic = async (req, res) => {
  const {id} = req.params
  try {
    let musicExist = await Music.findOne({
      where: {id}
    })
    if(!musicExist) {
      return res.status(404).send({
        message: "Music Not Found"
      })
    }

    // if(!req.files){
    //   console.log("tidak ada")
    // }else {
    //   console.log("ada")
    // }
    console.log(req.files)

    
    // const thumbnail = req.files[0] ? req.files[0].filename : musicExist.thumbnail
    // const attache  = req.files[1] ? req.files[1].filename : musicExist.attache
    
    // let response = await Music.update({
    //   title,
    //   year,
    //   thumbnail,
    //   attache
    // })
    // let music = await Music.findOne({
    //   where: {id},
    //   attributes: {
    //     exclude: ['artistId','createdAt','updatedAt']
    //   }
    // })
    
    res.status(200).send({
      message: "Success",
      data: musicExist
    })
    
  } catch (error) {
    
  }
}