class Payment{
  constructor(json){
    this.json = json;
  }

  addNotion(notionManager, databaseId){
    const notionRecord = Notion.initRecord();
    notionRecord.setTitle('receipt_id', String(this.json.receipt_id));
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