import { produce } from 'immer';

function reducer(state, action) {
  return produce(state, (draftState) => {
    switch (action.type) {
      case 'add-item': {
        const itemIndex = state.findIndex(
          (item) => item.id === action.item.id
        );

        if (itemIndex !== -1) {
          draftState[itemIndex].quantity += 1;
          break;
        }

        draftState.push({
          ...action.item,
          quantity: 1,
        });
        break;
      }

      case 'delete-item': {
        const itemIndex = state.findIndex(
          (item) => item.id === action.item.id
        );

        draftState.splice(itemIndex, 1);
        break;
      }

      case 'set-items': {
        draftState = [...action.savedItems];
        return draftState;
      }
    }

    // save cart to local storage
    window.localStorage.setItem('cart', JSON.stringify(draftState));
  });
}

export default reducer;
