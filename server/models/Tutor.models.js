const { Schema, model } = require('mongoose');

const TutorSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    bio:[ {
      specialty: {
        type: String,
        enum: ['Front', 'Back', 'Data Base'],
      },
      description: { type: String },
      linkBriefcase: { type: String },
    }],
    languages: [{
      language: { type: String, enum: ['Español', 'Ingles', 'Portugues','Frances'] },
      level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    }],
    skills: [{ type: Types.ObjectId, ref: 'SkillsTech' }],
    experience: [{ type: Types.ObjectId, ref: 'Experience' }],
    projects: [{ type: Types.ObjectId, ref: 'Project' }],
    rates: { type: Types.ObjectId, ref: 'Rate' },
    banckAccount: { type: Types.ObjectId, ref: 'BanckAccount' },
    status: { type: String, default: 'pending' },
    socialMedia: [{
      name: { type: String },
      link: { type: String },
    }],
    offline: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);


module.exports = model('Tutor', TutorSchema);