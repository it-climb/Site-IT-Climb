'use strict';

import { isURL }  from 'validator';

/**
 * @return {Error|null}
 */
let MediaValidator = (withDescription, isRequired, props, propName, componentName) => {
    componentName = componentName || 'ANONYMOUS';
    
    if (!props[propName]) {
        if (isRequired) {
            return new Error(`Required property ${propName} wasn't specified in ${componentName}.`)
        }
        return null;
    }
    
    const errors = {
        id: () => !!props[propName].id,
        title: () => !!props[propName].title,
        description: () =>  !!props[propName].description || !withDescription,
        url: () => isURL(props[propName].url)
    };
    
    let count = 0;
    const errorMessage = Object.keys(errors)
        .reduce((errMsg, currentErrorKey)=> {
            if (!errors[currentErrorKey]()) count++;
            errMsg += `${errMsg.length > 0 ? ', ' : ''}${!errors[currentErrorKey]() ? currentErrorKey : '' }`;
            return errMsg;
        }, '');
    
    if (errorMessage.length > 0) {
        return new Error(`Required field${count > 1 ? 's' : ''} ${errorMessage} ${count > 1 ? 'are' : 'is'} missing`);
    }
    
    return null;
};

MediaValidator = MediaValidator.bind(null, false, false);
MediaValidator.withDescription = MediaValidator.bind(null, true, false);
MediaValidator.isRequired = MediaValidator.bind(null, false, true);
MediaValidator.withDescription.isRequired = MediaValidator.bind(null, true, true);

export default MediaValidator;

