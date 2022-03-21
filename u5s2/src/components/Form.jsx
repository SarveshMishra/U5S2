import { useState } from "react";
import { useEffect } from "react";

const Form = () => {
	const [name, setName] = useState("");
	const [department, setDepartment] = useState("");
	const [gender, setGender] = useState("");
	const [role, setRole] = useState("");
	const [salary, setSalary] = useState("");
	const [data, setData] = useState([]);
	const [filter, setFilter] = useState("All");
	const [displayData, setDisplayData] = useState([]);
	const [sorting, setSorting] = useState("");
	useEffect(() => {
		getEmployeeData();
		sortFilter();
	}, []);

	useEffect(() => {
		sortFilter();
	}, [filter, sorting]);
	const getEmployeeData = () => {
		fetch(`http://localhost:3000/employees`)
			.then((response) => response.json())
			.then((result) => {
				setData(result);
				setDisplayData(result);
			})

			.catch((error) => console.log("error", error));
	};

	const addDataToServer = (ele) => {
		fetch("http://localhost:3000/employees", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(ele),
		}).then(() => getEmployeeData());
	};

	const employeeAdd = () => {
		const ele = {
			name,
			department,
			gender,
			role,
			salary,
		};
		addDataToServer(ele);

		setName("");
		setDepartment("");
		setGender("");
		setRole("");
		setSalary("");
	};
	// Show All Departments, Show Marketing , Show HR , Show IT  ,Show Finance
	const sortFilter = () => {
		let newData = data
			.filter((element) => {
				if (filter === "Marketing") {
					return element.department === "Marketing";
				} else if (filter === "HR") {
					return element.department === "HR";
				} else if (filter === "IT") {
					return element.department === "IT";
				} else if (filter === "Finance") {
					return element.department === "Finance";
				} else if (filter === "All" || filter === "") {
					return element;
				}
			})
			.sort((a, b) => {
				if (sorting === "Ascending") {
					return a.salary - b.salary;
				} else if (sorting === "Descending") {
					return b.salary - a.salary;
				}
			});
		setDisplayData(newData);
	};
	return (
		<>
			<h1>Fill Details</h1>
			<input
				type="text"
				name=""
				id="name"
				onChange={(e) => setName(e.target.value)}
				value={name}
				placeholder="Enter Employee name"
			/>
			<input
				type="text"
				name=""
				id="department"
				onChange={(e) => setDepartment(e.target.value)}
				value={department}
				placeholder="Enter Department"
			/>
			<input
				type="text"
				name=""
				id="gender"
				onChange={(e) => setGender(e.target.value)}
				value={gender}
				placeholder="Enter Gender"
			/>
			<input
				type="text"
				name=""
				id="role"
				onChange={(e) => setRole(e.target.value)}
				value={role}
				placeholder="Enter Role"
			/>
			<input
				type="text"
				name=""
				id="salary"
				onChange={(e) => setSalary(e.target.value)}
				value={salary}
				placeholder="Enter Salary"
			/>
			<button onClick={employeeAdd}>Add Employee</button>

			<button
				onClick={() => {
					setFilter("All");
				}}
			>
				Show All Department
			</button>
			<button
				onClick={() => {
					setFilter("Marketing");
				}}
			>
				Show Marketing
			</button>
			<button
				onClick={() => {
					setFilter("HR");
				}}
			>
				Show HR
			</button>
			<button
				onClick={() => {
					setFilter("Finance");
				}}
			>
				Show Finance
			</button>
			<button
				onClick={() => {
					setFilter("IT");
				}}
			>
				Show IT
			</button>
			<button
				onClick={() => {
					setSorting("Ascending");
				}}
			>
				Sort By Salary Ascending
			</button>
			<button
				onClick={() => {
					setSorting("Descending");
				}}
			>
				Sort By Salary Descending
			</button>

			<div className="data">
				{displayData.map((ele) => {
					return (
						<div key={ele.id}>
							<p></p>
							<p>Name: {ele.name}</p>
							<p>Department: {ele.department}</p>
							<p>Gender: {ele.gender}</p>
							<p>Role: {ele.role}</p>
							<p>Salary: {ele.salary}</p>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Form;
