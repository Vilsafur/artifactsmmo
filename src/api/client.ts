import axios from "axios";

export const api = axios.create({
	baseURL: "https://api.artifactsmmo.com",
	headers: {
		Authorization: `Bearer ${process.env.ARTIFACT_TOKEN}`,
		"Content-Type": "application/json",
	},
});
