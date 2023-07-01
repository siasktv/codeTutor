const { Schema, model } = require('mongoose')
const { Types } = Schema

const TutorSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    bio: {
      specialty: {
        type: String,
        enum: [
          'Full Stack Developer',
          'Front-end Developer',
          'Back-end Developer',
          'Data Base speciality'
        ]
      },
      description: { type: String },
      linkBriefcase: { type: String }
    },

    languages: [
      {
        language: {
          type: String,
          enum: ['Español', 'Inglés', 'Portugués', 'Francés']
        },
        level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] }
      }
    ],
    skills: [{ type: Types.ObjectId, ref: 'SkillsTech' }],
    experience: [{ type: Types.ObjectId, ref: 'Experience' }],
    projects: [{ type: Types.ObjectId, ref: 'Project' }],
    reviews: [{ type: Types.ObjectId, ref: 'Reviews' }],

    rates: [
      {
        name: {
          type: String,
          enum: ['Mentorship', 'Freelance']
        },
        value: { type: Number },
        promo: { type: Boolean, default: false }
      }
    ],
    bankAccount: { type: Types.ObjectId, ref: 'BankAccount' },
    status: { type: String, default: 'pending' },
    socialMedia: [
      {
        name: { type: String },
        link: { type: String }
      }
    ],
    offline: { type: Boolean, default: false },
    disponibility: [
      {
        day: {
          type: Number,
          enum: [0, 1, 2, 3, 4, 5, 6]
        },
        hours: [
          {
            type: Number,
            enum: [
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23
            ]
          }
        ]
      }
    ],
    bankAccount: {
      accountNumber: { type: String },
      accountHolder: { type: String },
      bankName: { type: String },
      branchCode: { type: String },
      accountType: {
        type: String
      }
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Tutor', TutorSchema)
