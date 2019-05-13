
export default {
  /**
   * Is we in debug mode?
   * Disables / enabled logging
   */
  debug: true,
  
  /**
   * Url for api calls
   */
  api: 'http://localhost:8888/',

  services: {
    /**
     * Google settings
     */
    google: {
      clientId: '657226011143-7hg089raq5afv7bnuudeo6v60fhb1dn8.apps.googleusercontent.com',
      scope: [].join(' ').trim(),
      prompt: 'select_account',
      access_type: 'offline'
    }
  }
}
