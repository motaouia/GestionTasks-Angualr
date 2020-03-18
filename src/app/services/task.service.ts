/*
//db.json
{
  "tasks": [
    {  
       "id": 1,
       "label": "Learn Machine Learning",
       "completed": false 
    },
    {  
      "id": 2,
      "label": "Learn JPA/Hibernate",
      "completed": true 
   }
  ]
}
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) { }

  getAllTasks(){
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(id){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addNewTask(task){
   return this.http.post<Task>(this.apiUrl, task);
  }

  toggleCompleted(id, completed){
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, {completed: !completed});
  }
  updateTask(task){
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }
}
