require('isomorphic-fetch');

const getRepos = async (req: any, res: any, next: any) => {

  fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` },
    body: JSON.stringify({ query: `
      query {
        user(login: "terrydarcy") {
          repositories(
            first: 50
            isFork: false
            orderBy: {field: CREATED_AT, direction: DESC}
            affiliations: OWNER
            privacy: PUBLIC
          ) {
            nodes {
              name
              url
              description
              pushedAt
              createdAt
              homepageUrl
              languages(first: 10) {
                edges {
                  node {
                    color
                    name
                  }
                }
              }
            }
          }
        }
      }` 
    }),
  })
  .then(result => result.json())
  .then(result => {
    if(result.data.user.repositories.nodes) {
      formatRepoData(result.data.user.repositories.nodes);
      res.send(result.data.user.repositories.nodes);
    }else {
      res.status(500).send("no repos found");
    }
  });
 };

 const formatRepoData = (repos: any) => {
  repos.forEach((repo : any) => {
    let languages: any[] = [];
    let created_date = new Date(repo.createdAt);
    repo.createdAtDate = created_date.getDate() + "/" + (created_date.getMonth() + 1) + "/" + created_date.getFullYear();
    repo.createdAtTime = created_date.getHours() + ":" + created_date.getMinutes();
    repo.languages.edges.forEach((language : any) => {
      languages.push(language.node);
  });
  repo.languages = languages;
});
}

module.exports = { getRepos };

/*
issues(last:20, states:CLOSED) {
            edges {
              node {
                title
                url
                labels(first:5) {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
*/