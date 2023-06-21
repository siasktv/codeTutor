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
          'Data Base speciality',
        ],
      },
      description: { type: String },
      linkBriefcase: { type: String },
    },

    languages: [
      {
        language: {
          type: String,
          enum: ['Español', 'Ingles', 'Portugues', 'Frances'],
        },
        level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
      },
    ],
    skills: [{ type: Types.ObjectId, ref: 'SkillsTech' }],
    experience: [{ type: Types.ObjectId, ref: 'Experience' }],
    projects: [{ type: Types.ObjectId, ref: 'Project' }],
    rates: [
      {
        name: {
          type: String,
          enum: ['Mentorship', 'Freelance'],
        },
        value: { type: Number },
      },
    ],
    bankAccount: { type: Types.ObjectId, ref: 'BankAccount' },
    status: { type: String, default: 'pending' },
    socialMedia: [
      {
        name: { type: String },
        link: { type: String },
      },
    ],
    offline: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Tutor', TutorSchema)
