import { CustomError } from "../../lib";
import { Task } from "../models/Task/Task";
import * as short_uuid from 'short-uuid';

export class TaskService {
    private tasks: Task [] = [];

    constructor(){}

    public createTask(task: Task): Promise<Task> {
        task.id = short_uuid.generate();
        console.log('create task:', this.tasks.push(task));
        return Promise.resolve(task);
    }

    public async getAllTasks(filter : any): Promise<Task[]>  {
        const { category, assignedTo } = filter;
        let filteredData = [...this.tasks];

        if(category) {
            filteredData = filteredData.filter(task => task.category === category);
        }

        if(assignedTo) {
            filteredData = filteredData.filter(task => task.assignedTo === assignedTo);
        }

        return Promise.resolve(filteredData);
    }

    public async getTaskById(id: string): Promise<Task | undefined> {
        const result = this.tasks.find( task => task.id === id );
        return Promise.resolve(result);
    }

    public async updateTask(id: string, data: Partial<Task>): Promise<Task | undefined> {
        const index = this.tasks.findIndex( task => task.id === id );
        if(index === -1 ) {
            return Promise.reject(new CustomError('Not Found', 404));
        }
        delete data.id;
        this.tasks[index] = Object.assign(this.tasks[index] , data);
        return Promise.resolve(this.tasks[index]);
    }

    public async deleteTask(id: string): Promise<Task | undefined> {
        const index = this.tasks.findIndex( task => task.id === id );
        if(index === -1 ) {
            return Promise.reject(new CustomError('Not Found', 404));
        }
        const task = this.tasks[index];
        this.tasks.splice(index, 1);
        return Promise.resolve(task);
    }
}