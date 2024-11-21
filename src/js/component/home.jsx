import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";



//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [listTasks, setListTasks] = useState([]);

	const createUser = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/users/acedpol", {
			method: 'POST',
			// body: JSON.stringify(dataToSend),  // la variable dataToSend puede ser un 'string' o un {objeto} que proviene de algún lugar más arriba en nuestra aplicación
			headers: {
			   'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			console.log('error: ', response.status, response.statusText);
			/* Realiza el tratamiento del error que devolvió el request HTTP */
			return {error: {status: response.status, statusText: response.statusText}};
		};
	};

	const createTask = async (task) => {
		const response = await fetch("https://playground.4geeks.com/todo/users/acedpol", {
			method: 'POST',
			body: JSON.stringify({
				label: task,
				is_done: false
			}),  // la variable dataToSend puede ser un 'string' o un {objeto} que proviene de algún lugar más arriba en nuestra aplicación
			headers: {
			   'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			const data = await response.json();
			// getUserData();
			return data;
		} else {
			console.log('error: ', response.status, response.statusText);
			/* Realiza el tratamiento del error que devolvió el request HTTP */
			return {error: {status: response.status, statusText: response.statusText}};
		};
	};

	const getUserData = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/users/acedpol", {
			method: 'GET',
			// body: JSON.stringify(dataToSend),  // la variable dataToSend puede ser un 'string' o un {objeto} que proviene de algún lugar más arriba en nuestra aplicación
			headers: {
			   'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			const data = await response.json();
			// setListTasks(prevState => [...prevState, data.todos])
			console.log(data);
		} else {
			console.log('error: ', response.status, response.statusText);
			/* Realiza el tratamiento del error que devolvió el request HTTP */
			return {error: {status: response.status, statusText: response.statusText}};
		};
	};

	useEffect(() => {
		createUser()
		// getUserData()
	},[])

	const handleOnChange = (e) => {
		setInputValue(e.target.value);
		// console.log(inputValue);
	}

	const saveTask = (e) => {
		e.preventDefault();
		// setListTasks(prevState => [...prevState, inputValue.trim()])
		createTask(inputValue.trim())
		setInputValue("")
	}

	const deleteTask = (taskToDelete) => {
		// console.log(taskToDelete.trim())
		// setListTasks(listTasks.filter(task => task !== taskToDelete.trim()));
	}

	return (
		<div className="container text-center w-25">
			<h1 className="text-black text-opacity-25 fw-light" style={{ fontSize: "7.5rem" }}>todos</h1>
			<form onSubmit={saveTask}>
				<input
					autoFocus={true}
					className="border p-3 w-100 no-outline text-black text-opacity-50"
					value={inputValue}
					placeholder="What needs to be done?"
					onChange={handleOnChange}
				/>
			</form>
			<ul className='list-group'>
				{listTasks.map((task, index) => (
					<li key={index} className='list-group-item rounded-0 border border-top-0 text-black text-opacity-50 text-start d-flex align-items-center task-item'>
						{task}
						<button onClick={() => deleteTask(task)} className='btn ms-auto text-black text-opacity-50 border-0 task-button'><i className="fa-solid fa-x"></i></button>
					</li>
				))}
			</ul>

			{/* Esto lo podría pasar a un componente llamado Footer y pasarle 'listTasks.length' como parámetro */}
			{listTasks.length !== 0 ?
				<>
				<div className="border border-top-0" style={{ height: "1.5rem" }}>
					<span className="fs-6 fw-light text-black text-opacity-50 float-end pe-2">
						{listTasks.length} item left
					</span>
				</div>
				<div className="border border-top-0 mx-auto" style={{ width: "95%", height: "0.25rem" }} />
				<div className="border border-top-0 mx-auto" style={{ width: "90%", height: "0.25rem" }} />
				</>
				: 
				<>
				<div className="border border-top-0 bg-danger-subtle" style={{ height: "1.5rem" }}>
					<span className="fs-6 fw-normal text-danger text-opacity-75">
						No hay tareas, añadir tareas
					</span>
				</div>
				</>
			}
		</div>
	);
};

export default Home;
