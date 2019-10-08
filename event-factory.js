export default function eventFactory(query, callback, ...callbackData){
  function finder(target, query) {
    const nodes = document.querySelectorAll(query);

    return [...nodes].find(node => {
      return node.contains(target) || node === target;
    });
  }

  return {handleEvent : function(evt){
    const delegateTarget = finder(evt.target, query);

    if(delegateTarget){
      evt.delegateTarget = delegateTarget;
    }
    else if(query){
      //If there is no delegate, but we specified one, return false.
      return false;
    }

    if(typeof(callback) === 'function'){
      callback.apply(null, [evt, ...callbackData]);
    }
  }}
}
