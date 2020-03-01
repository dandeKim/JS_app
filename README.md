# JS_app
![](https://user-images.githubusercontent.com/60219368/73137741-e3dad000-409e-11ea-9485-0a40203a60af.gif)
[JS_app 바로가기](https://ofkande.github.io/JS_app/)

## index

- [Clock](#clock)
- [Weather](#weather)
- [User](#user)
- [To-do List](#to-do-list)
- [Background Image](#background-image)

---

## Clock

- `getTime()` : 현재 시각을 구하기 위한 함수
  - Date 객체를 생성하여 현재 시각 구하기
  - clockHours, clockMinutes, clockSeconds의 텍스트를 현재 시각으로 변경
  - 삼항 조건 연산자를 사용해 한 자릿수일 경우 앞에 '0'을 붙여줌

```javascript
function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clockHours.innerText = `${hours < 10 ? `0${hours}` : hours}:`;
  clockMinutes.innerText = `${minutes < 10 ? `0${minutes}` : minutes}:`;
  clockSeconds.innerText = `${seconds < 10 ? `0${seconds}` : seconds}`;
}
```

- `setInterval(getTime, 1000);` : 1초마다 getTime 함수가 실행되도록 설정

## Weather

- `getWeather()` : 날씨 데이터를 가져오기 위한 함수
  - Fetch API를 사용해 openWeatherMap에서 제공하는 데이터를 가져옴
  - weather icon의 이름을 클래스 규칙으로 잡아둬서 현재 날씨에 맞는 아이콘을 출력 `ex).weather-01d`
  - 아이콘 이미지는 스프라이트 이미지를 사용
    ```css
    .weather-icon {
      position: absolute;
      left: -70px;
      display: block;
      width: 60px;
      height: 60px;
      background: url(img/weather-icon.svg) no-repeat;
      background-size: cover;
    }
    .weather-icon.weather-01d {
      background-position: 0 0;
    }
    ```

```javascript
function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temperature = Math.floor(json.main.temp);
      const weatherIcon = json.weather[0].icon;
      weatherIconClass.classList.add(`weather-${weatherIcon}`);
      const place = json.name;
      weather.innerText = `${temperature}°`;
      weatherLocation.innerText = place;
    });
}
```

- 그 외 함수들

  |        함수명        | 기능                                                                                                                |
  | :------------------: | ------------------------------------------------------------------------------------------------------------------- |
  |   `askForCoords()`   | 현재 위치의 포지션값을 전달                                                                                         |
  | `handleGeoSuccess()` | 포지션값을 성공적으로 가져왔을 때 위도, 경도값을 구함                                                               |
  |  `handleGeoError()`  | 포지션값을 가져오지 못했을 때 console에 메시지를 띄움                                                               |
  |    `saveCoords()`    | localStorage에 위도, 경도값을 저장                                                                                  |
  |    `loadCoords()`    | localStorage에 저장된 위도, 경도값이 있다면 이를 가져와 날씨 정보를 가져오고, 그렇지 않으면 `askForCoords()`를 호출 |

## User

|      함수명       | 기능                                                                                                            |
| :---------------: | --------------------------------------------------------------------------------------------------------------- |
|  `askForName()`   | form에 .showing 클래스를 추가해 `display:block` 상태로 만들어주고, 값을 입력할 경우 `handleSubmit()`함수를 호출 |
| `handleSubmit()`  | input의 값(사용자 이름)을 구해 `paintGreeting()`과 `saveName()`함수로 보내줌                                    |
| `paintGreeting()` | form을 `display:none`상태로 만들고 화면에 사용자 이름을 출력                                                    |
|   `saveName()`    | localStorage에 사용자 이름을 저장                                                                               |
|   `loadName()`    | localStorage에 저장된 사용자 이름이 있다면 이를 출력하고, 그렇지 않으면 `askForName()`을 호출                   |

## To-do List

- `getUUID()` : UUID를 사용해 To-do List의 각 항목에 고유 id를 부여
  > UUID : 범용 고유 식별자(Universally Unique IDentifier)는 소프트웨어 구축에 쓰이는 식별자 표준이다. UUID 표준에 따라 이름을 부여하면 실제 사용상에 중복될 가능성이 거의 없다고 인정되기 때문에 많이 사용되고 있다. 표준 형식에서 UUID는 32개의 십육진수로 표현되며 총 36개 문자(32개 문자와 4개의 하이픈)로 된 8-4-4-4-12라는 5개의 그룹을 하이픈으로 구분한다.

```javascript
function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 3) | 8;
    return v.toString(16);
  });
}
```

- `checkedToDos()` : checkbox의 체크 여부를 확인 후, 체크된 리스트에 .checked 클래스를 추가해 label의 이미지 변경
  - checkbox의 상태가 변할 때마다 checked 값(true/false)을 localStorage에 저장

```css
.toDoList li label {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 10px;
  background: url(img/checkbox.svg);
  cursor: pointer;
}
.toDoList li label.checked {
  background: url(img/checked.svg);
}
```

- 그 외 함수들

  |      함수명      | 기능                                                                                                                                       |
  | :--------------: | ------------------------------------------------------------------------------------------------------------------------------------------ |
  | `handleSubmit()` | To-do List를 입력하면 `paintToDo()`함수로 입력받은 값을 전달                                                                               |
  |  `paintToDo()`   | li를 생성해 입력받은 To-do List를 화면에 출력, 'text, id, checked'값을 가지고 있는 객체를 생성해 localStorage에 저장, `checkedToDos()`호출 |
  |  `deleteToDo()`  | del 버튼의 부모 li를 찾아 삭제 후, localStorage에 저장된 id와 해당 li의 id를 비교해 같지 않을 경우에만 `saveToDos()`로 전달                |
  |  `saveToDos()`   | localStorage에 To-do List 배열 저장                                                                                                        |
  |  `loadToDos()`   | localStorage에 저장된 To-do List가 있다면 이를 출력                                                                                        |

## Background Image

|     함수명     | 기능                                                                             |
| :------------: | -------------------------------------------------------------------------------- |
| `getRandom()`  | Math 객체를 이용해 1~6 사이의 랜덤 숫자 생성                                     |
| `paintImage()` | 전달받은 임의의 숫자를 이용해 클래스 규칙을 부여해서 랜덤으로 배경 이미지를 출력 |
