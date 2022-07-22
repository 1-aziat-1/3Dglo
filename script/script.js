window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    const flyAnimate = (item)=>{
        const href = item.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById(href);
        const elemPosition = scrollTarget.getBoundingClientRect().top;
        window.scrollBy({
            top: elemPosition,
            behavior: 'smooth',
        });
    }

    //TIMER

    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining(){
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60 ),
            arrTimer = {timeRemaining, hours, minutes, seconds};
            for(let key in arrTimer){
                if(arrTimer[key] % 10 === arrTimer[key] ){
                    arrTimer[key] = `0` +  arrTimer[key];
                }
            }
            
            if(timeRemaining > 0){
                return arrTimer;
            }else{
                for(let key in arrTimer){
                    arrTimer[key] = '00';
                }
                return arrTimer;
            }
            
        }

        function updateClock(){
            let timer = (getTimeRemaining());
        
            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

        }

        setInterval(function(){
            updateClock();
        }, 10);
        
 
    }

    countTimer('24 november 2021');
    
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
              menu = document.querySelector('menu');

              
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        // document.addEventListener('click',(event)=>{
        //     let target = event.target;
        //     if(target.closest('.menu')){
        //         handlerMenu();
        //     }else if(target.closest('menu')){
        //         if(target.matches('a')){
        //                     event.preventDefault();
        //                     handlerMenu();
        //                     if(target.closest('ul')){
        //                         flyAnimate(target);
        //                     }
                            
        //         }
        //     }
        // })
        
        btnMenu.addEventListener('click',handlerMenu);       
        
        menu.addEventListener('click', (event)=>{
            let target = event.target;
            if(target.matches('a')){
                event.preventDefault();
                handlerMenu();
                if(target.closest('ul')){
                    flyAnimate(target);
                }
            }else{
                console.log(1);
            }
        })
        
    };

    
    toggleMenu();

    ///poppup

    const togglePoppUp = () => {
        const popup = document.querySelector('.popup'),
              popupBtn = document.querySelectorAll('.popup-btn'),
              popupContent = popup.querySelector('.popup-content'),
              widthDocument = document.documentElement.clientWidth;

        let flyInterval,
            count =  -200;
        
        const animate = () => {
            count+=10;
            if(count<(widthDocument/2)){
                popupContent.style.left = count + 'px';
            }else{
                clearInterval(flyInterval);
                count = -200;
            }
            
        };
             

        popupBtn.forEach((item) => {
            item.addEventListener('click', () => { 
                popup.style.display = 'block';
                if(widthDocument >= 768){
                    flyInterval = setInterval(animate,1); 
                }else{
                    popupContent.style.left = 50 + '%';
                }                
            });
        });
        

        popup.addEventListener('click',(event)=>{
            let target = event.target;

            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
            }else{
                target = target.closest('.popup-content');
                if(!target){
                    popup.style.display = 'none';
                }
            }

                
        });
        
    };

    togglePoppUp();

    const buttonScroll = () => {
        const btnScroll = document.querySelector('[href="#service-block"]');
        btnScroll.addEventListener('click', function(e){
            e.preventDefault();
            flyAnimate(btnScroll);

        });
    };

    buttonScroll();

    ///tabs

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
              tab = document.querySelectorAll('.service-header-tab'),
              tabContent = document.querySelectorAll('.service-tab');
        const toggleTabContent = (index)=>{
            for(let i =0; i< tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                }else{
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
                target = target.closest('.service-header-tab');

            
            if(target){
                tab.forEach((item, i)=>{
                    if(item === target){
                        toggleTabContent(i);
                    }
                });
            }
        })      
    };

    tabs();

    //slider

    const slider = () =>{
        const slider = document.querySelector('.portfolio-content'),
              slide = document.querySelectorAll('.portfolio-item');
              
        const createDot = () => {
            const dotUl = document.createElement('ul');
                  dotUl.classList.add('portfolio-dots');
            for(let i=0;i<slide.length;i++){
                const dotLi = document.createElement('li');
                dotLi.classList.add('dot');
                if(i===0){
                    dotLi.classList.add('dot-active');
                }
                dotUl.append(dotLi);
            }
            
             slider.append(dotUl);
        };      
            
        createDot();

        const dot = document.querySelectorAll('.dot');
              
        let currentSlide = 0, //№ slide
            interval;

        const prevSlide = (elem,index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem,index, strClass) => {
            elem[index].classList.add(strClass);
        };
        
        const autoplaySlide = () =>{
            prevSlide(slide,currentSlide,'portfolio-item-active');
            prevSlide(dot,currentSlide,'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide,currentSlide,'portfolio-item-active');
            nextSlide(dot,currentSlide,'dot-active');
        };

        const startSlide = (time = 1500) => {
            interval = setInterval(autoplaySlide,time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event)=>{
            event.preventDefault();
            
            let target = event.target;

            if(!target.matches('.portfolio-btn, .dot')){
               return;
            }
            
            prevSlide(slide,currentSlide,'portfolio-item-active');
            prevSlide(dot,currentSlide,'dot-active');

            if(target.matches('#arrow-right')){
                currentSlide++;
            }else if(target.matches('#arrow-left')){
                currentSlide--;
            }else if(target.matches('.dot')){
                dot.forEach((elem, index)=>{
                    if(elem === target){
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            if(currentSlide < 0){
                currentSlide = slide.length-1;
            }

            nextSlide(slide,currentSlide,'portfolio-item-active');
            nextSlide(dot,currentSlide,'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                startSlide();
            }
        });

        startSlide(1500);
    };

    slider();

    //Comand

    const comandChange = ()=>{

        const imgContainer = document.getElementById('command'),
              images = imgContainer.querySelectorAll('.command__photo');
              
        images.forEach(item=>{

            const changeImg = (target) => {
                let src = target.src;
                target.src = target.dataset.img;
                target.dataset.img = src;
            };

            item.addEventListener('mouseenter',(event)=>{
                changeImg(event.target);
            });
            item.addEventListener('mouseleave',(event)=>{
                changeImg(event.target);
            });
        });
    };

    comandChange();

    //kalculator

    const calc = () => {

        const  calcContainer = document.querySelector('.calc'),
               inputCacl = calcContainer.querySelectorAll('input');
        
        inputCacl.forEach((item)=>{
            item.addEventListener('input', ()=>{
                item.value = item.value.replace(/\D/g, '');
            });
        });
        
    };

    calc();

    //connect

    const connect = () => {
        const connectContainer = document.querySelector('.connect');

        connectContainer.addEventListener('click',(event)=>{
            let target = event.target;
            if(!target.matches('input')){
                return;
            }

            if(target.matches('#form2-name, #form2-message')){
                target.addEventListener('input',()=>{
                    target.value = target.value.replace(/[^А-Яа-яЁё-\s]/g, '');
                });
            }

            if(target.matches('#form2-email')){
                target.addEventListener('input',()=>{
                    target.value = target.value.replace(/[^A-Za-z\.\@\-\_\!\`\*\']/g, '');
                });
            }

            if(target.matches('#form2-phone')){
                target.addEventListener('input',()=>{
                    target.value = target.value.replace(/[^\d\(\)\-]/g, '');
                });
            }

            if(target.matches('input')){
                //target.value = target.value.replace()
                target.addEventListener('blur',()=>{
                    if(target.matches('#form2-name')){
                        target.value = target.value[0].toUpperCase() + target.value.slice(1).toLowerCase();
                    }
                })
            }
        });
    };

    connect();
});