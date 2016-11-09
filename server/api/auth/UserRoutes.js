'use strict';
import { Router } from 'express';
import { createHash } from 'crypto';
const router = Router();

class UserRoutes {
    get routes() {
        router.post('/auth/login', (req, res) => {

            const sha256 = createHash('sha256').update(req.body.password).digest('hex');

            let user = new User({local: {email: req.body.email, password: sha256, username: req.body.username, joinDate: req.body.joinDate}, status: {online: false, room: 'default', lastOnline: new Date()}});
            user.save().then((user) =>
                console.log("succesful" + " " + user)
            ).catch((err) =>
                console.log(err.message));
        });
        return router;
    }
}

Object.seal(UserRoutes);

module.exports = router;
export { UserRoutes }