import wxParse from './tmpl/index'

Component({
  externalClasses: ['my-class'],
  properties: {
    content: {
      type: String,
      value: '',
      observer: function (richText) {
        const reg = /<body[^>]*>([\s\S]+?)<\/body>/i;
        const data = reg.exec(richText);
        const text = data[0] ? data[0] : richText;
        wxParse.wxParse('article', 'html', text, this, 5);
      }
    }
  },
  data: {
    article: null
  }
});
