class Item {
  constructor(onClick, selected, text, context) {
    this.onClick = onClick;
    this.selected = selected;
    /* this.dataStory = dataStory; */
    this.text = text;
    this.context = context;
  }
}

export default Item;
