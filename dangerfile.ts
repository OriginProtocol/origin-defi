import dangerGithubNotion from 'danger-plugin-danger-github-notion';

dangerGithubNotion({
  dbTasksId: '00c83143-d518-49a1-9a6c-99ca369a0ce6',
  taskPrefix: 'TAS',
  teams: [
    {
      org: 'OriginProtocol',
      team_slug: 'core',
    },
  ],
});
