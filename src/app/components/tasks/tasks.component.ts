import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import{ Task } from '../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  myTask: Task = {
    label:'',
    completed: false
  };
  tasks:Task[] = [];

  isAddTask = true;

  isHideForm = true;

  searchText = '';

  initTasks :Task[] = [];

  constructor(private taskServive: TaskService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(){
    this.taskServive.getAllTasks().subscribe(_tasks => {
      console.log(_tasks);
      this.tasks = this.initTasks = _tasks;
    });
  }
  deleteTask(id){
    this.taskServive.deleteTask(id).subscribe( () => {
      this.initTasks = this.initTasks.filter(task => task.id != id);
      });
  }

  addNewTask(){
    this.isAddTask = true;
    this.taskServive.addNewTask(this.myTask).subscribe(task => {
      this.initTasks = [task, ...this.tasks];
    });
    this.init();
  }

  //Reset Form Inputs
  init(){
    this.myTask = {
      label: '',
      completed: false
    };
  }

  toggleCompleted(task){
    this.taskServive.toggleCompleted(task.id, task.completed).subscribe(() => {
      task.completed = !task.completed; 
    });

  }

  getTaskToEdit(task){
    this.myTask = task;
    this.isAddTask = false;
    this.isHideForm = false;
  }
  updateTask(){
    this.taskServive.updateTask(this.myTask).subscribe((task) =>{
      //this.myTask = task; 
      this.init();
      this.isAddTask = true;
    });
  }

  showForm(){
    this.isHideForm = false;
    this.init();
    this.isAddTask = true;
  }

  searchTasks(){
      this.tasks = this.initTasks.filter((task) => {
        task.label.toLowerCase().includes(this.searchText.toLowerCase());
      });
  }

}
