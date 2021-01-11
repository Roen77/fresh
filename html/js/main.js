$(document).ready(function(){
  
    //banner 비디오 영역

   var videolist=$(".banner_area li");
   var btns=$('.btns li');  
   var vidoes=videolist.find('video');
   var currentindex=0;

   var firstVideo=videolist.eq(0).find('video');
   firstVideo.on('canplaythrough',  function(){
       try{
           $(this)[0].play();
       }catch(err){
           console.log(err);
           return;
       }
   })

   function init(){
       videolist.eq(0).find('video').on('ended',function(){
           playVideo(0)
       });
       videolist.eq(1).find('video').on('ended',function(){
           playVideo(1)
       });
       videolist.eq(2).find('video').on('ended',function(){
           playVideo(2)
       });
   }

  function playVideo(index){
       currentindex=index;
       var nextindex=0;

       if(currentindex == vidoes.length-1){
           nextindex=0;
       }else{
           nextindex=currentindex+1;
       }
       videolist.removeClass('active');
       videolist.eq(nextindex).addClass('active');
       videolist.eq(nextindex).find('video')[0].play();
       stopVideo(currentindex);
   }

   function tabHandler(index){
       var previndex;
       previndex=index-1;
       videolist.removeClass('active');
       videolist.eq(index).addClass('active');
       videolist.eq(index).find('video')[0].play();
       if(index == 0){
           previndex=2;
       }
       stopVideo(previndex);
       videolist.eq(index).find('video')[0].currentTime=0;
   }

   function stopVideo(index){
       if(!videolist.eq(index).find('video')[0].paused){
           videolist.eq(index).find('video')[0].pause();
       }
   }
   init();

   btns.click(function(e){
       e.preventDefault();
       var index=$(this).index();
       tabHandler(index);
   })
})//end