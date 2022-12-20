function main() {
  const ss = SpreadsheetApp.getActive();
  const notionManager = Notion.initManager(ss.getRange('config!B3').getValue());
  const zaimManager = new ZaimManager();
  zaimManager.getMoneyList(dayjs.dayjs().add(-1, 'd')).forEach(json => {
    const payment = new Payment(json);
    payment.addNotion(
      notionManager,
      ss.getRange('config!B4').getValue()
    );
  });
}

function init(){
  const zaimManager = new ZaimManager();
  zaimManager.authorize();
}