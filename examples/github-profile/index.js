console.log(Rx);
console.log(Rx.Observable);

const input  = document.querySelector('input')
const info = document.querySelector('.info')

const source = Rx.Observable
                  .fromEvent(input, 'input')
                //   .debounceTime(500)                     // 타이핑 후 0.5초 대기
                  .map(e => e.target.value)                 // fromEvent의 value값 얻기
                  .filter(username => username.length > 3)  // 해당 value의 길이가 3보다 크다면

// 값 출력
const stream = source.subscribe(val => console.log('data', val));


// promise 형태로 api 데이터 생성
const getUser = username => fetch(`https://api.github.com/users/${ username }?access_token=99b6ae2c1ac6541bd90286841e3cb3f41e5206f1`).then(res => res.json());
const githubAPI = username => Rx.Observable.fromPromise( getUser(username) );



// source 스트림을 통해 github 사용자 닉네임 매핑
source
  .flatMap(githubAPI) // githubAPI 메서드 스트림 푸시
  .subscribe(value => {

    console.log('data object',value);

    if(value.name){ 
      
      info.innerHTML = `

        <img src="${value.avatar_url}" width="80" height="80">
        <p> 아이디 : ${value.name}</p>
        <p> 이메일 : ${value.email}</p>
        <p> 직장 : ${value.company}</p>
        <p> 사이트 : <a href='${value.html_url}' target='_blank' > ${value.html_url} </a> </p>
        <p> 깃헙 블로그 : <a href='${value.blog}' target='_blank' > ${value.blog} </a></p>
        <p> 공개 레포지토리 : ${value.public_repos}</p>
        <p> 팔로우 : ${value.followers}</p>
        <p> 팔로잉 : ${value.following}</p>
      
      `;

    }else{ 

      info.innerText = '해당 아이디를 가진 사용자는 없습니다.';

    }

  })