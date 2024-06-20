const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/Jobs')c

const jobSchema = new mongoose.Schema(
  {
    companyName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    locationType: {
        type: String,
        required: true,
    },
    skills: {
        type: Array,
        required: true,
    },
    aboutCompany: {
        type: String,
        required: true
    },
    information: {
        type: String
    }
},
{timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"}}
)

const Job = mongoose.model('Job', jobSchema)
module.exports = Job

