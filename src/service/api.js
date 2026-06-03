const API_URL = "http://localhost:3000/api";

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

// ── Skills ────────────────────────────────────────────────────────
export const getSkills = () => request("/skills");
export const addSkill = (skill) =>
  request("/skills", { method: "POST", body: JSON.stringify(skill) });
export const updateSkill = (id, skill) =>
  request(`/skills/${id}`, { method: "PUT", body: JSON.stringify(skill) });
export const deleteSkill = (id) =>
  request(`/skills/${id}`, { method: "DELETE" });

// ── Projects ──────────────────────────────────────────────────────
export const getProjects = () => request("/projects");
export const addProject = (project) =>
  request("/projects", { method: "POST", body: JSON.stringify(project) });
export const updateProject = (id, project) =>
  request(`/projects/${id}`, { method: "PUT", body: JSON.stringify(project) });
export const deleteProject = (id) =>
  request(`/projects/${id}`, { method: "DELETE" });

// ── Tools ─────────────────────────────────────────────────────────
export const getTools = () => request("/tools");
export const addTool = (tool) =>
  request("/tools", { method: "POST", body: JSON.stringify(tool) });
export const updateTool = (id, tool) =>
  request(`/tools/${id}`, { method: "PUT", body: JSON.stringify(tool) });
export const deleteTool = (id) => request(`/tools/${id}`, { method: "DELETE" });
