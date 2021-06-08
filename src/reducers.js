import { SAVE_VIEWED, CREATE_TODO, REMOVE_TODO} from './actions';
 
const viewed = (state = [] , action) => {
    const { type, payload } = action;

    switch (type) {
        case SAVE_VIEWED: {
            const { text } = payload;
            const newViewed = {
                text,
                isCompleted: false,
            };
            return state.concat(newViewed);
        }
        default:
            return state;
    }
}

const todos = (state = [] , action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_TODO: {
            const { text } = payload;
            const newTodo = {
                text,
                isCompleted: false,
            };
            return state.concat(newTodo);
        }
        case REMOVE_TODO: {
            const { text } = payload;
            return state.filter(todo => todo.text !== text);
        }
        default:
            return state;
    }
}

export {viewed, todos}