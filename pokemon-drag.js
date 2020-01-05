//紫苑镇
let ziyuanZhen = document.querySelector('.ziyuan-zhen');
// 小赤
let littleRed = document.querySelector('.little-red');
//紫苑镇BGM
let gameBgm = document.querySelector('.game-bgm');
//开始游戏
let startGame = document.querySelector('.start-game');
//精灵球们
let elfBalls = document.querySelectorAll('.elf-ball');
//pokemon(包含着精灵和道具)
let pokemons = document.querySelectorAll('.pokemon');
//寻找一个精灵球，使用精灵球间隔函数
let lookForElfBallTimer,useElfBallTimer;
//妖怪们
let monsters = document.querySelectorAll('.monsters');
//妖怪们初始位置,找到一只妖怪，妖怪们进攻间隔函数
let resetPokemonTimer,lookForPokemonTimer,attackPokemonTimer;
//道具顽皮弹
let propsNaughtyBombs = document.querySelectorAll('.props-naughty-bomb');
//道具大师球
let propsMasterBalls = document.querySelectorAll('.props-master-ball');
//大师球
let masterBalls = document.querySelectorAll('.master-ball');
//寻找一个大师球，使用大师球间隔函数
let useMasterBallTimer,lookForMasterBallTimer;
//先定义一个变量，默认值为false，代表目前是否为使用大师球状态
let masterBallEffect = false;
//暂停游戏
let pauseButton = document.querySelector('.pause-button');
//分数
let fraction = document.querySelector('.fraction');
//游戏菜单
let gameMenu = document.querySelector('.game-menu');
//定义大师球切换精灵球的计时函数
let msterBallSwitchElfBallTimer;
//继续游戏
let continueTheGame = document.querySelector('.continue-the-game');
//重新开始游戏
let restartGame = document.querySelector('.restart-game');
//游戏结束
let gameOver = document.querySelector('.game-over');
//重新开始菜单
let restartMenu = document.querySelector('.restart-menu');
//重新开始游戏
let restart = document.querySelector('.restart');
//大师球切换为精灵球的时间函数
let masterBallSwitchElfBall;


startGame.addEventListener('click',enterGame);


