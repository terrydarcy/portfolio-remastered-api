
const getRepos = async (req: any, res: any, next: any) => {
  const { repoName } = req.body;

  if (!repoName) res.status(500).send('repoName required');

  res.send(repoName + " is a valid repo name!");
};


module.exports = { getRepos };
