stuff([
  new set("1. 고양이는 발이 몇개 있을까요?", ["1개", "2개", "3개", "4개"], 3),

  new set("2. 한국의 수도는?", ["서울", "부산", "전라남도", "제주도"], 0),

  new set("3. 1+1은?", [1,2,3,4], 1, null, function(){
    playSound("data/yee.wav");
    randomImage("data/yee.jpg").width = 200;

    document.body.classList.add("shine");
  }),

  new set("And his name is..?", ["Chara Dreemur", "Jackie Chan", "John Cena", "Steve Jobs"], 2, null, function(){
    playSound("data/johncena.mp3");
    randomImage("data/johncena.png");
  }),

  new set("4번을 눌러주세요", [1, 2, 3, 4], 1, null, null, function(){
    playSound("data/fake.wav");
  }),

  new set("이게 몇번쩨 문제일까요?", [3, 4, 6, 7], 2),


  new set("당신은 이 문제를 맞출 수 있다고 생각합니까?", ["몰라요", "네", "아마도", "아니오"], 1)
])
