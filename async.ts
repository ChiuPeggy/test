(async function () {
    const pre = document.querySelector('pre') as HTMLPreElement;
    var s: number = 0;
    var a = 'x';
    function add(n: number) {
        s = s + n;
    }
    //兩個執行緒 同時執行add(5)
    //add(5)
    // console.log(f1(1, x => {
    //     console.log(`callback=${x}`);
    // }));
    // console.log('end');
    //alert(f1(1));
    // setInterval(() => {
    //     add(5);
    // }, 200);

    // setInterval(() => {
    //     a += 'a';
    // }, 500);

    // setInterval(() => {
    //    pre.textContent = `s=${s}\na=${a}`;
    // }, 100);
    // function f1(x: number, callback: (ans: number) => void) {
    //     setTimeout(() => {
    //         callback(x + 1);
    //     },1000);
    //     //callback(x + 1);
    //     return `ret=${x}`;
    // }

    //setInterval(() => pre.textContent = a, 100);
    const line = document.querySelector('.line') as HTMLElement;
    const dot = document.querySelector('.dot') as HTMLElement;
    const input = document.querySelector('#n') as HTMLInputElement;
    // document.querySelector('#go')?.addEventListener('click', () => {
    //     line.style.background = 'blue';
    //     move(parseInt(input.value), (z) => {
    //         line.style.background = 'red';
    //     });
    // });
    // function move(percentage: number, whenDone: () => void) {
    //     const dotWidth = (dot?.getBoundingClientRect().width ?? 0) / 2;
    //     const lineWidth = line.getBoundingClientRect().width ?? 0;
    //     var current = parseInt('0' + dot.style.left.replace('px', ''));
    //     const to = lineWidth * (percentage / 100) - dotWidth;
    //     const one = (to - current) / 100
    //     function step() {
    //         current += one;
    //         dot.style.left = `${current}px`;
    //         if ((one > 0 && current < to) || (one < 0 && current > to)) {
    //             setTimeout(() => {
    //                 step();
    //             }, 10);
    //         } else {
    //             whenDone();
    //         }
    //     }
    //     step();
    // }

    // document.querySelector('#go')?.addEventListener('click', () => {
    //     line.style.background = 'blue';
    //     move(parseInt(input.value)).then(() => line.style.background = 'red');
    // });
    document.querySelector('#go')?.addEventListener('click', async () => {
        line.style.background = 'blue';
        var c = await move(parseInt(input.value));
        line.style.background = 'red'
        console.log(c);
    });
    function move(percentage: number): Promise<number> {
        const dotWidth = (dot?.getBoundingClientRect().width ?? 0) / 2;
        const lineWidth = line.getBoundingClientRect().width ?? 0;
        var current = parseInt('0' + dot.style.left.replace('px', ''));
        const to = lineWidth * (percentage / 100) - dotWidth;
        const one = (to - current) / 100
        return new Promise((reoslve, reject) => {
            function step() {
                current += one;
                dot.style.left = `${current}px`;
                if ((one > 0 && current < to) || (one < 0 && current > to)) {
                    setTimeout(() => {
                        step();
                    }, 10);
                } else {
                    reoslve(to);
                }
            }
            step();
        });

    }

    document.querySelector('#gettext')?.addEventListener('click', async () => {
        var request = await fetch('./hello.txt')
        var content = await request.text();
        alert(content);
    });

    function showMessageAfterXSencond(message: string, second: number, cb: () => void) {
        setTimeout(() => {
            pre.textContent = message;
            cb();
        }, second * 1000);
    }




    async function showMessageAfterXSencondAsync(message: string, second: number) {
        return new Promise<void>(done => {
            setTimeout(() => {
                pre.textContent = message;
                done();
            }, second * 1000);
        })
    }
    // showMessageAfterXSencondAsync('嗨第1次', 1).then(() => {
    //     showMessageAfterXSencondAsync('嗨第2次', 1).then(() => {
    //         pre.style.background = 'lime';
    //     });
    // });
    // async function show() {
    //     await showMessageAfterXSencondAsync('批次嗨的第1次', 1);
    //     await showMessageAfterXSencondAsync('批次嗨的第2次', 1);
    // }
    // await show();



    showMessageAfterXSencond('嗨~~', 1, function () {
        showMessageAfterXSencond('嗨第2次', 1, () => {
            showMessageAfterXSencond('嗨第3次', 1, () => {
                showMessageAfterXSencond('嗨第4次', 1, () => {
                    pre.style.background = 'lime';
                });
            });

        });
    });

    // await showMessageAfterXSencondAsync('嗨第3次', 1);
    // await showMessageAfterXSencondAsync('嗨第1次', 1);
    // await showMessageAfterXSencondAsync('嗨第2次', 1);
    // await showMessageAfterXSencondAsync('嗨第4次', 1);

    //pre.style.background = 'red';
})();