function enterGame() {
    //移除开始游戏
    startGame.remove();
    //紫苑镇
    gameBgm.play();
    //紫苑镇动画
    ziyuanZhen.classList.add('ziyuan-zhen-Animation');
    //显示小赤
    littleRed.style.display = 'inline-block';
    //显示皮卡丘
    pauseButton.style.display = 'inline-block';
    //显示分数
    fraction.style.display = 'block';
    //当点击皮卡丘的时候会弹出游戏菜单
    pauseButton.addEventListener('click',pauseTheGame);
    //弹出游戏菜单
    function pauseTheGame() {
        //弹出游戏菜单的时候会把游戏菜单显示
        gameMenu.style.display = 'block';
        //会取消pokemon下落的间隔函数
        clearInterval(attackPokemonTimer);
        //会移除掉拖动小赤的函数
        littleRed.removeEventListener('mousedown',pcMobile);
        //会取消大师球切换精灵球的时间函数
        clearInterval(masterBallSwitchElfBall);
        //会取消寻找一个大师球的间隔函数
        clearInterval(lookForMasterBallTimer);
        //会取消寻找一个精灵球的间隔函数
        clearInterval(lookForElfBallTimer);

    }

    //当点击继续游戏，游戏会继续运行
    continueTheGame.addEventListener('click',carryOnGame);
    //继续运行游戏
    function carryOnGame() {
        //继续游戏点击后会把游戏菜单隐藏
        gameMenu.style.display = 'none';
        //会重新找到一个精灵球
        lookForElfBallTimer = setInterval(lookForElfBall,50);
        //pokemon会重新下落
        attackPokemonTimer = setInterval(attackPokemon, 30);
        //可以拖动小赤
        littleRed.addEventListener('mousedown',pcMobile);
        
        
        // 大师球先暂停
        if(!masterBallEffect) {
            masterBallSwitchElfBall = setTimeout((timer) => {     
            lookForElfBallTimer = setInterval(lookForElfBall,50);
            //当10秒后，又会恢复masterBallEffect赋值为true，使后面重新相交后才会重新运行如上代码
            masterBallEffect = true;
            clearInterval(timer);
        },10000, lookForMasterBallTimer);
        
        }
        
        


    }

    //当点击重置游戏，游戏会重新运行
    restartGame.addEventListener('click',resetGame);
    //重新运行游戏
    function resetGame() {
        //重新游戏点击后会把游戏菜单隐藏
        gameMenu.style.display = 'none';
        //会重新找到一个精灵球
        lookForElfBallTimer = setInterval(lookForElfBall,50);
        //pokemon会重新下落
        attackPokemonTimer = setInterval(attackPokemon, 30);
        //可以拖动小赤
        littleRed.addEventListener('mousedown',pcMobile);
        //重置小赤的位置
        littleRed.style.top = '80%';
        littleRed.style.left = '45%';
        //重置pokemon的位置
        resetPokemonTimer = resetPokemon();
        //大师球先暂停
    }


    //PC端拖动
    littleRed.addEventListener('mousedown',pcMobile)
    //拖动小赤
    function pcMobile(event){
        const shiftX = event.clientX - littleRed.offsetLeft;
        const shiftY = event.clientY - littleRed.offsetTop;
        document.addEventListener('mousemove',mobileLittleRed);
        document.addEventListener('mouseup',mobileLittleRedStop);

        function mobileLittleRed(event) {
            littleRed.style.left = event.pageX - shiftX + 'px';
            littleRed.style.top = event.pageY - shiftY + 'px';
        }

        function mobileLittleRedStop() {
            document.removeEventListener('mousemove',mobileLittleRed);
            document.removeEventListener('mouseup',mobileLittleRedStop);
        }
    };
    

    //取消自带的拖动事件
    littleRed.ondragstart = () => false;
    

    //寻找一个精灵球
    function lookForElfBall() {
        for(let elfBall of elfBalls) {
            if(elfBall.offsetTop <= -50) {
                elfBall.style.left = littleRed.offsetLeft + littleRed.offsetWidth / 5 + 'px';
                elfBall.style.top = littleRed.offsetTop - littleRed.offsetHeight /  2 + 'px'; 
                break;
            }
        }
    }

    //使用精灵球
    function useElfBall() {
        for(let elfBall of elfBalls) {
            if(elfBall.offsetTop >= -50) {
                elfBall.style.top = elfBall.offsetTop - 20 + 'px';
            }
        }

        //相交后妖怪被收服
        for(let elfBall of elfBalls) {
            for(let monster of monsters) {
                if(checkIntersect(elfBall,monster) && !monster.querySelector('span')) {
                    let subdue = document.createElement('span');
                    subdue.classList.add('subdue');
                    monster.append(subdue);
                    setTimeout(subdueMonster,300,monster,elfBall);
                }
            }
        }
    }

    //妖怪收服后重置
    function subdueMonster(monster,elfBall) {
        const monsterMaxTop = -monster.offsetHeight;
        const maxLeft = ziyuanZhen.offsetWidth - monster.offsetWidth;
        elfBall.style.top = -elfBall.offsetHeight + 'px';
        monster.style.top = _.random(-500, monsterMaxTop) + 'px';
        monster.style.left = _.random(0, maxLeft) + 'px';
        monster.innerHTML = '';
    }



    //执行精灵球
    function executeElfBall() {
        useElfBallTimer = setInterval(useElfBall,10);
        lookForElfBallTimer = setInterval(lookForElfBall,50);
        
    }
    executeElfBall();


    //pokemon初始位置
    function resetPokemon() {
        for(let pokemon of pokemons) {
            const maxLeft = ziyuanZhen.offsetWidth - pokemon.offsetWidth;
            const maxTop = -pokemon.offsetHeight;
            pokemon.setAttribute('data-setp',_.random(3,7));
            pokemon.style.left = _.random(0, maxLeft) + 'px';
            pokemon.style.top = _.random(-500, maxTop) + 'px';
        }
    }


    //找到一个pokemon
    function lookForPokemon() {
        for(let pokemon of pokemons) {
            if(pokemon.offsetTop >= ziyuanZhen.offsetHeight) {
                const maxLeft = ziyuanZhen.offsetWidth - pokemon.offsetWidth;
                pokemon.setAttribute('data-setp',_.random(3,7));
                pokemon.style.left = _.random(0,maxLeft) + 'px';
                pokemon.style.top = - pokemon.offsetHeight +'px';
                break;
            }
        }
    }


    //pokemon下落
    function attackPokemon() {
        for(let pokemon of pokemons) {
            if(pokemon.offsetTop < ziyuanZhen.offsetHeight) {
                const setp = +pokemon.getAttribute('data-setp');
                pokemon.style.top = pokemon.offsetTop + setp + 'px';
            }
        }
        //相交后大师球道具消失
        for(let propsMasterBall of propsMasterBalls) {
            if(checkIntersect(propsMasterBall,littleRed)) {
                setTimeout(applyMasterBall,100,propsMasterBall,littleRed);
                //会运行一次，因为这个变量是true 
                if(!masterBallEffect) {
                    //当道具大师球与小赤相交时，会把变量masterBallEffect赋值为true，使不再重复运行如下的代码 
                    masterBallEffect = true;
                    clearInterval(lookForElfBallTimer);
                    //执行寻找一个大师球间隔函数
                    lookForMasterBallTimer = setInterval(lookForMasterBall,20);
                    //大师球切换精灵球的计时函数
                    masterBallSwitchElfBall = setTimeout((timer) => {     
                                                lookForElfBallTimer = setInterval(lookForElfBall,50);
                                                //当10秒后，又会恢复masterBallEffect赋值为false，使后面重新相交后才会重新运行如上代码
                                                masterBallEffect = false;
                                                clearInterval(timer);
                                            },10000, lookForMasterBallTimer);
                 }
            }
                
        }

        
        //大师球道具消失后重置
        function applyMasterBall(propsMasterBall,littleRed) {
            const propsMasterBallMaxTop = -littleRed.offsetHeight;
            const maxLeft = ziyuanZhen.offsetWidth - propsMasterBall.offsetWidth;
            propsMasterBall.style.top = _.random(-500, propsMasterBallMaxTop) + 'px';
            propsMasterBall.style.left = _.random(0, maxLeft) + 'px';
        }



        //相交后顽皮弹道具消失，并使用顽皮弹全场妖怪被收服
        for(let propsNaughtyBomb of propsNaughtyBombs) {
            for(let monster of monsters) {
                if(checkIntersect(propsNaughtyBomb,littleRed) && !monster.querySelector('span')) {
                    let subdue = document.createElement('span');
                    subdue.classList.add('subdue');
                    monster.append(subdue);
                    setTimeout(applyNaughtyBomb,100,propsNaughtyBomb,littleRed);
                    setTimeout(explosionMonste,300);
                }
                //妖怪被收服后重置
                function explosionMonste() {
                    const maxLeft = ziyuanZhen.offsetWidth - monster.offsetWidth;
                    monster.style.top = _.random(-500,0) + 'px';
                    monster.style.left = _.random(0, maxLeft) + 'px';
                    monster.innerHTML = ' ';
                    
                }
            }
        }

        //顽皮弹道具消失后重置
        function applyNaughtyBomb(propsNaughtyBomb,littleRed) {
            const propsNaughtyBombMaxTop = -littleRed.offsetHeight;
            const maxLeft = ziyuanZhen.offsetWidth - propsNaughtyBomb.offsetWidth;
            propsNaughtyBomb.style.top = _.random(-500, propsNaughtyBombMaxTop) + 'px';
            propsNaughtyBomb.style.left = _.random(0, maxLeft) + 'px';
        }


        




        //当妖怪跟小赤相交会game over
        for( monster of monsters) {
            if(checkIntersect(monster,littleRed)) {         
                littleRed.style.display = 'none';
                gameOver.style.display = 'inline-block';
                restartMenu.style.display = 'inline-block';
                clearInterval(lookForElfBallTimer);
                clearInterval(lookForMasterBallTimer);
                clearInterval(masterBallSwitchElfBall);
                restart.addEventListener('click',() => {
                    
                    gameOver.style.display = 'none';

                    restartMenu.style.display = 'none';
                    //会重新找到一个精灵球
                    lookForElfBallTimer = setInterval(lookForElfBall,50);
                    //可以重新显示小赤
                    littleRed.style.display = 'inline-block';
                    //重置小赤的位置
                    littleRed.style.top = '80%';
                    littleRed.style.left = '45%';
                    //重置pokemon的位置                           
                    resetPokemonTimer = resetPokemon();
                    //大师球先暂停

                })
                
            }
        }
    }

    //执行pokemon
    function executePokemon() {
        resetPokemonTimer = resetPokemon();
        lookForPokemonTimer = setInterval(lookForPokemon, 100);
        attackPokemonTimer = setInterval(attackPokemon, 30);
    }
    executePokemon();

    
    //寻找一个大师球
    function lookForMasterBall() {
        for(let masterBall of masterBalls) {
            if(masterBall.offsetTop <= -70) {
                masterBall.style.left = littleRed.offsetLeft + littleRed.offsetWidth / 5 + 'px';
                masterBall.style.top = littleRed.offsetTop - littleRed.offsetHeight /  1 + 'px';
                break;
            }
        }
    }


    //使用大师球     
    function useMasterBall() {
        for(let masterBall of masterBalls) {
            if(masterBall.offsetTop >= -70) {
                masterBall.style.top = masterBall.offsetTop - 20 + 'px';
            }
        }
        
        //相交后妖怪被收服
        for(let masterBall of masterBalls) {
            for(let monster of monsters) {
                if(checkIntersect(masterBall,monster) && !monster.querySelector('span')) {
                    let subdue = document.createElement('span');
                    subdue.classList.add('subdue');
                    monster.append(subdue);
                    setTimeout(masterBallSubdueMonste,300,monster,masterBall);
                }
            }
        }
    }


    //妖怪收服后重置
    function masterBallSubdueMonste(monster,masterBall) {
        const monsterMaxTop = -monster.offsetHeight;
        const maxLeft = ziyuanZhen.offsetWidth - monster.offsetWidth;
        masterBall.style.top = -masterBall.offsetHeight + 'px';
        monster.style.top = _.random(-500, monsterMaxTop) + 'px';
        monster.style.left = _.random(0, maxLeft) + 'px';
        monster.innerHTML = '';
    }
    

    //执行大师球
    function executeMasterBall() {
        useMasterBallTimer = setInterval(useMasterBall,0);
    }
    executeMasterBall();
    
    
    //判断是否相交
    function checkIntersect(elem1,elem2) {
        let rect1 = elem1.getBoundingClientRect();
        let rect2 = elem2.getBoundingClientRect();
        let nonIntersect = (rect1.right < rect2.left) || (rect1.left > rect2.right) || (rect1.bottom < rect2.top) || (rect1.top > rect2.bottom);
        let intersect = !nonIntersect; 
        return intersect;
    }


};


