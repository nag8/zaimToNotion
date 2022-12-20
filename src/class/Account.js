class Account{
  constructor(json){
    this.json = json;
  }

  isActive(){
    return this.json.active === 1;
  }

  addNotion(notionManager, databaseId){
    const notionRecord = Notion.initRecord();
    notionRecord.setTitle('name', String(this.json.receipt_id));
    notionRecord.setIcon('💵');
    notionRecord.setPropertiesSelect('tag', this.json.mode);
    notionRecord.setPropertiesDate('date', dayjs.dayjs(this.json.date));
    notionRecord.setPropertiesNumber('amount', this.json.amount);
    this.json.data.forEach(detail => {
      notionRecord.pushChildrenText(`${detail.name}, ${detail.amount}`);
    });

    notionManager.createRecord(databaseId, notionRecord);
  }
  
}