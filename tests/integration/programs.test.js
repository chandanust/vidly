const moment = require('moment');
const request = require('supertest');
const { Program } = require('../../models/program');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

describe('/api/programs', () =>{
    let programId;
    let program;
    let token;


    const exec = () =>{
        return request(server)
        .post('/api/returns')
        .set('x-auth-token', token)
        .send(program);
    };

    beforeEach( async () => {
        server = await require('../../index');
        
        programId = mongoose.Types.ObjectId();
        token = new User().generateAuthToken();

        program = new Program({
            _id: programId,
            programCode: '0000',
            programShortName: 'TST',
            programFullName: 'TEST',
            programCategory: "UG",
            programNameInHindi: "Name In Hindi"
        });
        await program.save();
    });

    afterEach(async () => {
        await server.close();
        await program.remove({});
    });
    
    describe('POST /', () =>{
        it('should return 401 if client is not logged in', async () =>{
            token = '';
            
            const res = await exec();

            expect(res.status).toBe(401)
        });

        it('should return 400 if programCode is not provided', async () =>{
            programCode = '';
            
            const res = await exec();

            expect(res.status).toBe(400)
        });

        it('should return 400 if programShortName is not provided', async () =>{
            programShortName = '';
            
            const res = await exec();

            expect(res.status).toBe(400)
        });
    });
});