const clientID = 'xxxxxx';
const clientSecret = 'xxxxxxxxx';
const axios = require('axios')

var self = module.exports = {
    callback: async (req, res) => {
        try {
            const {code} = req.query.code;

            // axios({
            //     method: 'post',
            //     url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
            //     headers: {
            //         accept: 'application/json'
            //     }
            // }).then((response) => {
            //     access_token = response.data.access_token
            //     res.redirect('/success');
            // })

            //async await 
            const resp = await axios.post(`https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`, {}, {
                headers: {
                    accept: 'application/json'
                }
              });
            console.log(':::', resp.data);
            const {access_token} = resp.data;
            if(access_token){
                const resp = await axios.get(`https://api.github.com/user`, {
                    headers: {
                      'Authorization': `token ${access_token}`
                    }
                });
                return res.render('success',{ userData: resp.data });
            }

            // axios({
            //     method: 'get',
            //     url: `https://api.github.com/user`,
            //     headers: {
            //       Authorization: 'token ' + access_token
            //     }
            //   }).then((response) => {
            //     res.render('pages/success',{ userData: response.data });
            //   })

        } catch (error) {
            console.error(`Error`);
        }
    }
}