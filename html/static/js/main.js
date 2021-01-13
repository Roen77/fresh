$(document).ready(function(){
    
    var headerWrap=$('#header');
    var lang=$('header .lang li');
    var banner=$('.banner_video');
    var videos=banner.find('video');
    var bannerTop;
    var bannerBottom;
    var pageOffset;


    //header 언어 변경
    lang.click(function(){
        lang.removeClass('on');
        $(this).addClass("on");
    });
    //header 메뉴
    if($('body.pc').length>0){
        var header=$('.header');
        var headerHeight=header.outerHeight();
        var headerInner=$('.header .inner');
        var headerbar=$('.header .bar');
        var Timer;
        
        headerInner.mouseenter(function(){
            var subHeight=$(this).find('.sub').outerHeight();
            clearTimeout(Timer);
            headerWrap.addClass('active');
            header.stop().animate({height:headerHeight+subHeight+'px'},250);
        })
        header.mouseleave(function(){
            header.stop().animate({height:headerHeight+'px'},250);
            Timer=setTimeout(function(){
                headerWrap.removeClass('active');
            },200);    
        })
        header.focusin(function(){
            var subHeight=$(this).find('.sub').outerHeight();
            clearTimeout(Timer);
            headerWrap.addClass('active');
            header.stop().animate({height:headerHeight+subHeight+'px'},250)
        })
        header.focusout(function(){
            header.stop().animate({height:headerHeight+'px'},250);    
            Timer=setTimeout(function(){
                headerWrap.removeClass('active');
            },200)   

        })

    }
    //헤더 스크롤시 수정 및 스크롤 이벤트시 호출될 함수
    function scrollHandler(){
        //header 배경 수정
        if(pageYOffset>0){
            headerWrap.addClass('on');
        }else{
            headerWrap.removeClass('on');
        }
    }


    //banner 비디오 영역
        var videolist=$(".banner_area li");
        var btns=$('.loading-btns a');  
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

      
        function videoLoad(){
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
            btns.removeClass('active');
            videolist.removeClass('active');
            videolist.eq(nextindex).addClass('active');
            btns.eq(nextindex).addClass('active');
            stopVideo();
            videolist.eq(nextindex).find('video')[0].play();
            // stopVideo(currentindex);
        }
     
        function tabHandler(index){
            btns.removeClass('active');
            videolist.removeClass('active');
            videolist.eq(index).addClass('active');
            btns.eq(index).addClass('active');
            stopVideo();
            videolist.eq(index).find('video')[0].currentTime=0;
            videolist.eq(index).find('video')[0].play();
        }
     
        function stopVideo(){
            videos.each(function(i,v){
                    if(!v.paused){
                        v.pause();
                    }
            })
        }

        
    function setOffset(){
        pageOffset=pageYOffset;

        scrollHandler();
    }
        
        function init(){
            setOffset();
            videoLoad();
        }
        init();

        $(window).resize(setOffset);
        $(window).scroll(setOffset);
     
        btns.click(function(e){
            e.preventDefault();
            var index=$(this).index();
            tabHandler(index);
        })



  
})//end