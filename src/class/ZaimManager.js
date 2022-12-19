class ZaimManager{
  constructor(){

    const ss = SpreadsheetApp.getActive();

    this.service = OAuth1.createService('Zaim')
      // Set the endpoint URLs.
      .setAccessTokenUrl('https://api.zaim.net/v2/auth/access')
      .setRequestTokenUrl('https://api.zaim.net/v2/auth/request')
      .setAuthorizationUrl('https://auth.zaim.net/users/auth')

      // Set the consumer key and secret.
      .setConsumerKey(ss.getRange('config!B1').getValue())
      .setConsumerSecret(ss.getRange('config!B2').getValue())

      // Set the name of the callback function in the script referenced
      // above that should be invoked to complete the OAuth flow.
      .setCallbackFunction('authCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties());
  }

  isAccess(){
    return this.service.hasAccess();
  }

  authorize(){
    if(this.service.hasAccess()) return;
    const authorizationUrl = this.service.authorize();
    Logger.log(`次のURLを開いてZaimで認証したあと、再度スクリプトを実行してください。: ${authorizationUrl}`);
  }

  reset(){
    this.service.reset();
  }

  getMoneyList(startDate){
    const option = {
      method: 'get',
    };
    const response = this.service.fetch(
      `https://api.zaim.net/v2/home/money?start_date=${startDate.format('YYYY-MM-DD')}&limit=100&group_by=receipt_id`,
      option
    );
    return JSON.parse(response.getContentText()).money;
  }
}


function authCallback(request) {
    
  return HtmlService.createHtmlOutput(
    getService().handleCallback(request)
      ? '認証できました！このページを閉じて再びスクリプトを実行してください。'
      : '認証に失敗'
  );
}

