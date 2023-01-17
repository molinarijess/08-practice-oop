import { ProjectItem } from "./PojectItem.js";
import { DOMHelper } from "./DOMHelper.js";

export class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    this.connectDroppable();
  }

  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);

    list.addEventListener("dragenter", (e) => {
      if (e.dataTransfer.types[0] === "text/plain") {
        e.preventDefault();
        list.parentElement.classList.add("droppable");
      }
    });

    list.addEventListener("dragover", (e) => {
      if (e.dataTransfer.types[0] === "text/plain") {
        e.preventDefault();
      }
    });

    list.addEventListener("dragleave", (e) => {
      if (e.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove("droppable");
      }
    });

    list.addEventListener("drop", (e) => {
      const prjId = event.dataTransfer.getData("text/plain");
      if (this.projects.find((p) => p.id === prjId)) {
        return;
      }

      document
        .getElementById(prjId)
        .querySelector("button:last-of-type")
        .click();

      list.parentElement.classList.remove("droppable");
    });
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(prj) {
    this.projects.push(prj);
    DOMHelper.moveElement(prj.id, `#${this.type}-projects ul`);
    prj.update(this.switchProject.bind(this), this.type);
  }

  switchProject(prjId) {
    this.switchHandler(this.projects.find((p) => p.id === prjId));
    this.projects = this.projects.filter((p) => p.id !== prjId);
  }
}
