const handleSave = async (event) => {
  event.preventDefault()
  const newSkills = [...skills]
  const updatedSkill = {
    ...data,
    techName: {
      name: data.techName,
      category: 'Web App',
    },
  }

  // Replace or push skill
  if (editedSkill) {
    const skillIndex = skills.findIndex(({ _id }) => _id === updatedSkill._id)
    newSkills.splice(skillIndex, 1, updatedSkill)
  } else {
    newSkills.push(updatedSkill)
  }

  //actualizar la skill
  try {
    const res = await axios.put(`${BACKEND_URL}/api/tutors/${id}`, {
      skills: newSkills,
    })
    console.log(res.data)

    closeModal()
  } catch (err) {
    console.log(err)
  }
}

const openModal = (skillId) => {
  if (typeof skillId === 'string') {
    const skillData = skills.find(({ _id }) => _id === skillId)
    setData({
      description: skillData.description,
      tutor: skillData.tutor,
      years: skillData.years,
      techName: skillData.techName.name,
      _id: skillData._id,
    })
    setEditedSkill(skillId)
  } else {
    setData({
      description: '',
      tutor: '',
      years: '',
      techName: '',
    })
  }
  setShowModal(true)
}

const closeModal = () => {
  setShowModal(false)
  setEditedSkill(null)
  setData(null)
}

const handleDelete = async (skillId) => {
  console.log(skillId)
  if (!window.confirm('¿Estás seguro de eliminar esta habilidad?')) return

  const remainingSkills = skills.filter(({ _id }) => _id !== skillId)
  try {
    const res = await axios.put(`${BACKEND_URL}/api/tutors/${id}`, {
      skills: remainingSkills,
    })
    console.log(res.data)
  } catch (err) {
    console.log(err)
  }
}
console.log('skills', skills)
