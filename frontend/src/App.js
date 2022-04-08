import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

const App = () => {
  useEffect(() => {
    const getAPI = () => {
      const API = 'http://127.0.0.1:5000/';

      fetch(API)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setLoading(false);
          setApiData(data);
        });
    };
    getAPI();
  }, []);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  return (
    <Fragment>
      <header>
        <h1>ToDo List</h1>
      </header>
      <div className='form-container'>
        <form method='POST' action='http://127.0.0.1:5000/add-todo'>
          <div>
            <input type="text" name="todoText" placeholder="Write task here" required/>
          </div>
          <div>
            <button type="submit">Add ToDo</button>
          </div>
        </form>
      </div>
      <main>
        {loading === true ? (
          <div>
            <h1>Loading....</h1>
          </div>
        ) : (
          <section>
            {apiData.map((todo) => {
              return (
                <div className='todo-container' key={String(todo.todo_id)}>
                  <p>
                    {todo.todo_content}
                  </p>
                  <div>
                    <button type="submit">Delete</button>
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </main>
    </Fragment>
  );
};

export default App;
