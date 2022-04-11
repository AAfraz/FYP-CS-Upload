import Axios from "axios";
import { useEffect, useState } from "react";
import CardArea from "../generic/CardArea";
import "./Projects.css";

function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedProjects, setLoadedProjects] = useState([]);
  const [addProjectIsOpen, setAddProjectIsOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Axios.get("/api/userprojects")
      .then((response) => {
        const projects = [];
        console.log(response);

        for (const id in response.data) {
          const item = {
            ...response.data[id],
          };

          projects.push(item);
        }

        setIsLoading(false);
        setLoadedProjects(projects);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  function addProjectHandler() {
    setAddProjectIsOpen(true);
  }

  function closePopupHandler() {
    setAddProjectIsOpen(false);
  }

  return (
    <section>
      <header className="projects-header">
        <h1>Projects</h1>
        <div className="button-container">
          <button
            type="button"
            className="add-project"
            onClick={addProjectHandler}
          >
            + Add Project
          </button>
        </div>
      </header>
      <CardArea data={loadedProjects} type="project" />
      {/* When state is true, Pop up is displayed - Need to make - Popup for AddProjects */}
    </section>
  );
}

export default Projects;
