import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/service/questions.service';
import { interval } from 'rxjs'
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit{

  // required class variables
  public name: string="";
  public email: string="";
  public questionsList:any=[];
  public answeredList: any=[];
  public questionNumber: number = 0;
  score: number = 0;
  counter = 60;
  num_of_correct_Ans = 0;
  num_of_wrong_Ans = 0;
  timer$: any;
  progressiveBar:string="0";
  isTestCompleted:boolean = false;

  // Constructor
  constructor(private questionsService: QuestionsService){}

  // ngOnInit() method to start the component as soon as the page is loaded
  ngOnInit(): void {
    this.name=localStorage.getItem("name")!;
    this.email=localStorage.getItem("email")!;
    this.getAllQuestions();
    this.startTimer();
  }

  // method to get the all the questions from the json file. 
  getAllQuestions()
  {
    this.questionsService.getQuestionsJson()
    .subscribe(res=>{
      this.questionsList = res.questions;
    })
  }

  // method to go to the next question
  nextQuestion(){
    this.questionNumber++;
    this.resetTimer();
  }

  // method to go to the previous
  previousQuestion(){
    this.questionNumber--;
    this.resetTimer();
  }

  // method to check for the user selected option
  userAnswer(questionNum: number, option: any){
    if(questionNum === this.questionsList.length)
    {
      this.isTestCompleted = true;
      this.score = this.score + this.num_of_wrong_Ans*-5;
      this.stopTimer();
    }
    if(option.correct){
      this.score +=10;      
      this.num_of_correct_Ans++;   
    }
    else{        
      this.num_of_wrong_Ans++;
    }
    
    // To delay before going to next question
    setTimeout(()=>{
      this.questionNumber++;
      this.resetTimer();
      this.getProgressiveBarPercent();
    }, 1000);
   
  }

  // method to start the timer for each question
  startTimer(){    
    this.timer$ = interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter===0)
      {
        this.questionNumber++;
        this.counter = 60;
      }
    });
    setTimeout(()=>
    {
      this.timer$.unsubscribe();
    }, 600000);
  }

  // method to set the stop timer
  stopTimer(){
    this.timer$.unsubscribe();
    this.counter=0;
  }

  // method to reset the timer 
  resetTimer(){
    this.stopTimer();
    this.counter=60;
    this.startTimer();
  }

  // Method to reset the complete test
  resetTest(){
    this.resetTimer();
    this.getAllQuestions();
    this.counter=60;
    this.score=0;
    this.questionNumber=0;
    this.progressiveBar="0";
  }

  // method to update the progress bar
  getProgressiveBarPercent()
  {
    this.progressiveBar = ((this.questionNumber/this.questionsList.length)*100).toString();
    return this.progressiveBar;
  }
}
