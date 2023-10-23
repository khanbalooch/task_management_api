import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString,  } from 'class-validator';

export enum ITaskStatus {
    PENDING = 'Pending',
    COMPLETED = 'Completed'
}

export class Task {

    @IsString()
    @IsOptional()
    public id: string;
    
    @IsNotEmpty()
    @IsString()
    public title: string;

    @IsOptional()
    public description: string;
    
    @IsNotEmpty()
    @IsDateString()
    public creationDate: Date;

    @IsNotEmpty()
    @IsDateString()
    dueDate: Date;

    @IsNotEmpty()
    @IsString()
    assignedTo: string;
    
    @IsNotEmpty()
    @IsString()
    public category: string;

    @IsEnum(ITaskStatus)
    public status: ITaskStatus
};
