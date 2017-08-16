window.onload = () => {
    
    console.log('시작');

    const items = [
        '아이템1',
        '아이템2',
        '아이템3',
        '아이템4',
        '아이템5',
        '아이템6',
        '아이템7',
        '아이템8',
        '아이템9',
        '아이템10'          
    ];

    const observable = Rx.Observable.from(items);

    const subscriber = observable
        .take(10)
        .subscribe(
            (value) => {
                //
                const list = document.querySelector('ul');                
                const li = document.createElement('li');

                li.innerHTML = value;
                list.appendChild(li);
                //
            },
            (err) => console.log('err', err),
            () => console.log('완료')

        );

}