'use strict';
import marked from 'marked';

let uiUtils = {

    createMarkup: (text)=> {
        let body = marked(text || '');
        return {__html: body};
    },

    createPlainMarkup: (text)=> {
        return {__html: text};
    }

};

export default uiUtils;
