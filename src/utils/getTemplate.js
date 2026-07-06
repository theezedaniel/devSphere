import { templates } from "../data/templates";

export function getTemplate(id) {
    return templates.find(template => template.id === id) ?? templates[0];
}