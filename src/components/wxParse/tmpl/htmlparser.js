var startTag=/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,endTag=/^<\/([-A-Za-z0-9_]+)[^>]*>/,attr=/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;var empty=makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");var block=makeMap("a,address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");var inline=makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");var closeSelf=makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");var fillAttrs=makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");var special=makeMap("wxxxcode-style,script,style,view,scroll-view,block");function HTMLParser(e,i){var a,t,r,l=[],s=e;l.last=function(){return this[this.length-1]};while(e){t=true;if(!l.last()||!special[l.last()]){if(e.indexOf("\x3c!--")==0){a=e.indexOf("--\x3e");if(a>=0){if(i.comment)i.comment(e.substring(4,a));e=e.substring(a+3);t=false}}else if(e.indexOf("</")==0){r=e.match(endTag);if(r){e=e.substring(r[0].length);r[0].replace(endTag,f);t=false}}else if(e.indexOf("<")==0){r=e.match(startTag);if(r){e=e.substring(r[0].length);r[0].replace(startTag,o);t=false}}if(t){a=e.indexOf("<");var n="";while(a===0){n+="<";e=e.substring(1);a=e.indexOf("<")}n+=a<0?e:e.substring(0,a);e=a<0?"":e.substring(a);if(i.chars)i.chars(n)}}else{e=e.replace(new RegExp("([\\s\\S]*?)</"+l.last()+"[^>]*>"),function(e,a){a=a.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g,"$1$2");if(i.chars)i.chars(a);return""});f("",l.last())}if(e==s)throw"Parse Error: "+e;s=e}f();function o(e,a,t,r){a=a.toLowerCase();if(block[a]){while(l.last()&&inline[l.last()]){f("",l.last())}}if(closeSelf[a]&&l.last()==a){f("",a)}r=empty[a]||!!r;if(!r)l.push(a);if(i.start){var s=[];t.replace(attr,function(e,a){var t=arguments[2]?arguments[2]:arguments[3]?arguments[3]:arguments[4]?arguments[4]:fillAttrs[a]?a:"";s.push({name:a,value:t,escaped:t.replace(/(^|[^\\])"/g,'$1\\"')})});if(i.start){i.start(a,s,r)}}}function f(e,a){if(!a)var t=0;else{a=a.toLowerCase();for(var t=l.length-1;t>=0;t--)if(l[t]==a)break}if(t>=0){for(var r=l.length-1;r>=t;r--)if(i.end)i.end(l[r]);l.length=t}}}function makeMap(e){var a={},t=e.split(",");for(var r=0;r<t.length;r++)a[t[r]]=true;return a}module.exports=HTMLParser;