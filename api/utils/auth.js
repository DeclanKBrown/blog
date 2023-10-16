import bcrypt from 'bcrypt'

export const checkPassword = async (password, confirmPassword) => {
  try {
    return await bcrypt.compare(password, confirmPassword)
  } catch (err) {
    throw err
  }
}
