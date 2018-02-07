new Vue({
  el: '#app',
  data: {
    isAdventuring:false,
    isGameRunning:false, 
    isFightConcluded:false,
    isGameConcluded:0,  //0 nothing, 1 win, 2 loss
    finalTile:9,
    tileMapImage:'SurumLandMod0.png',
    playerCustomName:null,
    startTitle: 'Sinervue Adventures - 1: Lord of the Release',
    startImageSrc: 'start.jpg',
    startText:'You have an app that must make it to PRODuction immediately. Will you be able to release your new application with your sanity intact? Are you prepared for an adventure of danger, madness and redundancy in the land of Release? ',
    enemies:[
    {Name:'Configurator',ImageSource:'Configurator.png',Capabilities:[ 
    {Type:'You do it!',MinDamage:5, MaxDamage:17,OutcomeWinDetail:'"Well you could handle the devops as well. You do this, then this..."', OutcomeLossDetail:'Of course we will help if its urgent.'}, 
    {Type:'Dissappearing',MinDamage:8, MaxDamage:15,OutcomeWinDetail:'.....Hello? Anyone there?.....', OutcomeLossDetail:'No one escapes from their mobile phones.'}, 
    {Type:'Youre not in our product back log',MinDamage:6, MaxDamage:13,OutcomeWinDetail:'You never heard agile? You heathen!', OutcomeLossDetail:'...'}
    ]},
    {Name:'Release Gate Keepers',ImageSource:'Banky.png',Capabilities:[ 
    {Type:'Burocracy',MinDamage:9, MaxDamage:19,OutcomeWinDetail:'First INT, then TEST, then...', OutcomeLossDetail:'We can skip rules just for this once.'}, 
    {Type:'Cant it wait 23211223 days?',MinDamage:10, MaxDamage:22,OutcomeWinDetail:'"There are other release dates in the next 10 years. You can release then."', OutcomeLossDetail:'Release train has no breaks.'}, 
    {Type:'1st of the month',MinDamage:15, MaxDamage:20,OutcomeWinDetail:'Its the 1st of the month and critical usage is expected...', OutcomeLossDetail:'If its so urgent, proceed with your release.'}
    ]},
    {Name:'CeeQuue',ImageSource:'CeeQuue.png',Capabilities:[
    {Type:'Ancient technology',MinDamage:5, MaxDamage:15,OutcomeWinDetail:'Aztecs used this tool while rolling out their releases as well.', OutcomeLossDetail:'Lets pass the problematic parts manually.'}, 
    {Type:'App fail',MinDamage:7, MaxDamage:17,OutcomeWinDetail:'Well release apps are old. Problems happen.', OutcomeLossDetail:'Release train has no breaks.'}, 
    {Type:'Zip it.',MinDamage:6, MaxDamage:16,OutcomeWinDetail:'Packages are broken, you zipped them wrong. Sorry, no go.', OutcomeLossDetail:'Release app couldnt read. Fixed.'}
    ]},
    {Name:'Tes-T',ImageSource:'Tes.png',Capabilities:[
    {Type:'Wont make it in time',MinDamage:4, MaxDamage:14,OutcomeWinDetail:'There is 0 chance the tests will make it in time.', OutcomeLossDetail:'We will create time.'}, 
    {Type:'Surprise',MinDamage:3, MaxDamage:13,OutcomeWinDetail:'This item was supposed to be tested for this release?', OutcomeLossDetail:'We will make time. Adaptation is in the genes of this job.'}, 
    {Type:'Test data incomplete',MinDamage:4, MaxDamage:14,OutcomeWinDetail:'%100 testing is like unicorns... ', OutcomeLossDetail:'If its an emergency, we can test in paralel.'}
    ]},
    {Name:'The Environmentalists',ImageSource:'Ortam.png',Capabilities:[
    {Type:'18:00 and no earlier',MinDamage:8, MaxDamage:18,OutcomeWinDetail:'There are rules and you must adhere to them. ', OutcomeLossDetail:'Special cases demand priority actions'}, 
    {Type:'Dissappearing',MinDamage:10, MaxDamage:20,OutcomeWinDetail:'We have entered the 5th dimension. Will be back in 10mins.', OutcomeLossDetail:'No one escapes from their mobile phones.'}, 
    {Type:'Where is the incident record',MinDamage:6, MaxDamage:16,OutcomeWinDetail:'In the end, everything must be recored.', OutcomeLossDetail:'Why didnt you say it was an emergency. We can record later.'}
    ]},
    {Name:'Users',ImageSource:'Kullanıcı.png',Capabilities:[
    {Type:'Its broken',MinDamage:10, MaxDamage:20,OutcomeWinDetail:'"Doesnt work, its completely unusable..."', OutcomeLossDetail:'It was a user error.'}, 
    {Type:'Right click?',MinDamage:5, MaxDamage:15,OutcomeWinDetail:'So which button is the right click?', OutcomeLossDetail:'Its not rocket science.'}, 
    {Type:'Exaggeration',MinDamage:15, MaxDamage:25,OutcomeWinDetail:'"It stalls for 20mins when clicked. We are doomed!"', OutcomeLossDetail:'It happens time to time, it was a network problem apparently.'}
    ]}
    ], 
    findableItems:[  
    {Type:'Mail with gigantic cc list',ImageSource:'ccliMail.png', MinDamage:12, MaxDamage:22,OutcomeWinDetail:'Nothing is as fun as a 250cc mail circulating. ',OutcomeLossDetail:'Many eyes also means no one takes responsibility. ', IsDeletable:true}, 
    {Type:'Major of the gods',ImageSource:'major.png', MinDamage:15, MaxDamage:25,OutcomeWinDetail:'Its on them now.',OutcomeLossDetail:'Ancient proverb: If one major incident doesnt work, try another.', IsDeletable:true}, 
    {Type:'The lord of banky',ImageSource:'lotbank.png', MinDamage:20, MaxDamage:30,OutcomeWinDetail:'One would need balls of unobtainum to ignore this.',OutcomeLossDetail:'This didnt work?...But... How?', IsDeletable:true}, 
    {Type:'Passive aggressive mail',ImageSource:'atar.png', MinDamage:8, MaxDamage:18,OutcomeWinDetail:'Nothing like passive aggressive mailing in the morning.', OutcomeLossDetail:' All dem passive aggressiveness didnt work. Oh well.',IsDeletable:true},
    {Type:'Dawn of the 5th day',ImageSource:'safak.png', MinDamage:12, MaxDamage:22,OutcomeWinDetail:'All problems solved with bright lights and epic music.',OutcomeLossDetail:' Were we supposed to look west? Oh east...which way is it?', IsDeletable:true} 
    ],
    foundItemImageSrc:null,
    foundItemText:null,
    fightConclusion:{
      Outcome:'Win',
      OutcomeDetail:'Something detail something',
      ImageSource:'player.png'
    },
    gameConclusion:{
      Outcome:'Win',
      OutcomeDetail:'Something detail something',
      ImageSource:'win.png'
    },
    enemyData:null,
    playerData:null
  },
  methods:{
    displayTile:function(tileNumber){
      if(tileNumber<=this.playerData.CurrentTile)
        return true;
      else 
        return false;
    },
    quitGame(){
      this.startNewGame();
      this.isAdventuring=false;
      this.isGameRunning=false; 
    },
    startNewGame:function(){
      this.setHalfVolume();
      this.isAdventuring=true;
      this.isGameRunning=true; 
      this.isGameConcluded=0; 
      this.tileMapImage='SurumLandMod0.png';
      this.isFightConcluded=false;  
      this.playerData=this.resetPlayer(); 
      if(this.playerCustomName!=null)
      {
        this.playerData.Name=this.playerCustomName;
      }
    },
    startEncounter:function(tileNumber){  
      if(tileNumber>=this.playerData.CurrentTile){
        this.isAdventuring=false;
        this.playerData.CurrentTile=tileNumber;
        this.enemyData=this.spawnEnemy();
      }
    },
    resetPlayer(){
      var player=
      {
        Name:'Uatella',ImageSource:'player.png', Sabir:100,CurrentTile:0, Capabilities:[  
        {Type:'Jabbor',MinDamage:5, MaxDamage:14,OutcomeWinDetail:'Fast and not so furious. Advantages of communicating with someone directly. ',OutcomeLossDetail:'Their status changed to "Away" *sigh*', IsDeletable:false}, 
        {Type:'Asking nicely',MinDamage:9, MaxDamage:17,OutcomeWinDetail:'Amazing what you can do if you just ask nicely. ', OutcomeLossDetail:'If only they answered. ',IsDeletable:true}, 
        {Type:'Professional mail',MinDamage:6, MaxDamage:18,OutcomeWinDetail:'A serious mail and it worked. By the gods, unbelievable!', OutcomeLossDetail:'And you thought people read e-mails. LOL! ',IsDeletable:true}, 
        {Type:'Escalate',MinDamage:15, MaxDamage:25,OutcomeWinDetail:'Now stuff has hit the fan. Corporate gears are turning. ', OutcomeLossDetail:'You escalated but no one gives a damn.',IsDeletable:true}
        ]
      }; 
      return player;
    },
    spawnEnemy(){
      return this.enemies[this.getRandomNumber(0,this.enemies.length-1)];
    },
    calculatePlayerDamage(index){
      return this.calculateDamage(this.playerData.Capabilities[index].MinDamage,this.playerData.Capabilities[index].MaxDamage);
    },
    useAttack:function(index){ 
        //calculate damages
        var playerDamage = this.calculatePlayerDamage(index); 

        var enemyAttackType = this.getRandomNumber(0,this.enemyData.Capabilities.length-1);
        var enemyDamage = this.calculateEnemyDamage(enemyAttackType);
        //fight is concluded
        this.concludeFight(playerDamage, index,enemyDamage, enemyAttackType); 
      },
      calculateDamage:function(minDamage,maxDamage){
        return this.getRandomNumber(minDamage,maxDamage);
      },
      getRandomNumber:function(lowerLimit,upperLimit){
        return Math.max(Math.floor(Math.random() * upperLimit)+1,lowerLimit); 
      },
      calculateEnemyDamage(enemyAttackIndex){ 
        return this.calculateDamage(this.enemyData.Capabilities[enemyAttackIndex].MinDamage,this.enemyData.Capabilities[enemyAttackIndex].MaxDamage);
      },
      concludeFight(playerDamage, index,enemyDamage, enemyAttackIndex){
        this.isFightConcluded=true;
        this.foundItemImageSrc=null;
        this.foundItemText=null;

        if(playerDamage >= enemyDamage){
        //setup conclusion for player favor
        this.fightConclusion.Outcome='Victory';
        this.fightConclusion.ImageSource=this.playerData.ImageSource;
        this.fightConclusion.OutcomeDetail=`You used "`+this.playerData.Capabilities[index].Type +`" and it was super affective (`+playerDamage+`). `+this.playerData.Capabilities[index].OutcomeWinDetail+` `+this.enemyData.Name+`, used "`+this.enemyData.Capabilities[enemyAttackIndex].Type+`" but failed miserably (`+enemyDamage+`). `+this.enemyData.Capabilities[enemyAttackIndex].OutcomeLossDetail; 

        //remove used item if removable
        if(this.playerData.Capabilities[index].IsDeletable)
          this.playerData.Capabilities.splice(index, 1);
        //look for loot
        this.searchForLoot();

        //move player up 1 tile
        this.playerData.CurrentTile+=1;
        this.tileMapImage='SurumLandMod'+this.playerData.CurrentTile+'.png';
      }
      else {
      //setup conclusion for enemy favor
      this.fightConclusion.Outcome='Oh, snap!'         
      this.fightConclusion.ImageSource=this.enemyData.ImageSource;
      this.fightConclusion.OutcomeDetail=`You used "`+this.playerData.Capabilities[index].Type +`" but it didn't work (`+playerDamage+`). `+this.playerData.Capabilities[index].OutcomeLossDetail+` `+this.enemyData.Name+`, used "`+this.enemyData.Capabilities[enemyAttackIndex].Type+`" and it was super affective. (`+enemyDamage+`). `+this.enemyData.Capabilities[enemyAttackIndex].OutcomeWinDetail; 

        //remove used item if removable
        if(this.playerData.Capabilities[index].IsDeletable)
          this.playerData.Capabilities.splice(index, 1);

        this.playDefeatSound();
      }

        //calculate players new sabir
        this.calculateSabir(playerDamage-enemyDamage);
      },
      checkGameStatus(){
        if(this.playerData.Sabir<=0)
          this.isGameConcluded=2;
        else if(this.playerData.CurrentTile>=this.finalTile)
          this.isGameConcluded=1;
      },
      calculateSabir(threshold){ 
        if(threshold>=0)
        {  
          if(threshold==0) 
            this.playerData.Sabir+=3;  
          else if(threshold>0 && threshold<7)
            this.playerData.Sabir+=7; 
          else if(threshold>=7)
            this.playerData.Sabir+=11; 
        } 
        else if(threshold<0 && threshold>-7)
          this.playerData.Sabir-=11; 
        else if(threshold<=-7)
          this.playerData.Sabir-=18; 

        if(this.playerData.Sabir>100)
          this.playerData.Sabir=100;
      },
      searchForLoot(){ 

      //check if any loot available
      var prob=this.getRandomNumber(0,100);
      if(prob>50)
      {
        var foundItem=this.findableItems[this.getRandomNumber(0,this.findableItems.length-1)];
        if(!this.isItemExist(foundItem))
        {
          this.playerData.Capabilities.push(foundItem);
          this.foundItemImageSrc=foundItem.ImageSource;
          this.foundItemText=`You found `+ foundItem.Type+` while releasing.`;
        }
        else
          foundItemText=`You found `+ foundItem.Type+` while releasing but you already have one. Besides, who wants 2 of something.`;
      }
    },
    continueAfterConclusion(){ 
      this.checkGameStatus(); 
      if(this.isGameConcluded==0){
        this.isAdventuring=true; 
        this.isFightConcluded=false; 
      }
      else if(this.isGameConcluded==2){ 
        this.isAdventuring=false; 
        this.isFightConcluded=false; 
        this.gameConclusion.Outcome="You couldn't...release."
        this.gameConclusion.OutcomeDetail="You tried but alas you didn't make it. All was for nothing."
        this.gameConclusion.ImageSource="defeat.gif"
      } 
      else if(this.isGameConcluded==1){ 
        this.isAdventuring=false; 
        this.isFightConcluded=false; 
        this.gameConclusion.Outcome="Gratz..."
        this.gameConclusion.OutcomeDetail="Against old odds the package is sent to production. Congradulations you cheeky devops muncher."
        this.gameConclusion.ImageSource="victory.png"
      }
    },
    isItemExist : function(itemToSearch){
      for(var i=0; i < this.playerData.Capabilities.length; i++){
        if( this.playerData.Capabilities[i].Type == itemToSearch.Type){
          return true;
        }
      }
      return false;
    },
    setHalfVolume: function() {
     this.$refs.audioGen.volume = 0.5; 
   },
   playDefeatSound: function() {
     this.$refs.audioDefeat.play();
   }
 } 
});
