class AuthError extends Error {
  constructor(id, name = 'Error') {
    super(name)
    this.id = id
  }

  static IncorrectData() {
    return new AuthError('Wrong combination of email and password', 'app.login.wrongPassword')
  }

  static UnexpectedError() {
    return new AuthError('Unexpected error', 'app.login.unexpectedError')
  }
}

export default AuthError