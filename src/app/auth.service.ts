
export class AuthService{
  logId = false
  isAuthenticate()
  {
    const promise = new Promise(
      (resolve,reject) =>
      {
        setTimeout( ()=>
        {
          resolve(this.logId);
        },800)
      }
    )
    return promise;
  }
  login()
  {
    this.logId = true;
  }
  logout()
  {
    this.logId = false;
  }
}
