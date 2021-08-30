# chatting-demo
채팅을 위한 소켓통신 데모 서버입니다.

# 이벤트 설명
`chat-push` 이벤트

- 클라이언트에서 채팅 메시지를 서버에 전송합니다.

```js
data = {
	mirrorMode, //boolean
	user, //socket.id로 사용자를 구분함
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

서버에서 내 메시지를 거의 그대로 응답합니다.

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