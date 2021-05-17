"use strict";
// (function () {
//     var dot = document.querySelector('.dot') as HTMLElement
//     var input = document.querySelector('#n') as HTMLInputElement
//     var line = document.querySelector('.line') as HTMLElement
//     function move(percentage: number,whendone:()=>void) {
//         var dotwidth = (dot.getBoundingClientRect().width) / 2
//         var linewidth = dot.parentElement?.getBoundingClientRect().width ?? 0
//         var current = parseInt('0' + dot.style.left.replace('px', ''))
//         var to = linewidth * (percentage / 100) - dotwidth
//         var one = (to - current) / 100
//         function step() {
//             current += one
//             dot.style.left = `${current}px`
//             if (one > 0 && current < to || (one < 0 && current > to)) {
//                 setTimeout(() => {
//                     step()
//                 }, 10)
//             }
//             else{
//                 whendone()
//             }
//         }
//         step()
//     }
//     document.querySelector('#go')?.addEventListener('click', () => {
//         line.style.backgroundColor='rgba(176,190,197 ,1)'
//         move(parseInt(input.value),()=>{
//             line.style.backgroundColor='rgba(188,170,164 ,1)'
//         })
//     })
// })()
(function () {
    var dot = document.querySelector('.dot');
    var input = document.querySelector('#n');
    var line = document.querySelector('.line');
    function move(percentage) {
        var dotwidth = (dot.getBoundingClientRect().width) / 2;
        var linewidth = line.getBoundingClientRect().width ?? 0;
        var current = parseInt('0' + dot.style.left.replace('px', ''));
        var to = linewidth * (percentage / 100) - dotwidth;
        var one = (to - current) / 100;
        return new Promise((resolve) => {
            function step() {
                current += one;
                dot.style.left = `${current}px`;
                if (one > 0 && current < to || (one < 0 && current > to)) {
                    setTimeout(() => {
                        step();
                    }, 10);
                }
                else {
                    resolve();
                }
            }
            step();
        });
    }
    document.querySelector('#go')?.addEventListener('click', async () => {
        line.style.backgroundColor = 'rgba(176,190,197 ,1)';
        await move(parseInt(input.value));
        line.style.backgroundColor = 'rgba(188,170,164 ,1)';
    });
    // document.querySelector('#go')?.addEventListener('click', () => {
    //     line.style.backgroundColor = 'rgba(176,190,197 ,1)'
    //     move(parseInt(input.value)).then(() => {
    //         line.style.backgroundColor = 'rgba(188,170,164 ,1)'
    //     })
    // })
})();
//按下按鈕後
//記下要移動到哪
//球移動到那
