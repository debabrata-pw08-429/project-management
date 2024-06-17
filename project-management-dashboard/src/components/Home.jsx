import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTask, setProjectTask] = useState("");
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);
  }, []);

  const handleAddProject = () => {
    let token = localStorage.getItem("firebase_token");

    if (token) {
      setIsAddingProject(true);
      setCurrentIndex(-1); // Reset currentIndex to -1 for adding new projects
      setProjectName("");
      setProjectDescription("");
      setProjectTask("");
    } else {
      alert("Please! Signin to add projects!");
      navigate("/signin");
    }
  };

  const handleSaveProject = () => {
    if (projectName && projectDescription && projectTask) {
      if (currentIndex === -1) {
        // Add new project
        const newProject = {
          name: projectName,
          description: projectDescription,
          task: projectTask,
          id: Date.now(),
        };

        const updatedProjects = [...projects, newProject];
        setProjects(updatedProjects);
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
      } else {
        // Update existing project
        const updatedProjects = projects.map((project, index) =>
          index === currentIndex
            ? {
                ...project,
                name: projectName,
                description: projectDescription,
                task: projectTask,
              }
            : project
        );
        setProjects(updatedProjects);
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
      }

      setIsAddingProject(false);
      setCurrentIndex(-1);
      setProjectName("");
      setProjectDescription("");
      setProjectTask("");
    }
  };

  const handleDeleteProject = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const handleDeleteAllProjects = () => {
    setProjects([]);
    localStorage.removeItem("projects");
  };

  const handleEditProject = (index) => {
    setCurrentIndex(index);
    const project = projects[index];
    setProjectName(project.name);
    setProjectDescription(project.description);
    setProjectTask(project.task);
    setIsAddingProject(true);
  };

  const handleMore = (id) => {
    navigate(`/projects/${id}`);
  };

  return (
    <>
      <h1>Welcome to the Projects</h1>
      <button onClick={handleAddProject}>Add Project</button>
      <button onClick={handleDeleteAllProjects}>DELETE ALL</button>

      {isAddingProject && (
        <div>
          <h2>Project Name</h2>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
          />
          <h2>Project Description</h2>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Enter project description"
          />
          <h2>Project Associated Task</h2>
          <input
            type="text"
            value={projectTask}
            onChange={(e) => setProjectTask(e.target.value)}
            placeholder="Enter project associated task"
          />
          <button onClick={handleSaveProject}>
            {currentIndex === -1 ? "Save" : "Update"}
          </button>
        </div>
      )}

      {projects.map((project, index) => (
        <div key={project.id}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <p>
            <strong>Associated Task:</strong> {project.task}
          </p>
          <button onClick={() => handleEditProject(index)}>Update</button>
          <button onClick={() => handleDeleteProject(project.id)}>
            Delete
          </button>
          <button onClick={() => handleMore(project.id)}>More</button>
        </div>
      ))}
    </>
  );
};

export default Home;
