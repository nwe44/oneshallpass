function isUpper(a){return"A".charCodeAt(0)<=a&&a<="Z".charCodeAt(0)}function isLower(a){return"a".charCodeAt(0)<=a&&a<="z".charCodeAt(0)}function isDigit(a){return"0".charCodeAt(0)<=a&&a<="9".charCodeAt(0)}function is_ok_pw(a){var b=0,c=0,d=0,e=0,f=0,g=0,h;for(c=0;c<min_size;c++){h=a.charCodeAt(c);if(isDigit(h))f++;else if(isUpper(h))d++;else{if(!isLower(h))return!1;e++}}if(f===0||e===0||d===0||f>5||e>5||d>5)return!1;for(;c<max_size;c++){h=a.charCodeAt(c);if(!isDigit(h)&&!isUpper(h)&&!isLower(h))return!1}return!0}function find_class_to_sub(a){var b=a.length,c,d=0,e=0,f=0,g=0,h;for(c=0;c<min_size;c++)h=a.charCodeAt(c),isDigit(h)?f++:isUpper(h)?d++:isLower(h)&&e++;return e>=d&&e>=f?isLower:f>e&&f>=d?isDigit:isUpper}function pwgen(a,b,c){a.generated_pw=null;var d=1<<parseInt(a.secbits,10),e;for(e=0;e<b&&!a.generated_pw&&a.key==c.key;e++){var f=["OneShallPass v1.0",a.email,a.host,a.generation,a.iter],g=f.join("; "),h=CryptoJS.HmacSHA512(g,a.passphrase),i=h.toString(),j=h.toString(CryptoJS.enc.Base64),k=parseInt(i.slice(i.length-8,i.length),16);k%d===0&&is_ok_pw(j)?a.generated_pw=j:a.iter++}var l=!!a.generated_pw;return l}function translate_at_indices(a,b,c){var d=0,e=[],f;for(f=0;f<b.length;f++){var g=b[f];e.push(a.slice(d,g));var h=a.charAt(g),i=CryptoJS.enc.Base64._map.indexOf(h);h=c.charAt(i%c.length),e.push(h),d=g+1}return e.push(a.slice(d,a.length)),e.join("")}function add_syms_at_indices(a,b){var c="`~!@#$%^&*()-_+={}[]|;:,<>.?/";return translate_at_indices(a,b,c)}function add_syms(a,b){if(b<=0)return a;var c=find_class_to_sub(a),d,e=[];for(d=0;b>0&&d<min_size;d++){var f=a.charCodeAt(d);c(f)&&(b--,e.push(d))}return add_syms_at_indices(a,e)}var min_size=8,max_size=16;typeof exports!="undefined"&&(exports.add_syms=add_syms,exports.add_syms_at_indices=add_syms_at_indices,exports.pwgen=pwgen);