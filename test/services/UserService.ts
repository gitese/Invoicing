import {expect, should} from 'chai';
import {spy, stub,SinonSpy,SinonStub} from 'sinon';
import {UserRepository} from '../../src/repository';
import {EntityService ,UserService} from '../../src/service';
import {User} from '../../src/entity';
import * as typeorm from 'typeorm';
import * as bcrypt from 'bcrypt';

describe("User Service Test", async function(){

    let connectionStub: SinonStub = null;
    let hashPasswordSpy: SinonSpy = null;
    let bcryptSpy: SinonSpy = null;
    let userService: UserService = null;
    let entityServiceStub: SinonStub = null;
    let user: User = null;

    beforeEach(async function(){

        connectionStub = stub(typeorm,'getCustomRepository').callsFake(()=> UserRepository);
        connectionStub.returns({});
        hashPasswordSpy = spy(UserService.prototype,'hashPassword');
        bcryptSpy = spy(bcrypt,'hash');
        userService = new UserService();
        user = new User();
        user.id = 45,
        user.firstName = "Ese",
        user.lastName = "Erigha",
        user.email = "fzanimotto@gmail.com",
        user.company_name ="Eroe consulting",
        user.password = "Fzanimotto",
        user.invoices = []  
    });

    afterEach(function(){
        entityServiceStub.restore();
        hashPasswordSpy.restore();
        connectionStub.restore();
        bcryptSpy.restore();
    });


    it("should expect fetchAll function to return the right data",async function(){

        entityServiceStub = stub(EntityService.prototype,'fetchAll').resolves([]);
        const users: User[] = await userService.fetchAll();
        expect(users).to.eql([]);
   }); 
   
   
   it("should expect fetchOne function to return the right data",async function(){

        entityServiceStub = stub(EntityService.prototype,'findOne').resolves(user);
        const returnedUser: User = await userService.findOne(user.id.toString());
        expect(returnedUser).to.eql(user);
    });
    
    it("should expect delete function to return boolean",async function(){

        entityServiceStub = stub(EntityService.prototype,'delete').resolves(true);
        const status: boolean = await userService.delete(user.id.toString());
        expect(status).to.eql(true);
    });

    it("should expect hashPassword function to be called during User Creation", async function(){

        //use resolves for promises and return for non-promise data
        entityServiceStub = stub(EntityService.prototype,'create').resolves(user);
        const returnedUser = await userService.createUser(user);
        expect(hashPasswordSpy.calledOnce).to.be.true;
    });

    it("should expect create function to return the right data upon creation", async function(){

        //use resolves for promises and return for non-promise data
        entityServiceStub = stub(EntityService.prototype,'create').resolves(user);
        const returnedUser = await userService.createUser(user);
        expect(returnedUser).to.eql(user);
    });

    it("should expect hashPassword function to be called during User Update if user password is included", async function(){

        //use resolves for promises and return for non-promise data
        entityServiceStub = stub(EntityService.prototype,'update').resolves(true);
        const state = await userService.updateUser(user.id.toString(),user);
        expect(hashPasswordSpy.calledOnce).to.be.true;
    });


    it("should expect hashPassword function to not be called during User Update if user password is not included", async function(){

        //use resolves for promises and return for non-promise data
        entityServiceStub = stub(EntityService.prototype,'update').resolves(true);
        delete user['password'];
        const state = await userService.updateUser(user.id.toString(),user);
        expect(hashPasswordSpy.called).to.be.false;
    });


    it("should expect bcrypt hash function to be called when hashing password", async function(){

        //use resolves for promises and return for non-promise data 
        const hash = await userService.hashPassword("helloWorld");
        expect(bcryptSpy.called).to.be.true;
    });

    it("should expect bcrypt hash function to not be called when hashing password with length zero", async function(){

        //use resolves for promises and return for non-promise data 
        const hash = await userService.hashPassword("");
        expect(bcryptSpy.called).to.be.false;
    });

});