import api from './index'

/**
 * Refresh user model or register new user
 *
 * @param code
 * @param redirectUri
 * @return {*}
 */
export const signInRequest = (code, redirectUri) => {
  return api.request('sign-in')
    .withBody({
      code: code,
      redirect_url: redirectUri
    })
    .post()
}
