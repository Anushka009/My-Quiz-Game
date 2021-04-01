class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background(186,85,211);
    fill("pink");
    textSize(30);
    text("Result Of The Quiz",320,50);
    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
      var display_position = 270;
      fill("cyan");
      textSize(20);
      text("NOTE: Contestant who answered correct are highlighted in green colour!",130,230);

      for(var plr in allContestants){
        var correctAns = "2";
        if(correctAns === allContestants[plr].answer){
          fill("Green");
        }
        else{
          fill("Red");
        }
        display_position+=20;
        text(allContestants[plr].name+":"+allContestants[plr].answer,150,display_position);
      }
    }
  }
}
