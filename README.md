# chatting-demo
채팅을 위한 소켓통신 데모 서버입니다.

미러 모드를 추가해서
- 미러 모드일 경우 `단순히 서버와 잘 연결 되는지까지` 확인할 수 있고
- 아닐 경우 `다른 사람들과도 잘 통신되는지` 확인할 수 있습니다.



# 이벤트 설명
`chat-push` 이벤트

- 클라이언트에서 채팅 메시지를 서버에 전송합니다.

```js
data = {
	mirrorMode, //boolean
	user, //사용자를 구분함
	msg,  //채팅 메시지
}
```

`chat-get` 이벤트

- 서버는 같은 채팅방 (`1111`으로 고정)에 있는 사용자들에게 메시지를 전송합니다.

```js
data = {
	user, //socket.id로 사용자를 구분함
	msg,  //채팅 메시지
}
```

# 미러 모드 사용하기

## 미러 모드 `on`

서버에서 내 메시지를 그대로 응답합니다.

![image](https://user-images.githubusercontent.com/30483337/131374374-bff985f3-5f37-4843-b5c7-386471e65279.png)

## 미러 모드 `off`

서버에 접속한 다른 사용자와 채팅을 할 수 있습니다.

다른 사람의 채팅은 회색으로 표시했습니다.

![image](https://user-images.githubusercontent.com/30483337/131375217-f7602ea4-e447-4257-b143-f0b1d3f22ad8.png)

![image](https://user-images.githubusercontent.com/30483337/131375189-f35d91c1-b9c1-424e-b400-0e92c1382119.png)



## 사용자 한 쪽만 미러 모드 `on` 인 경우

이 경우 다른 사용자에게 내가 입력한 메시지가 보이지 않습니다.

![image](https://user-images.githubusercontent.com/30483337/131375321-0ce95fde-36e2-4b25-b743-eee23153e329.png)

![image](https://user-images.githubusercontent.com/30483337/131375662-249b5558-e24e-4495-85f1-4287b9701af1.png)

> 미러 모드인 사용자가 보낸 채팅을 수신받고 있지 않습니다.


## 다른 플랫폼의 경우
> socket통신은 api 문서 작성을 어떻게 할지 모르겠어서...

예시 - 안드로이드

미러모드 `on`
1. 안드에서 서버에 접속합니다.
2. 미러 모드로 서버에 `이벤트: chat-push`와 `데이터`를 전송합니다.
3. 서버에서 클라이언트로 메시지가 잘 전송되는지 확인합니다.

미러모드 `off`
1. 브라우저에서 배포된 서버에 접속하고 미러 모드를 해제합니다. (화면에서 로그 확인하는 용도)
2. 안드도 서버에 접속하고 미러 모드를 해제합니다.
3. `1번`의 사용자 화면에서 `안드의 입장문에서 소켓아이디`를 확인합니다.
4. `브라우저 - 안드` 간 메시지 전송이 잘 되는지 확인합니다.
