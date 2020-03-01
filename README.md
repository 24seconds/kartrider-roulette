
## 카트라이더 룰렛! (KartRider Roulette!)

카트라이더 트랙을 골라서 룰렛을 돌릴 수 있는 앱입니다  

- 윈도우 프로그램 다운로드는 [여기](https://www.dropbox.com/s/boeuf7rruiqblbl/%EC%B9%B4%ED%8A%B8%EB%9D%BC%EC%9D%B4%EB%8D%94_%EB%A3%B0%EB%A0%9B_0.9.9.exe?dl=0)
- 혹은 [여기](https://github.com/24seconds/kartrider-roulette/releases) 에서 이 `kartrider_roulette.0.9.9.exe` 파일을 다운로드
- 웹에서 보려면 [kartrider-roulette](https://24seconds.github.io/kartrider-roulette/) 여기

## 목차 (Table of Contents)

## - [Demo](#demo)

## - [사용자 가이드](#사용자-가이드)
- [사용자를 위한 설명](#사용자를-위한-설명)

## - [English description](#English-description)
  - [Intro about kartrider roulette](#intro-about-kartrider-roulette)
    - [Download links](#download-links)
  - [Why web app?](#why-web-app)
    - [Electron](#electron)
    - [Indexed DB](#indexed-db)
  - [Roulette Animation](#roulette-animation)
    - [RequestAnimatinoFrame](#requestanimatinoframe)
    - [Timing Function](#timing-function)
  - [Data Resource](#data-resource)
    - [Kartrider Open API](#kartrider-open-api)

-------

## Demo

web : [kartrider-roulette](https://24seconds.github.io/kartrider-roulette/)

<img src="https://imgur.com/hFIy3qZ.gif" width="400">

## 사용자를 위한 설명

카트라이더 룰렛은 자신이 원하는 트랙을 골라서 룰렛을 돌릴 수 있는 프로그램입니다

- 사용자는 자신만의 컬렉션을 만들 수 있고, 컬렉션에는 원하는 대로 트랙을 선택할 수 있습니다.
- 선택 한 트랙들은 컬렉션 우측의 화살표 `>`를 클릭하면 자세히 볼 수 있습니다.
- 컬렉션 왼쪽 체크박스를 체크하면 컬렉션의 트랙들이 룰렛에 추가됩니다.
- 룰렛 애니메이션을 on/off 할 수 있습니다.
- `룰렛 보기`를 통해 룰렛에 어떤 트랙들이 있는지 볼 수 있습니다.

------

## English description

### Intro about kartrider roulette

Kartrider Roulette is an app that can run roulette with customized track list.  
User can create collection and add or delete tracks in its collection.  
By checking collection, roulette includes those tracks.  
Roulette Animation can be on/off.

### Download links

- windows program : [here](https://www.dropbox.com/s/e81emr3tqhuvmvh/%EC%B9%B4%ED%8A%B8%EB%9D%BC%EC%9D%B4%EB%8D%94_%EB%A3%B0%EB%A0%9B_0.9.9.exe?dl=0)  
- or you can down load windows program [here](https://github.com/24seconds/kartrider-roulette/releases) also. Find `kartrider_roulette.0.9.9.exe` file  
- If you prefer web, check here! => [kartrider-roulette](https://24seconds.github.io/kartrider-roulette/)

-----

### Why web app?

Oneday, I watched youtube and one of my favorite streamer had used roulette program as a content. And I thought it would be great if I upgrade roulette program and watch my favorite streamer using this. So I start this toy project. 

#### Electron

Because target is clear, I need to make windows program. But I haven't made any kind of windows app, so I decide to use electron to build web app as portable windows program. I used electron-builder and make portale program

#### Indexed DB

Because this app needs to store some structured data (user's collection, track list, track theme list etc..), using Indexed DB is proper than just using localStorage.  
Indexed DB is transactional object oriented database system. Now I can say that IndexedDB is full of transaction. If you want to craete store, you need traction. If you want to add/remove something, you need transaction! It took some time for me to understand the meaning of `transactional`. lol.

-----

### Roulette Animation

Animating Roulette is important to attract user's interest and make app looks good!  
To implement roulette, I used requestAnimationFrame and two div tags only. Plus, for animation customising, I used cubic-bezier curve equation.  

#### RequestAnimatinoFrame

[reuqestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) is good api for animating something without frame loss and battery drain. here is short example in `RouletteResultComponent`

```js

onPlayRoulette() {
  if (isAnimationOn) {
      const shuffledTrackList = this.shuffleFisherYates(trackList);

      // .... set timer for animation duration (around 3 seconds)

      requestAnimationFrame(this.animationCallback.bind(this, shuffledTrackList));
    } else {
      // .... do not call requestAnimationFrame if you are done
    }
}
```

#### Timing Function

Imagine how slot machine animation works. At first it goes really fast and getting slow when it reached to the end. I also wanted to implement slot machine like animation behavior, I used transition timing function. Well.. it's simple. Just make [cubic-bezier curve equation](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function). Here is example in `RouletteResultComponent`.

```js
getCubicBezierCurve(p1, p2, p3, p4) {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const [x3, y3] = p3;
    const [x4, y4] = p4;

    return function (t) {
      const fun = (p1, p2, p3, p4) => {
        return Math.pow(1 - t, 3) * p1
          + 3 * Math.pow(1 - t, 2) * t * p2
          + 3 * (1 - t) * Math.pow(t, 2) * p3
          + Math.pow(t, 3) * p4;
      };

      const xt = fun(x1, x2, x3, x4);
      const yt = fun(y1, y2, y3, y4);

      return [xt, yt];
    }
  }
```

------

### Data Resource

#### Kartrider Open API

Thanks to Kartrider, I get resources such as track image and track data from [Kartrider Open api](https://developers.nexon.com/kart) for detail in TrackPopupComponent. Without this, I would spend more time to get resources.
