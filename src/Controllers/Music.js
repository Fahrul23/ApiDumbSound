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
    if(musics.length > 0) {
        let response = []
        musics.map(music => {
            let data = {
                title: music.title,
                name: music.Artist.name,
                attache: music.attache,
                thumbnail: music.thumbnail,
                year: music.year,
            }
            response.push(data)
        })
        
        return  res.status(200).send({
                    message: "success",
                    data: response
                })
    }
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
          artistId,
          title,
          year,
          thumbnail: req.files[0].filename,
          attache: req.files[1].filename,
      })

      res.status(201).send({
          status: "success",
          data: newMusic
      })

  } catch (error) {
      console.log(error)
      res.status(500).send({
          status: "failed",
          message: "internal server error"
      })
  }
}

exports.deleteMusic = async (req, res) => {
    const {id} = req.params
    try {
        let music = await Music.findOne({
            where: {id}
        })
        if(!music) {
            return res.status(404).send({
                message: "Music Not Found"
            })
        }
        await Music.destroy({
            where: {id}
        })
        res.status(200).send({
            message: "success"
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
    const {id, artistId} = req.params
    try {
        const musicExist = await Music.findOne({
            where: {id}
        })

        if(!musicExist) {
            return res.status(404).send({
                status: "error",
                message: "Music not found"
            })   
        }
        let thumbnail = ''
        let attache = ''
        if(req.files.length > 0){
            if(req.files[1]){
                if(req.files[0].fieldname === "thumbnail"){
                    thumbnail = req.files[0].filename
                }
                else{
                    thumbnail = req.files[1].filename
                }
                
                if(req.files[0].fieldname === "attache"){
                    attache = req.files[0].filename
                }
                else{
                    attache = req.files[1].filename
                }
            }else if(req.files[0]){
                if(req.files[0].fieldname === "thumbnail"){
                    thumbnail = req.files[0].filename
                }
                else{
                    thumbnail = musicExist.thumbnail
                }

                if(req.files[0].fieldname === "attache"){
                    attache = req.files[0].filename
                }
                else{
                    attache = musicExist.attache
                }
            }
        }else {
            thumbnail = musicExist.thumbnail
            attache = musicExist.attache
        }
        
        await Music.update({
            artistId,
            title : req.body.title,
            year: req.body.year,
            thumbnail,
            attache
        },{
            where: {id}
        })

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

        res.status(200).send({
            status: "success",
            data: music
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "internal server error"
        })  
    }
}