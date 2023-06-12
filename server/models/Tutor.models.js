const { Schema, model } = require('mongoose');

const TutorSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    bio: {
      specialty: { type: String }, //se hace enum con las especialidades?
      description: { type: String },
      linkBriefcase: { type: String },
    },
    languages: {
      language: { type: String },
      level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    },
    skills: { type: Types.ObjectId, ref: 'SkillsTech' },
    experience: { type: Types.ObjectId, ref: 'Experience' },
    projects: { type: Types.ObjectId, ref: 'Project' },
    rates: { type: Types.ObjectId, ref: 'Rate' },
    banckAccount: { type: Types.ObjectId, ref: 'BanckAccount' },
    status: { type: Boolean, default: false },
    socialMedia: {
      name: { type: String },
      link: { type: String },
    },
    offline: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);


module.exports = model('Tutor', TutorSchema);