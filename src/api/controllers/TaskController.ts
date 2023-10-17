import { NextFunction, Request, Response } from 'express';
import { RoutingController } from '../../lib/RoutingController';
import { TaskService } from '../services/TaskService';
import { validateBody } from '../customMiddlewares/ValidationMiddleware';
import { Task } from '../models/Task/Task';
import { CustomError } from '../../lib';

export class TaskController extends RoutingController {

    private taskService: TaskService = new TaskService();
    

    initRoutes(): void {

        this.router.post('/task', validateBody(Task), this.createTask.bind(this));
        this.router.get('/task/:id', this.getTaskById.bind(this));
        this.router.put('/task/:id', validateBody(Task, { skipMissingProperties: true }), this.updateTask.bind(this));
        this.router.delete('/task/:id', this.deleteTask.bind(this));
        this.router.get('/tasks', this.getAllTasks.bind(this));
        this.router.get(TASKS_PATH, this.getAllTasks.bind(this));
    }

    public async createTask(req: Request, res: Response, next: NextFunction): Promise<any> {
        console.log('Create Task');
        try {
            const task = await this.taskService.createTask(req.body);
            return res.status(200).send({ result: 'success', data: task });
        } catch (error) {
            next(error);
        }
    }

    public async getTaskById(req: Request, res: Response, next: NextFunction): Promise<any> {
        console.log('get task by id');
        try {
            const task = await this.taskService.getTaskById(req.params.id);
            if(!task) {
                throw new CustomError('Not Found', 404);
            }
            return res.status(200).send({ result: 'success', data: task }); 
        } catch (error) {
            next(error);
        }
    }

    public async updateTask(req: Request, res: Response, next: NextFunction): Promise<any> {
        console.log('Update Task');
        try {
            const task = await this.taskService.updateTask(req.params.id, req.body);
            return res.status(200).send({ result: 'success', data: task });
        } catch (error) {
            next(error);
        }
    }

    public async deleteTask(req: Request, res: Response, next: NextFunction): Promise<any> {
        console.log('Delete Task');
        try {
            const task = await this.taskService.deleteTask(req.params.id);
            return res.status(200).send({ result: 'success', data: task });
        } catch (error) {
            next(error);
        }
    }

    public async getAllTasks(req: Request, res: Response, next: NextFunction): Promise<any> {
        console.log('Get all Tasks');
        try {
            const assignedTo = req?.query?.assignedTo;
            const category = req?.query?.category;

            const tasks = await this.taskService.getAllTasks({
                ...(assignedTo && { assignedTo }),
                ...(category && { category })
            });
            return res.status(200).send({ result: 'success', data: tasks });
        } catch (error) {
            next(error)
        }
        
    }
}
