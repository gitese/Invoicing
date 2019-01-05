import {expect, should} from 'chai';
import {spy, stub,SinonSpy,SinonStub} from 'sinon';
import {UserRepository} from '../../src/repository';
import {EntityService ,UserService} from '../../src/service';
import {User} from '../../src/entity';
import * as typeorm from 'typeorm';

describe("User Service FetchAll Test",async function(){
    let connectionStub: SinonStub = null;
    let userService: UserService = null;
    let entityServiceStub: SinonStub = null;
    

    beforeEach(async function(){

        connectionStub = stub(typeorm,'getCustomRepository').callsFake(()=> UserRepository);
        connectionStub.returns({});
        userService = new UserService();
    });

    afterEach(function(){
        entityServiceStub.restore();
        connectionStub.restore();
    });


    it("should expect fetchAll method in UserService to return the right data",async function(){
         entityServiceStub = stub(EntityService.prototype,'fetchAll').resolves([]);
         const users: User[] = await userService.fetchAll();
         expect(users).to.eql([]);
    });  
});

describe("User Service CreateUser Test", async function(){
    let connectionStub: SinonStub = null;
    let hashPasswordSpy: SinonSpy = null;
    let userService: UserService = null;
    let entityServiceStub: SinonStub = null;
    let user: User = null;

    beforeEach(async function(){

        connectionStub = stub(typeorm,'getCustomRepository').callsFake(()=> UserRepository);
        connectionStub.returns({});
        hashPasswordSpy = spy(UserService.prototype,'hashPassword');
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
    });

    it("should expect hashPassword to be called during User Creation", async function(){

        //use resolves for promises and return for non-promise data
        entityServiceStub = stub(EntityService.prototype,'create').resolves(user);
        const returnedUser = await userService.createUser(user);
        expect(hashPasswordSpy.calledOnce).to.be.true;

    });

    it("should expect create to return the right data upon creation", async function(){

        //use resolves for promises and return for non-promise data
        entityServiceStub = stub(EntityService.prototype,'create').resolves(user);
        const returnedUser = await userService.createUser(user);
        expect(returnedUser).to.eql(user);

    });

});