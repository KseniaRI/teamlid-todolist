import dotenv from 'dotenv';
dotenv.config();

export default function routes(app) {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const BASE_URL = 'https://teamlid-todolist.atlassian.net/rest/api/3';
    const headers = {
        Authorization: `Basic ${Buffer.from(`${email}:${password}`).toString(
            'base64',
        )}`,
        Accept: 'application/json',
    };

    const fetchData = async url => {
        const response = await fetch(url, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`);
        }

        return response.json();
    };

    app.get('/select-projects', async (req, res) => {
        try {
            const projectsData = await fetchData(`${BASE_URL}/project`);
            const projects = projectsData.map(({ key, name }) => {
                return {
                    key,
                    name,
                };
            });
            res.render('select-project-form.jsx', {
                title: 'Teamlead TodoList',
                projects,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Failed to fetch projects.');
        }
    });
    app.get('/todolist-tasks', async (req, res) => {
        const projectKey = req.query['projectKey'];
        if (!projectKey) {
            return res.status(400).send('Project key is required.');
        }
        try {
            if (projectKey) {
                const tasksData = await fetchData(
                    `${BASE_URL}/search?jql=project%20%3D%20${projectKey}`,
                );
                const tasks = tasksData.issues.map(issue => ({
                    key: issue.key,
                    priority: issue.fields.priority.name,
                    summary: issue.fields.summary,
                    duedate: issue.fields.duedate,
                }));

                console.log(tasks);
                res.render('todolist.jsx', {
                    title: 'TodoList Tasks',
                    tasks,
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('Failed to fetch tasks.');
        }
    });
}
