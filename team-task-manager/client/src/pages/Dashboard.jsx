import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
  });

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    projectId: "",
    dueDate: "",
  });

  const token = localStorage.getItem("token");



  useEffect(() => {

    fetchProjects();
    fetchTasks();

  }, []);




  const fetchProjects = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/projects",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setProjects(res.data);

    } catch (error) {

      console.log(error);
    }
  };




  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);
    }
  };




  const createProject = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/projects",
        projectData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Project Created");

      fetchProjects();

      setProjectData({
        title: "",
        description: "",
      });

    } catch (error) {

      console.log(error);

      alert("Error creating project");
    }
  };




  const createTask = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/tasks",
        taskData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Task Created");

      fetchTasks();

      setTaskData({
        title: "",
        description: "",
        projectId: "",
        dueDate: "",
      });

    } catch (error) {

      console.log(error);

      alert("Error creating task");
    }
  };




  const updateTaskStatus = async (taskId, newStatus) => {

    try {

      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

      alert("Error updating status");
    }
  };




  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";
  };




  return (

    <div className="min-h-screen bg-gray-950 text-white p-8">



      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Team Task Manager
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded"
        >
          Logout
        </button>

      </div>





      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">



        <form
          onSubmit={createProject}
          className="bg-gray-900 p-6 rounded-xl shadow-lg"
        >

          <h2 className="text-2xl font-bold mb-4">
            Create Project
          </h2>


          <input
            type="text"
            placeholder="Project title"
            value={projectData.title}
            onChange={(e) =>
              setProjectData({
                ...projectData,
                title: e.target.value,
              })
            }
            className="w-full p-3 rounded bg-gray-800 mb-4 outline-none"
            required
          />


          <textarea
            placeholder="Project description"
            value={projectData.description}
            onChange={(e) =>
              setProjectData({
                ...projectData,
                description: e.target.value,
              })
            }
            className="w-full p-3 rounded bg-gray-800 mb-4 outline-none"
            required
          />


          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
          >
            Create Project
          </button>

        </form>





        <form
          onSubmit={createTask}
          className="bg-gray-900 p-6 rounded-xl shadow-lg"
        >

          <h2 className="text-2xl font-bold mb-4">
            Create Task
          </h2>


          <input
            type="text"
            placeholder="Task title"
            value={taskData.title}
            onChange={(e) =>
              setTaskData({
                ...taskData,
                title: e.target.value,
              })
            }
            className="w-full p-3 rounded bg-gray-800 mb-4 outline-none"
            required
          />



          <textarea
            placeholder="Task description"
            value={taskData.description}
            onChange={(e) =>
              setTaskData({
                ...taskData,
                description: e.target.value,
              })
            }
            className="w-full p-3 rounded bg-gray-800 mb-4 outline-none"
            required
          />



          <select
            value={taskData.projectId}
            onChange={(e) =>
              setTaskData({
                ...taskData,
                projectId: e.target.value,
              })
            }
            className="w-full p-3 rounded bg-gray-800 mb-4 outline-none"
            required
          >

            <option value="">
              Select Project
            </option>

            {
              projects.map((project) => (

                <option
                  key={project._id}
                  value={project._id}
                >
                  {project.title}
                </option>
              ))
            }

          </select>




          <input
            type="date"
            value={taskData.dueDate}
            onChange={(e) =>
              setTaskData({
                ...taskData,
                dueDate: e.target.value,
              })
            }
            className="w-full p-3 rounded bg-gray-800 mb-4 outline-none"
            required
          />




          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded"
          >
            Create Task
          </button>

        </form>

      </div>






      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold mb-2">
            Total Projects
          </h2>

          <p className="text-5xl font-bold text-blue-400">
            {projects.length}
          </p>

        </div>




        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold mb-2">
            Total Tasks
          </h2>

          <p className="text-5xl font-bold text-green-400">
            {tasks.length}
          </p>

        </div>

      </div>






      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">



        <div>

          <h2 className="text-2xl font-bold mb-5">
            Projects
          </h2>

          <div className="space-y-4">

            {
              projects.map((project) => (

                <div
                  key={project._id}
                  className="bg-gray-900 p-5 rounded-xl shadow"
                >

                  <h3 className="text-xl font-semibold">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {project.description}
                  </p>

                </div>
              ))
            }

          </div>

        </div>






        <div>

          <h2 className="text-2xl font-bold mb-5">
            Tasks
          </h2>

          <div className="space-y-4">

            {
              tasks.map((task) => (

                <div
                  key={task._id}
                  className="bg-gray-900 p-5 rounded-xl shadow"
                >

                  <h3 className="text-xl font-semibold">
                    {task.title}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {task.description}
                  </p>


                  <div className="mt-3">

                    <p className="text-gray-400 mb-2">
                      Status: {task.status}
                    </p>

                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateTaskStatus(
                          task._id,
                          e.target.value
                        )
                      }
                      className="bg-gray-800 p-2 rounded"
                    >

                      <option value="todo">
                        Todo
                      </option>

                      <option value="in-progress">
                        In Progress
                      </option>

                      <option value="completed">
                        Completed
                      </option>

                    </select>

                  </div>

                </div>
              ))
            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;