import request from 'superagent';

export function deleteDeployed(repoId) {
  let URL = `http://0.0.0.0:3000/api/githubdemomodel/${repoId}`;
  return new Promise(function(resolve, reject) {
    request
      .delete(URL)
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err) {
          reject(err);
        } else {
          resolve(res.text);
        }
      });
  });
}
