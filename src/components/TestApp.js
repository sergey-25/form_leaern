import React from "react";


function Todo({todo, index, completeTodo, removeTodo}) {
    return (
        <div
            className="todo"
            style={{textDecoration: todo.isCompleted ? "line-through" : ""}}
        >

            <p>
                {todo.username}-----------
                {todo.email}
            </p>

            <div>
                <button onClick={() => completeTodo(index)}>Complete</button>
                <button onClick={() => removeTodo(index)}>x</button>
            </div>
        </div>
    );
}

function TodoForm({addTodo}) {

    const initial = [{
        username: '',
        email: '',
        address: [{
            state: '',
            city: '',

        }]
    }];


    const [value, setValue] = React.useState([initial]);

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        setValue(...initial);
        addTodo(value);
        console.log(value)
    };

    const handleOwnerChange = (event) => {
        const {name, value} = event.target;
        setValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const onChangeCompany = (e, i) => {
        setValue({
            ...value,
            address: [{
                ...value[i]
                    [e.target.name] = e.target.value
            }]
        });
    }

    return (

        <>
            <form>
                <input
                    type="text"
                    name='username'
                    className="input"
                    value={value.username}
                    onChange={handleOwnerChange}
                />
                <input
                    type="text"
                    name='email'
                    className="input"
                    value={value.email}
                    onChange={handleOwnerChange}
                />
                {value.map((item, i) => {
                    return (
                        <>
                            <input
                                type="text"
                                name='state'
                                placeholder="state"
                                className="input"
                                value={item[i].state}
                                onChange={e => onChangeCompany(e, i)}
                            />
                            <input
                                type="text"
                                placeholder="city"
                                name='city'
                                className="input"
                                value={item[i].city}
                                onChange={e => onChangeCompany(e, i)}
                            />
                        </>
                    )
                })}

            </form>
            <button onClick={handleSubmit}>add</button>
        </>
    );
}

function TestApp() {

    // const initial = [{
    //     username: '',
    //     email: '',
    //     address:[{
    //         state: '',
    //         city: '',
    //
    //     }]
    // }];

    const [todos, setTodos] = React.useState([]);

    const addTodo = ({username, email, address: {state, city}}) => {
        const newTodos = [...todos, {username, email, state, city}];
        setTodos(newTodos);
        console.log(todos)
    };

    const completeTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;
        setTodos(newTodos);

    };

    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <div className="app">
            <div className="todo-list">
                {todos.map((todo, index) => (
                    <Todo
                        key={index}
                        index={index}
                        todo={todo}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                    />
                ))}
                <TodoForm addTodo={addTodo}/>
            </div>
        </div>
    );
}

export default TestApp;