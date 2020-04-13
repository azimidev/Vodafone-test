/*
  Vodafone coding challenge

  You have been tasked with creating a helper function that will be used to determine the output
  of an array of data.

  Each element of the array has the following structure:

    {
      state: <String> - a state to go to
      errorCode: <String> - optional error code
    }

  The states have different functionalities:

    'processing' = delay by 2 seconds, then fetch the next state
    'error' = handle the error code provided (see below)
    'success' = return from the helper with the object: { title: 'Order complete', message: null }

  Handling error codes:

    'NO_STOCK' = return from the helper with an object: { title: 'Error page', message: 'No stock has been found' }
    'INCORRECT_DETAILS' = return from the helper with an object: { title: 'Error page', message: 'Incorrect details have been entered' }
    null = return from the helper with an object: { title: 'Error page', message: null }
    undefined = return from the helper with an object: { title: 'Error page', message: null }

  Example usage:
  -------
  getProcessingPage([{ state: 'processing' }, { state: 'error' }])
  => should return after 2 seconds with the object: { title: 'Error page', message: null }

  Notes:
  - Provide the code and a description of how to run it
**/

/**
 * To delay in seconds
 * Only `delay` is able to resolve or reject the promise
 * @param {int} seconds After `seconds`, resolve the promise
 * @returns {Promise}
 */
function delay(seconds) {
  return new Promise(resolve => setTimeout(() => resolve(), seconds));
}

/**
 * Handle the error code.
 *
 * @param {string} errorCode
 * @return {object}
 */
function handleErrorCode(errorCode) {
  let obj = { title: 'Error page', message: '' };

  switch (errorCode) {
    case 'NO_STOCK':
      obj.message = 'No stock has been found';
      break;
    case 'INCORRECT_DETAILS':
      obj.message = 'Incorrect details have been entered';
      break;
    default:
      obj.message = null;
      break;
  }

  return obj;
}

function getProcessingPage(data) {
  for (let i = 0; i < data.length; i++) {
    const state = data[i].state;

    if (state === 'processing') {
      // We want the next element of array to the end: data.slice(i + 1)
      return delay(2000).then(() => getProcessingPage(data.slice(i + 1)));
    }

    // NOTE: you want to return out the helper when
    // state is error, otherwise I could call the function
    // again recursively to handle the next element (data).
    if (state === 'error') {
      // if (data[i].hasOwnProperty('errorCode'))
      console.log(handleErrorCode(data[i].errorCode)); // --> exits out!
    }

    if (state === 'success') {
      console.log({ title: 'Order complete', message: null });
    }
  }
}

getProcessingPage([
  // { state: 'processing' },
  // { state: 'success' },
  { state: 'processing' },
  { state: 'error' },
]);
