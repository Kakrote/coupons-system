const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const adminSchema=mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

module.exports=mongoose.model('Admin', adminSchema)