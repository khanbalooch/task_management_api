import { Application  } from "../../../../src/lib";
import supertest from 'supertest';

describe ('Tasks Path Testing', () => {

    let app: any; // = new Application();
    let server: any;
    let task = {
        "title": "Test Task",
        "description": "Test Description",
        "creationDate": "2023-10-17",
        "dueDate": "2023-11-11",
        "assignedTo": "Ibrahim",
        "category": "Test",
        "status": "Pending"
    };

    beforeEach(async () => {
        app = new Application();
        server = await app.start();
    });

    afterEach(async () => {
        await server.close();
        app = new Application();
    })

    test('should test tasks path ', async () => {
        let response: any = await supertest(app.App).get('/ncle/tasks');
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual([]);
        expect(response.body.result).toEqual('success');
    });


    test('should test create new task path ', async () => {
        let response: any = await supertest(app.App).post('/ncle/task').send(task);
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.result).toEqual('success');
    })

    test('should test get task by id path ', async () => {
        let response: any = await supertest(app.App).post('/ncle/task').send(task);
        let expectedTask = response.body.data;
        let responseById: any = await supertest(app.App).get('/ncle/task/' + expectedTask.id);

        expect(responseById.status).toBe(200);
        expect(responseById.body.data).toEqual(expectedTask);
        expect(response.body.result).toEqual('success');
    });

    test('should test update task by id path ', async () => {
        let response: any = await supertest(app.App).post('/ncle/task').send(task);
        let taskBeforeUpdate = response.body.data;
        const updatedTitle = 'Updated Title'
        let updatedResponseById: any = await supertest(app.App).put('/ncle/task/' + taskBeforeUpdate.id).send({title: updatedTitle});

        expect(updatedResponseById.status).toBe(200);
        expect(updatedResponseById.body.data).toEqual(Object.assign(taskBeforeUpdate, { title: updatedTitle}))
        expect(updatedResponseById.body.result).toEqual('success');
    });

    test('should test delete task by id path ', async () => {
        let response: any = await supertest(app.App).post('/ncle/task').send(task);
        let taskToBeDeleted = response.body.data;
        let deleteResponse: any = await supertest(app.App).delete('/ncle/task/' + taskToBeDeleted.id);

        let responseById: any = await supertest(app.App).get('/ncle/task/' + taskToBeDeleted.id);
        expect(responseById.status).toBe(404);
    });

    test('should test get tasks by assignedTo path ', async () => {
        let response: any = await supertest(app.App).post('/ncle/task').send(task);

        let responseByAssignedTo: any = await supertest(app.App).get('/ncle/tasks/?assignedTo=' + task.assignedTo);
        expect(responseByAssignedTo.status).toBe(200);
        expect(responseByAssignedTo.body.data.length).toBe(1);
        expect(responseByAssignedTo.body.data[0]).toEqual(Object.assign(task, { id: responseByAssignedTo.body.data[0].id}))
    });

    test('should test get tasks by category path ', async () => {
        let response: any = await supertest(app.App).post('/ncle/task').send(task);

        let responseByAssignedTo: any = await supertest(app.App).get('/ncle/tasks/?category=' + task.category);
        expect(responseByAssignedTo.status).toBe(200);
        expect(responseByAssignedTo.body.data.length).toBe(1);
        expect(responseByAssignedTo.body.data[0]).toEqual(Object.assign(task, { id: responseByAssignedTo.body.data[0].id}))
    });
});